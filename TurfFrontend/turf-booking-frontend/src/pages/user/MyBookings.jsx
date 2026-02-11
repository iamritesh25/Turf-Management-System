import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import { useAuth } from "../../auth/AuthContext";

export default function MyBookings() {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isBookingPaid = (bookingId) => {
  return payments.some(
    (p) => p.bookingId === bookingId && p.paymentStatus === "PAID"
  );
};

  const loadPayments = async () => {
  try {
    const res = await api.get("/payments");
    setPayments(res.data || []);
  } catch (err) {
    console.error("Failed to load payments", err);
  }
};

  const loadBookings = () => {
  if (!user?.id) return;

  setLoading(true);
  setError("");

  api.get(`/bookings/user/${user.id}`)
    .then(res => {
      setBookings(res.data || []);
    })
    .catch(err => {
      console.error("Failed to load bookings", err);
      setError("Failed to load your bookings.");
    })
    .finally(() => {
      setLoading(false);
    });
};

  useEffect(() => {
  loadBookings();
   loadPayments();
}, [user]);


const [payingId, setPayingId] = useState(null);

const handlePay = async (booking) => {
  try {
    setPayingId(booking.id); // 🔒 lock button

    const paymentPayload = {
      bookingId: booking.id,
      amount: booking.totalAmount || booking.amount || booking.price || 500,
      paymentMethod: "UPI",
      paymentStatus: "PAID",
      paymentDate: new Date().toISOString(),
      transactionId: "TXN-" + Date.now(),
      refundAmount: 0,
      refundDate: null
    };

    console.log("FINAL Payment Payload:", paymentPayload);

    // ✅ CORRECT API
    await api.post("/payments", paymentPayload);

    // small delay to allow DB commit
    setTimeout(async () => {
      await loadPayments();
      await loadBookings();
    }, 300);

    alert("Payment Successful!");

  } catch (err) {
    console.error("Payment failed FULL ERROR:", err);
    console.error("Backend response:", err?.response?.data);
    console.error("Status:", err?.response?.status);
    alert("Payment failed!");
  } finally {
    setPayingId(null);
  }
};

  return (
    <div className="card">
      <h2 className="card-title">My Bookings</h2>

      {loading && <p>Loading your bookings...</p>}

      {error && (
        <div style={{ marginBottom: 12, color: "#dc2626", fontWeight: 600 }}>
          {error}
        </div>
      )}

      {!loading && bookings.length === 0 && (
        <p className="empty-text">You have not made any bookings yet.</p>
      )}

      {!loading && bookings.length > 0 && (
        <table className="styled-table">
          <thead>
            <tr>
              <th>Turf ID</th>
              <th>Time Slot</th>
              <th>Date</th>
              <th>Status</th>
              <th>Payment</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map(b => (
              <tr key={b.id}>
                <td>
                  <strong>#{b.turfId}</strong>
                </td>

                <td>
                  {b.timeSlot || "—"}
                </td>

                <td>
                  {b.bookingDate}
                </td>

                <td>
                  <span className={`status-badge ${b.status?.toLowerCase()}`}>
                    {b.status}
                  </span>
                </td>
                <td>
  {isBookingPaid(b.id) ? (
    <span className="status-badge approved">
      PAID
    </span>
  ) : (
    <button
      className="btn btn-success"
      disabled={b.status !== "APPROVED"}
      onClick={() => handlePay(b)}
    >
      {b.status === "APPROVED" ? "Pay Now" : "Not Allowed"}
    </button>
  )}
</td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
