import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import { useAuth } from "../../auth/AuthContext";

export default function OwnerPayments() {
  const { user } = useAuth();

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    loadOwnerPayments();
  }, [user]);

  const loadOwnerPayments = async () => {
    try {
      setLoading(true);

      // 1️⃣ Get turfs owned by this owner
      const turfsRes = await api.get(`/turfs/owner/${user.id}`);
      const ownerTurfs = turfsRes.data || [];
      const ownerTurfIds = ownerTurfs.map(t => t.id);

      // 2️⃣ Get all bookings
      const bookingsRes = await api.get("/bookings");
      const allBookings = bookingsRes.data || [];

      // 3️⃣ Filter bookings for owner's turfs
      const ownerBookings = allBookings.filter(b =>
        ownerTurfIds.includes(b.turfId)
      );

      const ownerBookingIds = ownerBookings.map(b => b.id);

      // 4️⃣ Get all payments
      const paymentsRes = await api.get("/payments");
      const allPayments = paymentsRes.data || [];

      // 5️⃣ Filter payments for owner's bookings
      const ownerPayments = allPayments.filter(p =>
        ownerBookingIds.includes(p.bookingId)
      );

      setPayments(ownerPayments);

    } catch (err) {
      console.error("Failed to load owner payments", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">Owner Payments</h2>
      <p className="text-muted">
        Payments received for your turfs
      </p>

      {loading && <p>Loading payments...</p>}

      {!loading && payments.length === 0 && (
        <p>No payments found for your turfs.</p>
      )}

      {!loading && payments.length > 0 && (
        <div className="payments-card">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Booking</th>
                <th>Method</th>
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

                  <td>{p.paymentMethod}</td>

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
