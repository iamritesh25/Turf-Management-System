import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import { useAuth } from "../../auth/AuthContext";

export default function ApproveBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [turfMap, setTurfMap] = useState({});   // ✅ ADDED
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      if (!user?.id) return;

      setLoading(true);

      // Load bookings
      const res = await api.get(`/bookings/owner/${user.id}`);
      setBookings(res.data || []);

      // Load turfs for name + location mapping
      const turfsRes = await api.get("/turfs");
      const map = {};
      (turfsRes.data || []).forEach(t => {
        map[t.id] = t;
      });
      setTurfMap(map);

    } catch (err) {
      console.error("Failed to load bookings", err);
      setError("Failed to load bookings. Please refresh.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [user]);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/bookings/${id}/status?status=${status}`);
      load();
    } catch (err) {
      console.error("Failed to update booking status", err);
      setError("Failed to update booking status.");
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">Approve Bookings</h2>

      {error && (
        <div style={{ marginBottom: 12, color: "#dc2626", fontWeight: 600 }}>
          {error}
        </div>
      )}

      {loading ? (
        <p>Loading bookings...</p>
      ) : (
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Turf</th>
              <th>Location</th>   {/* ✅ CHANGED */}
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.userId}</td>

                {/* Turf Name */}
                <td>
                  {turfMap[b.turfId]?.name || `Turf #${b.turfId}`}
                </td>

                {/* ✅ Turf Location */}
                <td>
                  {turfMap[b.turfId]?.location ||
                   turfMap[b.turfId]?.area ||
                   turfMap[b.turfId]?.city ||
                   "--"}
                </td>

                {/* Status Badge */}
                <td>
                  <span className={`status-badge ${b.status?.toLowerCase()}`}>
                    {b.status}
                  </span>
                </td>

                {/* Action Buttons */}
                <td className="action-cell">
                  <button
                    className="btn btn-approve"
                    onClick={() => updateStatus(b.id, "APPROVED")}
                    disabled={b.status === "APPROVED"}
                  >
                    Approve
                  </button>

                  <button
                    className="btn btn-reject"
                    onClick={() => updateStatus(b.id, "REJECTED")}
                    disabled={b.status === "REJECTED"}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && bookings.length === 0 && (
        <p className="empty-text">No bookings found for your turfs.</p>
      )}
    </div>
  );
}
