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

const ACCOUNTS = ['gmail', 'naver']

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
