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
import { getMails, getMailDetail, getMailCount, markAsRead, deleteMail, loadOlderNaverMails, syncMails } from './api/mail'


export const ACCOUNT_LABELS = {
  gmail: { label: 'Gmail', color: 'bg-red-50 text-red-500', iconColor: 'text-red-500' },
  naver: { label: 'Naver', color: 'bg-green-50 text-green-600', iconColor: 'text-green-500' },
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
  const [loadingMessage, setLoadingMessage] = useState('')
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
    const params = new URLSearchParams(window.location.search)
    const isConnected = params.get('connected') === 'true'

    if (isConnected) {
      window.history.replaceState({}, '', '/mail')
      setLoadingMessage('메일을 가져오는 중입니다...')
      syncMails(token)
        .then(() => Promise.all([getMails(token, 0, PAGE_SIZE), getMailCount(token)]))
        .then(([data, count]) => {
          setMails(data.map(toMailItem))
          setHasMore(data.length === PAGE_SIZE)
          setPage(1)
          setMailCount(count)
        })
        .catch(() => {})
        .finally(() => {
          setLoading(false)
          setLoadingMessage('')
          setConnectedToast(true)
          setTimeout(() => setConnectedToast(false), 3000)
        })
    } else {
      getMailCount(token).then(setMailCount).catch(() => {})
      getMails(token, 0, PAGE_SIZE)
        .then(data => {
          setMails(data.map(toMailItem))
          setHasMore(data.length === PAGE_SIZE)
          setPage(1)
        })
        .catch(() => setMails([]))
        .finally(() => setLoading(false))
    }
  }, [token])

  const loadMore = async () => {
    if (loadingMore || !hasMore) return
    setLoadingMore(true)
    try {
      const data = await getMails(token, page, PAGE_SIZE)
      if (data.length > 0) {
        setMails(prev => [...prev, ...data.map(toMailItem)])
        setHasMore(data.length === PAGE_SIZE)
        setPage(prev => prev + 1)
      } else {
        const count = await loadOlderNaverMails(token)
        if (count > 0) {
          const newData = await getMails(token, page, PAGE_SIZE)
          setMails(prev => [...prev, ...newData.map(toMailItem)])
          setHasMore(newData.length === PAGE_SIZE)
          setPage(prev => prev + 1)
        } else {
          setHasMore(false)
        }
      }
    } catch {
      setHasMore(false)
    } finally {
      setLoadingMore(false)
    }
  }


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

  const handleDelete = (id) => {
    const mail = mails.find(m => m.id === id)
    deleteMail(token, id)
      .then(() => {
        setMails(prev => prev.filter(m => m.id !== id))
        if (selectedMail?.id === id) setSelectedMail(null)
        setMailCount(prev => ({
          ...prev,
          total: Math.max(0, prev.total - 1),
          unread: mail && !mail.isRead ? Math.max(0, (prev.unread ?? 0) - 1) : prev.unread,
        }))
      })
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
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-white/80">
          <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          {loadingMessage && <p className="text-sm text-gray-500">{loadingMessage}</p>}
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
      <MailDetail mail={selectedMail} onStar={handleStar} onDelete={handleDelete} />

      {showConnectModal && (
        <ConnectAccountModal
          onClose={() => setShowConnectModal(false)}
          userId={userId}
          onConnected={() => {
            setShowConnectModal(false)
            setConnectedToast(true)
            setTimeout(() => setConnectedToast(false), 3000)
          }}
        />
      )}

      {connectedToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-gray-900 border border-white/10 text-white text-sm px-4 py-3 rounded-xl shadow-xl">
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          메일 계정이 성공적으로 연동되었습니다
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
