import { useState } from "react"
import EventForm from "./components/EventForm"
import EventList from "./components/EventList"
import UserSummary from "./components/UserSummary"

export default function App() {
  const [refresh, setRefresh] = useState(0)

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <h1>Event Tracker</h1>
      <EventForm onCreated={() => setRefresh((r) => r + 1)} />
      <hr />
      <EventList refresh={refresh} />
      <hr />
      <UserSummary />
    </div>
  )
}