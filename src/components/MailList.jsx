import { useEffect, useRef } from 'react'
import { ACCOUNT_LABELS } from '../App'

const SENDER_COLORS = [
  'bg-violet-100 text-violet-700',
  'bg-blue-100 text-blue-700',
  'bg-emerald-100 text-emerald-700',
  'bg-orange-100 text-orange-700',
  'bg-pink-100 text-pink-700',
  'bg-cyan-100 text-cyan-700',
]

function getSenderColor(name) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i)
  return SENDER_COLORS[hash % SENDER_COLORS.length]
}

export default function MailList({ mails, selectedMail, onSelect, onStar, searchQuery, setSearchQuery, onLoadMore, loadingMore, hasMore }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) onLoadMore()
    }, { threshold: 0.5 })
    if (bottomRef.current) observer.observe(bottomRef.current)
    return () => observer.disconnect()
  }, [onLoadMore])

  return (
    <div className="w-[320px] bg-white border-r border-gray-100 flex flex-col shrink-0">
      {/* Search bar */}
      <div className="px-4 pt-4 pb-3 border-b border-gray-100">
        <div className="relative">
          <svg viewBox="0 0 24 24" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="메일 검색..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-indigo-400 focus:bg-white transition-colors placeholder-gray-400"
          />
        </div>
      </div>

      {/* Count */}
      <div className="px-4 py-2.5 flex items-center justify-between">
        <span className="text-xs text-gray-400 font-medium">{mails.length}개</span>
      </div>

      {/* Mail list */}
      {mails.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-2">
          <svg viewBox="0 0 24 24" className="w-10 h-10 text-gray-200" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          <p className="text-sm">메일이 없습니다</p>
        </div>
      ) : (
        <ul className="flex-1 overflow-y-auto">
          {mails.map((mail, index) => (
            <li
              key={mail.id}
              onClick={() => onSelect(mail)}
              className={`px-4 py-3.5 border-b border-gray-50 cursor-pointer transition-all group relative ${
                selectedMail?.id === mail.id
                  ? 'bg-indigo-50 border-l-2 border-l-indigo-500'
                  : 'hover:bg-gray-50 border-l-2 border-l-transparent'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${getSenderColor(mail.sender)}`}>
                  {mail.sender[0]}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Top row */}
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-1.5 min-w-0">
                      {!mail.isRead && (
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                      )}
                      <span className={`text-sm truncate ${!mail.isRead ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                        {mail.sender}
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-400 shrink-0 ml-2">{mail.time}</span>
                  </div>

                  {/* Subject */}
                  <p className={`text-xs truncate mb-1 ${!mail.isRead ? 'font-medium text-gray-800' : 'text-gray-500'}`}>
                    {mail.subject}
                  </p>

                  {/* Preview + badge row */}
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-[11px] text-gray-400 truncate flex-1">{mail.preview}</p>
                    <div className="flex items-center gap-1 shrink-0">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium ${ACCOUNT_LABELS[mail.account]?.color}`}>
                        {ACCOUNT_LABELS[mail.account]?.label}
                      </span>
                      <button
                        onClick={e => { e.stopPropagation(); onStar(mail.id) }}
                        className={`text-xs leading-none cursor-pointer transition-colors ${mail.isStarred ? 'text-amber-400' : 'text-gray-300 hover:text-amber-400'}`}
                      >
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill={mail.isStarred ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
          {hasMore && (
            <li ref={bottomRef} className="flex justify-center py-4">
              {loadingMore && <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />}
            </li>
          )}
        </ul>
      )}
    </div>
  )
}
