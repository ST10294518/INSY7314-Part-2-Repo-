
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
import Login from './pages/Login'
import Register from './pages/Register'
import ClientDashboard from './pages/ClientDashboard'

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
        <Link className="brand brand-dark" to="/">
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
        <span className="eyebrow">FREELANCER ACCOUNT</span>
        <h1>Welcome, Freelancer</h1>
        <p>Signed in as {user.email}.</p>
        <p>
          The Freelancer dashboard will be connected
          during group integration.
        </p>
      </div>
    </main>
  )
}

function Unauthorised() {
  return (
    <main className="message-page">
      <h1>Access restricted</h1>
      <p>
        Your account does not have permission
        to view this page.
      </p>
      <Link to="/">Return to Home</Link>
    </main>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            element={
              <ProtectedRoute allowedRoles={['client']} />
            }
          >
            <Route
              path="/client"
              element={<ClientDashboard />}
            />
          </Route>

          <Route
            element={
              <ProtectedRoute allowedRoles={['freelancer']} />
            }
          >
            <Route
              path="/freelancer"
              element={<FreelancerPlaceholder />}
            />
          </Route>

          <Route
            path="/unauthorised"
            element={<Unauthorised />}
          />

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
