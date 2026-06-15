import { useState } from "react"
import { createEvent } from "../api"

const EVENT_TYPES = ["login", "transaction", "report"]

export default function EventForm({ onCreated }) {
  const [form, setForm] = useState({ user_id: "", type: "login", payload: "" })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await createEvent({
      user_id: form.user_id,
      type: form.type,
      payload: form.payload ? JSON.parse(form.payload) : null,
    })
    setLoading(false)
    onCreated()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Créer un événement</h2>
      <input
        placeholder="user_id"
        value={form.user_id}
        onChange={(e) => setForm({ ...form, user_id: e.target.value })}
        required
      />
      <select
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
      >
        {EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}
      </select>
      <input
        placeholder='payload JSON optionnel ex: {"key": "value"}'
        value={form.payload}
        onChange={(e) => setForm({ ...form, payload: e.target.value })}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Envoi..." : "Créer"}
      </button>
    </form>
  )
}