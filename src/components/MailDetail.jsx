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

export default function MailDetail({ mail, onStar, onDelete }) {
  if (!mail) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 gap-3">
        <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 flex items-center justify-center shadow-sm">
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-gray-400">메일을 선택하세요</p>
          <p className="text-xs text-gray-300 mt-0.5">왼쪽 목록에서 메일을 클릭하면 내용이 표시됩니다</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Toolbar */}
      <div className="px-8 py-3.5 border-b border-gray-100 flex items-center gap-2">
        <button className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 10h18M3 14h18"/>
          </svg>
        </button>
        <button className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 00-4-4H4"/>
          </svg>
        </button>
        <button className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 17 20 12 15 7"/><path d="M4 18v-2a4 4 0 014-4h12"/>
          </svg>
        </button>
        <div className="w-px h-4 bg-gray-200 mx-1" />
        <button
          onClick={() => onStar(mail.id)}
          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${mail.isStarred ? 'text-amber-400 bg-amber-50' : 'text-gray-400 hover:bg-gray-100 hover:text-amber-400'}`}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill={mail.isStarred ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </button>
        <button onClick={() => onDelete(mail.id)} className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-400 transition-colors cursor-pointer ml-auto">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
          </svg>
        </button>
      </div>

      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-100">
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-gray-900 leading-snug">{mail.subject}</h2>
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 ${ACCOUNT_LABELS[mail.account]?.color}`}>
            {ACCOUNT_LABELS[mail.account]?.label}
          </span>
        </div>

        {/* Sender info */}
        <div className="flex items-center gap-3 mt-5">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${getSenderColor(mail.sender)}`}>
            {mail.sender[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900">{mail.sender}</p>
            <p className="text-xs text-gray-400 truncate">{mail.senderEmail}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs text-gray-400">{mail.time}</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 relative min-h-0">
        {mail.body === null ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <iframe
            srcDoc={mail.body}
            className="absolute inset-0 w-full h-full border-0"
            sandbox="allow-popups"
          />
        )}
      </div>

      {/* Reply bar */}
      <div className="px-8 py-4 border-t border-gray-100">
        <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 cursor-text hover:border-indigo-300 transition-colors">
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 00-4-4H4"/>
          </svg>
          <p className="text-sm text-gray-400 flex-1">{mail.sender}에게 답장...</p>
          <button className="text-xs bg-indigo-500 text-white px-3 py-1 rounded-lg hover:bg-indigo-600 transition-colors cursor-pointer font-medium">
            답장
          </button>
        </div>
      </div>
    </div>
  )
}
