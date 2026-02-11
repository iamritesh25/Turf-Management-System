import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import { useAuth } from "../../auth/AuthContext";

export default function UserPayments() {
  const { user } = useAuth();

  const [payments, setPayments] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    loadData();
  }, [user]);

  const loadData = async () => {
    try {
      setLoading(true);

      // 1️⃣ Load user's bookings
      const bookingsRes = await api.get(`/bookings/user/${user.id}`);
      const userBookings = bookingsRes.data || [];
      setBookings(userBookings);

      const bookingIds = userBookings.map(b => b.id);

      // 2️⃣ Load all payments
      const paymentsRes = await api.get("/payments");
      const allPayments = paymentsRes.data || [];

      // 3️⃣ Filter payments for this user's bookings
      const userPayments = allPayments.filter(p =>
        bookingIds.includes(p.bookingId)
      );

      setPayments(userPayments);

    } catch (err) {
      console.error("Failed to load user payments", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>My Payments</h2>

      {loading && <p>Loading payments...</p>}

      {!loading && payments.length === 0 && (
        <p>No payments found.</p>
      )}

      {!loading && payments.length > 0 && (
  <div className="payments-card">
    <table className="styled-table">
      <thead>
        <tr>
          <th>Booking</th>
          <th>Payment Method</th>
          <th>Status</th>
          <th>Payment Date</th>
        </tr>
      </thead>

      <tbody>
        {payments.map(p => (
          <tr key={p.id}>
            <td>
              <strong>Booking #{p.bookingId}</strong>
            </td>

            <td>
              {p.paymentMethod}
            </td>

            <td>
              <span className="status-badge approved">
                {p.paymentStatus}
              </span>
            </td>

            <td>
              {p.paymentDate
                ? new Date(p.paymentDate).toLocaleString()
                : "—"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
    </div>
  );
}
