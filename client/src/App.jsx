
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  Link,
  useNavigate,
} from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
import { useAuth } from './hooks/useAuth'
import ProtectedRoute from './components/ProtectedRoute'

// Authentication pages
import Login from './pages/Login'
import Register from './pages/Register'

// Client pages
import ClientDashboard from './pages/ClientDashboard'
import GigDetails from './pages/GigDetails'
import MyBookings from './pages/MyBookings'
import BookingDetails from './pages/BookingDetails'
import BookingConfirmation from './pages/BookingConfirmation'

// Redirect users to the correct dashboard based on their role.
function Home() {
  const { user } = useAuth()

  if (user?.role === 'client') {
    return <Navigate to="/client" replace />
  }

  if (user?.role === 'freelancer') {
    return <Navigate to="/freelancer" replace />
  }

  return <Navigate to="/login" replace />
}

// Temporary Freelancer screen.
// Member 1 will provide the actual Freelancer Dashboard.
function FreelancerPlaceholder() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <Link
          className="brand brand-dark"
          to="/"
        >
          HustleHub<span>+</span>
        </Link>

        <button
          type="button"
          className="outline-button"
          onClick={handleLogout}
        >
          Log out
        </button>
      </header>

      <div className="dashboard-content">
        <span className="eyebrow">
          FREELANCER ACCOUNT
        </span>

        <h1>Welcome, Freelancer</h1>

        <p>
          Signed in as {user?.email}.
        </p>

        <p>
          The Freelancer dashboard will be connected
          during group integration.
        </p>
      </div>
    </main>
  )
}

// Shown when an account attempts to access a restricted page.
function Unauthorised() {
  return (
    <main className="message-page">
      <h1>Access restricted</h1>

      <p>
        Your account does not have permission
        to view this page.
      </p>

      <Link to="/">
        Return to Home
      </Link>
    </main>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ==================================
              PUBLIC ROUTES
          ================================== */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          {/* ==================================
              CLIENT-ONLY ROUTES
          ================================== */}

          <Route
            element={
              <ProtectedRoute
                allowedRoles={['client']}
              />
            }
          >
            {/* Client Dashboard and Gig browsing */}
            <Route
              path="/client"
              element={<ClientDashboard />}
            />

            {/* Gig details and Book Gig */}
            <Route
              path="/client/gigs/:id"
              element={<GigDetails />}
            />

            {/* Client Booking history */}
            <Route
              path="/client/bookings"
              element={<MyBookings />}
            />

            {/* Booking confirmation after simulated payment */}
            <Route
              path="/client/bookings/:id/confirmation"
              element={<BookingConfirmation />}
            />

            {/* Individual Booking details */}
            <Route
              path="/client/bookings/:id"
              element={<BookingDetails />}
            />
          </Route>

          {/* ==================================
              FREELANCER-ONLY ROUTES
          ================================== */}

          <Route
            element={
              <ProtectedRoute
                allowedRoles={['freelancer']}
              />
            }
          >
            <Route
              path="/freelancer"
              element={<FreelancerPlaceholder />}
            />
          </Route>

          {/* ==================================
              ACCESS RESTRICTIONS
          ================================== */}

          <Route
            path="/unauthorised"
            element={<Unauthorised />}
          />

          {/* ==================================
              UNKNOWN ROUTES
          ================================== */}

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
