const BASE_URL = 'http://localhost:8080'

export async function getMails(token, page = 0, size = 50) {
  const res = await fetch(`${BASE_URL}/api/mails?page=${page}&size=${size}`, {
    headers: { 'Authorization': `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('메일을 불러오지 못했습니다')
  return res.json()
}

export async function getMailCount(token) {
  const res = await fetch(`${BASE_URL}/api/mails/count`, {
    headers: { 'Authorization': `Bearer ${token}` },
  })
  if (!res.ok) throw new Error()
  return res.json()
}

export async function deleteMail(token, mailId) {
  const res = await fetch(`${BASE_URL}/api/mails/${mailId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('메일 삭제에 실패했습니다')
}

export async function markAsRead(token, mailId) {
  await fetch(`${BASE_URL}/api/mails/${mailId}/read`, {
    method: 'PATCH',
    headers: { 'Authorization': `Bearer ${token}` },
  })
}

export async function getMailDetail(token, mailId) {
  const res = await fetch(`${BASE_URL}/api/mails/${mailId}`, {
    headers: { 'Authorization': `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('메일을 불러오지 못했습니다')
  return res.json()
}

export async function syncMails(token) {
  const res = await fetch(`${BASE_URL}/api/mails/sync`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('동기화 실패')
}

export async function loadOlderNaverMails(token) {
  const res = await fetch(`${BASE_URL}/api/mails/load-older`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
  })
  if (!res.ok) return 0
  return res.json()
}
