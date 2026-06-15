import { useState } from "react"
import { fetchUserSummary } from "../api"

export default function UserSummary() {
  const [userId, setUserId] = useState("")
  const [summary, setSummary] = useState(null)
  const [notFound, setNotFound] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    const data = await fetchUserSummary(userId)
    if (data === null) {
      setSummary(null)
      setNotFound(true)
    } else {
      setSummary(data)
      setNotFound(false)
    }
  }

  return (
    <div>
      <h2>Résumé utilisateur</h2>
      <form onSubmit={handleSearch}>
        <input
          placeholder="user_id"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <button type="submit">Rechercher</button>
      </form>
      {notFound && <p>Aucun événement pour cet utilisateur.</p>}
      {summary && (
        <div>
          <p>Total : {summary.total_events}</p>
          <p>Premier événement : {new Date(summary.first_event_at).toLocaleString()}</p>
          <p>Dernier événement : {new Date(summary.last_event_at).toLocaleString()}</p>
          <ul>
            {Object.entries(summary.by_type).map(([type, count]) => (
              <li key={type}>{type} : {count}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}