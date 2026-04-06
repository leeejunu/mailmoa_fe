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
    available: false,
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z" />
      </svg>
    ),
    color: 'text-green-500',
    border: '',
  },
  {
    id: 'kakao',
    label: 'Kakao',
    desc: '카카오 메일 연동',
    available: false,
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.667 1.556 5.009 3.922 6.384L4.5 21l4.617-2.695A11.47 11.47 0 0 0 12 18c5.523 0 10-3.477 10-7.5S17.523 3 12 3z" />
      </svg>
    ),
    color: 'text-yellow-500',
    border: '',
  },
  {
    id: 'outlook',
    label: 'Outlook',
    desc: 'Microsoft Outlook 연동',
    available: false,
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M7.88 12.04q0 .45-.11.87-.1.41-.33.74-.22.33-.58.52-.37.2-.87.2t-.85-.2q-.35-.21-.57-.55-.22-.33-.33-.75-.1-.42-.1-.86t.1-.87q.1-.43.34-.76.22-.34.59-.54.36-.2.87-.2t.86.2q.35.21.57.55.22.34.31.77.1.43.1.88zM24 12v9.38q0 .46-.33.8-.33.32-.8.32H7.13q-.46 0-.8-.33-.32-.33-.32-.8V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h6.5V2.55q0-.44.3-.75.3-.3.75-.3h12.9q.44 0 .75.3.3.3.3.75V10.85l1.24.72q.01 0 .01.01.04.02.04.07v.28q0 .03-.04.05z" />
      </svg>
    ),
    color: 'text-blue-500',
    border: '',
  },
]

export default function ConnectAccountModal({ onClose, userId }) {
  const handleConnect = (providerId) => {
    const providerMap = { gmail: 'google' }
    const registrationId = providerMap[providerId] ?? providerId
    window.location.href = `http://localhost:8080/oauth2/authorization/${registrationId}?userId=${userId}`
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 bg-gray-900 border border-white/10 rounded-2xl w-full max-w-md mx-4 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <div>
            <h2 className="text-base font-semibold text-white">계정 연동</h2>
            <p className="text-xs text-gray-500 mt-0.5">연동할 메일 서비스를 선택하세요</p>
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

        {/* Providers */}
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
      </div>
    </div>
  )
}
