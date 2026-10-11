
import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { bookingApi } from '../services/api'
import { useAuth } from '../hooks/useAuth'

const formatPrice = (amount) =>
  new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
  }).format(Number(amount) || 0)

export default function BookingConfirmation() {
  const { id } = useParams()
  const location = useLocation()
  const { token } = useAuth()

  const initialBooking =
    location.state?.booking?._id === id
      ? location.state.booking
      : null

  const initialTransaction = initialBooking
    ? location.state?.transaction
    : null

  const [booking, setBooking] = useState(initialBooking)
  const [transaction] = useState(initialTransaction)
  const [loading, setLoading] = useState(!initialBooking)
  const [error, setError] = useState('')

  useEffect(() => {
    if (initialBooking) return

    let cancelled = false

    async function loadBooking() {
      try {
        const response = await bookingApi.getById(id, token)
        if (!cancelled) setBooking(response.booking)
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Unable to load the Booking.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadBooking()

    return () => {
      cancelled = true
    }
  }, [id, token, initialBooking])

  if (loading) {
    return (
      <main className="dashboard-content">
        <p role="status">Loading Booking confirmation...</p>
      </main>
    )
  }

  if (error || !booking) {
    return (
      <main className="dashboard-content">
        <h1>Booking unavailable</h1>
        <p role="alert">{error || 'Booking not found.'}</p>
        <Link to="/client/bookings">View My Bookings</Link>
      </main>
    )
  }

  return (
    <main className="dashboard-content">
      <div className="confirmation-card">
        <span className="confirmation-icon" aria-hidden="true">
          ✓
        </span>

        <span className="eyebrow">BOOKING CONFIRMATION</span>
        <h1>Booking confirmed!</h1>

        <p>
          Your Booking has been created successfully
          using a simulated payment.
        </p>

        <div className="confirmation-summary">
          <div>
            <span>Booking reference</span>
            <strong>{booking._id}</strong>
          </div>

          <div>
            <span>Payment amount</span>
            <strong>{formatPrice(booking.price)}</strong>
          </div>

          <div>
            <span>Booking status</span>
            <strong>{booking.status}</strong>
          </div>

          <div>
            <span>Payment type</span>
            <strong>Simulated payment</strong>
          </div>

          {transaction && (
            <div>
              <span>Transaction reference</span>
              <strong>{transaction._id}</strong>
            </div>
          )}
        </div>

        <p className="booking-note">
          No actual money has been charged.
        </p>

        <div className="confirmation-actions">
          <Link
            to="/client/bookings"
            className="primary-button"
          >
            View My Bookings
          </Link>

          <Link
            to="/client"
            className="outline-button"
          >
            Explore More Gigs
          </Link>
        </div>
      </div>
    </main>
  )
}
