import { useState, useEffect } from "react"
import { fetchEvents } from "../api"

const EVENT_TYPES = ["", "login", "transaction", "report"]

export default function EventList({ refresh }) {
  const [events, setEvents] = useState([])
  const [userId, setUserId] = useState("")
  const [type, setType] = useState("")

  useEffect(() => {
    fetchEvents({ userId, type }).then(setEvents)
  }, [userId, type, refresh])

  return (
    <div>
      <h2>Événements</h2>
      <input
        placeholder="Filtrer par user_id"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        {EVENT_TYPES.map((t) => (
          <option key={t} value={t}>{t || "Tous les types"}</option>
        ))}
      </select>
      {events.length === 0 && <p>Aucun événement.</p>}
      <ul>
        {events.map((e) => (
          <li key={e.id}>
            <strong>{e.type}</strong> — {e.user_id} — {new Date(e.created_at).toLocaleString()}
            {e.payload && <pre>{JSON.stringify(e.payload, null, 2)}</pre>}
          </li>
        ))}
      </ul>
    </div>
  )
}