import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { connectNaverAccount } from '../api/mailaccount'

const PROVIDERS = [
  {
    id: 'gmail',
    label: 'Gmail',
    desc: 'Google 계정으로 Gmail 연동',
    available: true,
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
      </svg>
    ),
    color: 'text-red-500',
    border: 'hover:border-red-500/40 hover:bg-red-500/5',
  },
  {
    id: 'naver',
    label: 'Naver',
    desc: '네이버 메일 연동',
    available: true,
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z" />
      </svg>
    ),
    color: 'text-green-500',
    border: 'hover:border-green-500/40 hover:bg-green-500/5',
  },
]

export default function ConnectAccountModal({ onClose, userId, onConnected }) {
  const { token } = useAuth()
  const [step, setStep] = useState('list')
  const [naverEmail, setNaverEmail] = useState('')
  const [naverPassword, setNaverPassword] = useState('')
  const [connecting, setConnecting] = useState(false)
  const [error, setError] = useState('')

  const handleConnect = (providerId) => {
    if (providerId === 'naver') {
      setStep('naver')
      return
    }
    const providerMap = { gmail: 'google' }
    const registrationId = providerMap[providerId] ?? providerId
    window.location.href = `http://localhost:8080/oauth2/authorization/${registrationId}?userId=${userId}`
  }

  const handleNaverSubmit = async (e) => {
    e.preventDefault()
    setConnecting(true)
    setError('')
    try {
      await connectNaverAccount(token, naverEmail, naverPassword)
      onConnected?.()
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setConnecting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 bg-gray-900 border border-white/10 rounded-2xl w-full max-w-md mx-4 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <div className="flex items-center gap-2">
            {step === 'naver' && (
              <button
                onClick={() => { setStep('list'); setError('') }}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-all cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
            )}
            <div>
              <h2 className="text-base font-semibold text-white">
                {step === 'naver' ? 'Naver 메일 연동' : '계정 연동'}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {step === 'naver' ? '네이버 아이디와 비밀번호를 입력하세요' : '연동할 메일 서비스를 선택하세요'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-all cursor-pointer"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {step === 'list' ? (
          <div className="px-6 pb-6 flex flex-col gap-2">
            {PROVIDERS.map((provider) => (
              <div
                key={provider.id}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                  provider.available
                    ? `border-white/10 ${provider.border} cursor-pointer`
                    : 'border-white/5 opacity-40 cursor-not-allowed'
                }`}
                onClick={() => provider.available && handleConnect(provider.id)}
              >
                <div className="flex items-center gap-3">
                  <span className={provider.available ? provider.color : 'text-gray-600'}>
                    {provider.icon}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-white">{provider.label}</p>
                    <p className="text-xs text-gray-500">{provider.desc}</p>
                  </div>
                </div>

                {provider.available ? (
                  <span className="text-xs text-indigo-400 font-medium">연동하기</span>
                ) : (
                  <span className="text-[10px] text-gray-600 bg-white/5 px-2 py-0.5 rounded-full">준비중</span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <form onSubmit={handleNaverSubmit} className="px-6 pb-6 flex flex-col gap-3">
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 flex flex-col gap-1.5">
              <p className="text-xs text-green-400 font-medium mb-0.5">연동 전 아래 순서대로 설정하세요</p>
              <p className="text-xs text-green-400/80">① 네이버 로그인 후 메일 접속</p>
              <p className="text-xs text-green-400/80">② 메일 상단 <span className="text-green-400">환경설정</span> 클릭</p>
              <p className="text-xs text-green-400/80">③ <span className="text-green-400">POP3/IMAP 설정</span> 탭 선택</p>
              <p className="text-xs text-green-400/80">④ <span className="text-green-400">IMAP/SMTP 설정</span> 선택 → <span className="text-green-400">사용함</span> → 설정하기</p>
              <p className="text-xs text-green-400/80">⑤ 같은 페이지에서 <span className="text-green-400">2단계 인증</span> 클릭하여 설정</p>
              <p className="text-xs text-green-400/80">⑥ 2단계 인증 완료 후 <span className="text-green-400">애플리케이션 비밀번호 생성</span></p>
              <p className="text-xs text-green-400/80">⑦ 종류: <span className="text-green-400">직접 입력</span> → <span className="text-green-400">mailmoa</span> 입력 → 생성하기</p>
              <p className="text-xs text-green-400/80">⑧ 생성된 <span className="text-green-400">12자리 비밀번호</span>를 아래에 입력</p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-400">네이버 아이디 또는 이메일</label>
              <input
                type="text"
                value={naverEmail}
                onChange={(e) => setNaverEmail(e.target.value)}
                placeholder="example@naver.com"
                required
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-green-500/50 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-400">비밀번호</label>
              <input
                type="password"
                value={naverPassword}
                onChange={(e) => setNaverPassword(e.target.value)}
                placeholder="네이버 비밀번호"
                required
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-green-500/50 transition-colors"
              />
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5">{error}</p>
            )}

            <button
              type="submit"
              disabled={connecting}
              className="mt-1 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              {connecting ? '연결 중...' : '연동하기'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
