
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function ClientDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <Link className="brand brand-dark" to="/client">
          HustleHub<span>+</span>
        </Link>

        <button className="outline-button" onClick={handleLogout}>
          Log out
        </button>
      </header>

      <div className="dashboard-content">
        <span className="eyebrow">CLIENT DASHBOARD</span>
        <h1>Welcome to HustleHub+</h1>
        <p>You're signed in as {user.email}.</p>

        <section className="dashboard-grid">
          <article className="dashboard-tile">
            <h2>Explore Gigs</h2>
            <p>Find Freelancers offering services that match your needs.</p>
            <span>Gig browsing is the next development phase.</span>
          </article>

          <article className="dashboard-tile">
            <h2>My Bookings</h2>
            <p>Keep track of services you've booked.</p>
            <span>Booking history will be connected next.</span>
          </article>
        </section>
      </div>
    </main>
  )
}
