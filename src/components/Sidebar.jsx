import { ACCOUNT_LABELS } from '../App'

const ACCOUNT_ICONS = {
  gmail: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
    </svg>
  ),
  naver: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z"/>
    </svg>
  ),
  kakao: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.667 1.556 5.009 3.922 6.384L4.5 21l4.617-2.695A11.47 11.47 0 0 0 12 18c5.523 0 10-3.477 10-7.5S17.523 3 12 3z"/>
    </svg>
  ),
  outlook: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M7.88 12.04q0 .45-.11.87-.1.41-.33.74-.22.33-.58.52-.37.2-.87.2t-.85-.2q-.35-.21-.57-.55-.22-.33-.33-.75-.1-.42-.1-.86t.1-.87q.1-.43.34-.76.22-.34.59-.54.36-.2.87-.2t.86.2q.35.21.57.55.22.34.31.77.1.43.1.88zM24 12v9.38q0 .46-.33.8-.33.32-.8.32H7.13q-.46 0-.8-.33-.32-.33-.32-.8V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h6.5V2.55q0-.44.3-.75.3-.3.75-.3h12.9q.44 0 .75.3.3.3.3.75V10.85l1.24.72q.01 0 .01.01.04.02.04.07v.28q0 .03-.04.05z"/>
    </svg>
  ),
}

const NAV_ITEMS = [
  {
    id: 'all', label: '전체 메일', icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    )
  },
  {
    id: 'unread', label: '읽지 않음', icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/>
      </svg>
    )
  },
  {
    id: 'starred', label: '중요 메일', icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    )
  },
]

const ACCOUNTS = ['gmail', 'naver', 'kakao']

export default function Sidebar({ activeFilter, setActiveFilter, mails, mailCount, onAddAccount, onLogout }) {
  const unreadCount = mailCount.unread ?? mails.filter(m => !m.isRead).length

  return (
    <aside className="w-60 bg-gray-950 flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-tight">Mailmoa</h1>
            <p className="text-[10px] text-gray-500 -mt-0.5">메일을 한 곳에서</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-0.5 px-2 mt-1">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveFilter(item.id)}
            className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeFilter === item.id
                ? 'bg-indigo-500/20 text-indigo-300'
                : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
            }`}
          >
            <span className="flex items-center gap-2.5">
              {item.icon}
              {item.label}
            </span>
            {item.id === 'all' && mailCount.total > 0 && (
              <span className="text-[10px] text-gray-500">{mailCount.total}</span>
            )}
            {item.id === 'unread' && unreadCount > 0 && (
              <span className="bg-indigo-500 text-white text-[10px] rounded-full px-1.5 py-0.5 leading-none font-semibold">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Accounts */}
      <div className="mt-6 px-2">
        <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest mb-1.5 px-3">계정</p>
        <div className="flex flex-col gap-0.5">
          {ACCOUNTS.map(account => {
            const count = mailCount.byProvider?.[account.toUpperCase()] ?? mails.filter(m => m.account === account).length
            const unread = count > 0
            return (
              <button
                key={account}
                onClick={() => setActiveFilter(account)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all cursor-pointer ${
                  activeFilter === account
                    ? 'bg-indigo-500/20 text-indigo-300'
                    : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                }`}
              >
                <span className="flex items-center gap-2.5 text-xs font-medium">
                  <span className={`${ACCOUNT_LABELS[account].iconColor}`}>
                    {ACCOUNT_ICONS[account]}
                  </span>
                  {ACCOUNT_LABELS[account].label}
                </span>
                <div className="flex items-center gap-1.5">
                  {unread > 0 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  )}
                  <span className="text-[10px] text-gray-600">{count}</span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Add account */}
      <div className="mt-auto px-2 pb-2">
        <button onClick={onAddAccount} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-gray-600 hover:text-gray-400 hover:bg-white/5 transition-all cursor-pointer border border-dashed border-gray-800">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><path d="M12 8v8m-4-4h8"/>
          </svg>
          계정 추가
        </button>
      </div>

      {/* Logout */}
      <div className="px-2 pb-4">
        <button onClick={onLogout} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-gray-600 hover:text-red-400 hover:bg-red-500/5 transition-all cursor-pointer">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
          </svg>
          로그아웃
        </button>
      </div>
    </aside>
  )
}
