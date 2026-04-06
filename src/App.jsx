import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import MailList from './components/MailList'
import MailDetail from './components/MailDetail'
import ConnectAccountModal from './components/ConnectAccountModal'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import { AuthProvider, useAuth } from './context/AuthContext'
import { getMails, getMailDetail, getMailCount, markAsRead } from './api/mail'

const MOCK_MAILS = [
  {
    id: 1,
    account: 'gmail',
    sender: 'Google',
    senderEmail: 'no-reply@google.com',
    subject: '보안 알림: 새로운 기기에서 로그인되었습니다',
    preview: '새로운 기기에서 Google 계정에 로그인이 감지되었습니다. 본인이 아닌 경우...',
    body: '새로운 기기에서 Google 계정에 로그인이 감지되었습니다.\n\n기기: MacBook Pro\n위치: Seoul, Korea\n시간: 2026-04-05 09:23\n\n본인이 아닌 경우 즉시 비밀번호를 변경하세요.',
    time: '09:23',
    isRead: false,
    isStarred: true,
  },
  {
    id: 2,
    account: 'naver',
    sender: '네이버',
    senderEmail: 'noreply@naver.com',
    subject: '[네이버] 회원님의 포인트가 곧 만료됩니다',
    preview: '보유하신 네이버 포인트 3,200점이 이번 달 말 만료될 예정입니다...',
    body: '보유하신 네이버 포인트 3,200점이 이번 달 말 만료될 예정입니다.\n\n만료일: 2026-04-30\n포인트: 3,200점\n\n지금 바로 사용하세요!',
    time: '어제',
    isRead: true,
    isStarred: false,
  },
  {
    id: 3,
    account: 'gmail',
    sender: 'GitHub',
    senderEmail: 'noreply@github.com',
    subject: '[GitHub] Pull request review requested',
    preview: 'junwoo requested your review on mailmoa/feat/jwt-filter...',
    body: 'junwoo requested your review on mailmoa/feat/jwt-filter.\n\nRepository: mailmoa\nPR: feat: JWT filter 적용\n\nReview the changes at GitHub.',
    time: '어제',
    isRead: true,
    isStarred: false,
  },
  {
    id: 4,
    account: 'kakao',
    sender: '카카오',
    senderEmail: 'no-reply@kakao.com',
    subject: '카카오페이 결제 완료 안내',
    preview: '스타벅스에서 6,500원이 결제되었습니다...',
    body: '카카오페이 결제가 완료되었습니다.\n\n가맹점: 스타벅스\n금액: 6,500원\n일시: 2026-04-04 14:32\n\n감사합니다.',
    time: '04/04',
    isRead: true,
    isStarred: false,
  },
  {
    id: 5,
    account: 'naver',
    sender: '당근마켓',
    senderEmail: 'no-reply@daangn.com',
    subject: '회원님이 찜한 상품의 가격이 내려갔어요',
    preview: '맥북 프로 14인치 M3 - 1,800,000원 → 1,650,000원...',
    body: '회원님이 찜한 상품의 가격이 변경되었습니다.\n\n상품: 맥북 프로 14인치 M3\n이전 가격: 1,800,000원\n현재 가격: 1,650,000원\n\n지금 확인해보세요!',
    time: '04/03',
    isRead: false,
    isStarred: false,
  },
]

export const ACCOUNT_LABELS = {
  gmail: { label: 'Gmail', color: 'bg-red-50 text-red-500', iconColor: 'text-red-500' },
  naver: { label: 'Naver', color: 'bg-green-50 text-green-600', iconColor: 'text-green-500' },
  kakao: { label: 'Kakao', color: 'bg-yellow-50 text-yellow-600', iconColor: 'text-yellow-500' },
  outlook: { label: 'Outlook', color: 'bg-blue-50 text-blue-500', iconColor: 'text-blue-500' },
}

function PrivateRoute({ children }) {
  const { isLoggedIn } = useAuth()
  return isLoggedIn ? children : <Navigate to="/login" replace />
}

