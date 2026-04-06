import { Link } from 'react-router-dom'

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    title: '모든 메일 한 곳에',
    desc: 'Gmail, Naver, Kakao 등 여러 메일 계정을 하나의 화면에서 확인하세요.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z" />
      </svg>
    ),
    title: '통합 검색',
    desc: '모든 계정의 메일을 한 번에 검색하고 빠르게 찾아보세요.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: '안전한 보안',
    desc: '토큰을 AES-256 암호화로 안전하게 저장하고 관리합니다.',
  },
]

const PROVIDERS = [
  { name: 'Gmail', color: 'text-red-400', icon: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
    </svg>
  )},
  { name: 'Naver', color: 'text-green-400', icon: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z"/>
    </svg>
  )},
  { name: 'Kakao', color: 'text-yellow-400', icon: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.667 1.556 5.009 3.922 6.384L4.5 21l4.617-2.695A11.47 11.47 0 0 0 12 18c5.523 0 10-3.477 10-7.5S17.523 3 12 3z"/>
    </svg>
  )},
  { name: 'Outlook', color: 'text-blue-400', icon: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M7.88 12.04q0 .45-.11.87-.1.41-.33.74-.22.33-.58.52-.37.2-.87.2t-.85-.2q-.35-.21-.57-.55-.22-.33-.33-.75-.1-.42-.1-.86t.1-.87q.1-.43.34-.76.22-.34.59-.54.36-.2.87-.2t.86.2q.35.21.57.55.22.34.31.77.1.43.1.88zM24 12v9.38q0 .46-.33.8-.33.32-.8.32H7.13q-.46 0-.8-.33-.32-.33-.32-.8V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h6.5V2.55q0-.44.3-.75.3-.3.75-.3h12.9q.44 0 .75.3.3.3.3.75V10.85l1.24.72q.01 0 .01.01.04.02.04.07v.28q0 .03-.04.05z"/>
    </svg>
  )},
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </div>
          <span className="text-sm font-bold tracking-tight">Mailmoa</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm text-gray-400 hover:text-white transition-colors">로그인</Link>
          <Link to="/signup" className="text-sm bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-1.5 rounded-lg transition-colors font-medium">시작하기</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 pt-24 pb-20">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium px-3 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          Gmail 연동 지원
        </div>

        <h1 className="text-5xl font-bold tracking-tight leading-tight mb-5">
          모든 메일을<br />
          <span className="text-indigo-400">한 곳에서</span>
        </h1>

        <p className="text-gray-400 text-base max-w-sm leading-relaxed mb-10">
          여러 메일 계정을 하나의 깔끔한 화면에서 확인하세요.<br />
          더 이상 탭을 바꿔가며 메일을 확인하지 않아도 됩니다.
        </p>

        <div className="flex items-center gap-3">
          <Link to="/signup" className="bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-colors">
            무료로 시작하기
          </Link>
          <Link to="/login" className="text-sm text-gray-400 hover:text-white transition-colors px-4 py-2.5">
            로그인 →
          </Link>
        </div>

        {/* Provider badges */}
        <div className="flex items-center gap-3 mt-12">
          {PROVIDERS.map(p => (
            <div key={p.name} className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
              <span className={p.color}>{p.icon}</span>
              <span className="text-xs text-gray-400">{p.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-8 pb-24 max-w-3xl mx-auto w-full">
        <div className="grid grid-cols-3 gap-4">
          {FEATURES.map(f => (
            <div key={f.title} className="bg-white/3 border border-white/8 rounded-2xl p-5">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="text-sm font-semibold text-white mb-1.5">{f.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/5 px-8 py-5 flex items-center justify-between">
        <span className="text-xs text-gray-600">© 2026 Mailmoa</span>
        <span className="text-xs text-gray-600">메일을 한 곳에서</span>
      </footer>
    </div>
  )
}
