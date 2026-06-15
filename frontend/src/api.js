const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

export async function fetchEvents({ userId, type } = {}) {
  const params = new URLSearchParams()
  if (userId) params.append("user_id", userId)
  if (type) params.append("type", type)
  const res = await fetch(`${API_URL}/events?${params}`)
  return res.json()
}

export async function createEvent(data) {
  const res = await fetch(`${API_URL}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function fetchUserSummary(userId) {
  const res = await fetch(`${API_URL}/users/${userId}/summary`)
  if (res.status === 404) return null
  return res.json()
}