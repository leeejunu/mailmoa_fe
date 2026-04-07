const BASE_URL = 'http://localhost:8080'

export async function connectNaverAccount(token, email, password) {
  const res = await fetch(`${BASE_URL}/api/mailaccounts/naver`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.message || '네이버 계정 연동에 실패했습니다')
  }
}