function MailApp() {
  const { userId, token, logout } = useAuth()
  const [selectedMail, setSelectedMail] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [mails, setMails] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showConnectModal, setShowConnectModal] = useState(false)
  const [connectedToast, setConnectedToast] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [mailCount, setMailCount] = useState({ total: 0, byProvider: {} })
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const PAGE_SIZE = 50

  const toMailItem = (m) => ({
    id: m.id,
    account: m.provider.toLowerCase(),
    sender: m.senderName || m.senderEmail,
    senderEmail: m.senderEmail,
    subject: m.subject || '(제목 없음)',
    preview: m.snippet,
    time: m.receivedAt ? new Date(m.receivedAt).toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' }) : '',
    isRead: m.read,
    isStarred: false,
  })

  useEffect(() => {
    getMailCount(token).then(setMailCount).catch(() => {})
    getMails(token, 0, PAGE_SIZE)
      .then(data => {
        setMails(data.map(toMailItem))
        setHasMore(data.length === PAGE_SIZE)
        setPage(1)
      })
      .catch(() => setMails([]))
      .finally(() => setLoading(false))
  }, [token])

  const loadMore = () => {
    if (loadingMore || !hasMore) return
    setLoadingMore(true)
    getMails(token, page, PAGE_SIZE)
      .then(data => {
        setMails(prev => [...prev, ...data.map(toMailItem)])
        setHasMore(data.length === PAGE_SIZE)
        setPage(prev => prev + 1)
      })
      .catch(() => {})
      .finally(() => setLoadingMore(false))
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('connected') === 'true') {
      setConnectedToast(true)
      window.history.replaceState({}, '', '/mail')
      setTimeout(() => setConnectedToast(false), 3000)
    }
  }, [])

  const filtered = (() => {
    let result = activeFilter === 'all'
      ? mails
      : activeFilter === 'unread'
        ? mails.filter(m => !m.isRead)
        : activeFilter === 'starred'
          ? mails.filter(m => m.isStarred)
          : mails.filter(m => m.account === activeFilter)

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(m =>
        m.sender.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q) ||
        m.preview.toLowerCase().includes(q)
      )
    }
    return result
  })()

  const handleSelect = (mail) => {
    setSelectedMail({ ...mail, body: null })
    if (!mail.isRead) {
      setMails(prev => prev.map(m => m.id === mail.id ? { ...m, isRead: true } : m))
      setMailCount(prev => ({ ...prev, unread: Math.max(0, (prev.unread ?? 0) - 1) }))
      markAsRead(token, mail.id).catch(() => {})
    }
    getMailDetail(token, mail.id)
      .then(detail => setSelectedMail(prev => prev?.id === mail.id ? { ...prev, body: detail.body } : prev))
      .catch(() => {})
  }

  const handleStar = (id) => {
    setMails(prev => prev.map(m => m.id === id ? { ...m, isStarred: !m.isStarred } : m))
    if (selectedMail?.id === id) {
      setSelectedMail(prev => ({ ...prev, isStarred: !prev.isStarred }))
    }
  }

  return (
    <div className="flex h-screen bg-white text-gray-800 overflow-hidden">
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60">
          <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <Sidebar
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        mails={mails}
        mailCount={mailCount}
        onAddAccount={() => setShowConnectModal(true)}
        onLogout={logout}
      />
      <MailList
        mails={filtered}
        selectedMail={selectedMail}
        onSelect={handleSelect}
        onStar={handleStar}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onLoadMore={loadMore}
        loadingMore={loadingMore}
        hasMore={hasMore}
      />
      <MailDetail mail={selectedMail} onStar={handleStar} />

      {showConnectModal && (
        <ConnectAccountModal
          onClose={() => setShowConnectModal(false)}
          userId={userId}
        />
      )}

      {connectedToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-gray-900 border border-white/10 text-white text-sm px-4 py-3 rounded-xl shadow-xl">
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          Gmail 계정이 성공적으로 연동되었습니다
        </div>
      )}
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/mail" element={<PrivateRoute><MailApp /></PrivateRoute>} />
        <Route path="/mail-accounts" element={<PrivateRoute><MailApp /></PrivateRoute>} />
      </Routes>
    </AuthProvider>
  )
}
