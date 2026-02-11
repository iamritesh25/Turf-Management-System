import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import { useAuth } from "../../auth/AuthContext";

export default function BookTurf() {
  const { user } = useAuth();

  const [turfs, setTurfs] = useState([]);
  const [selectedTurf, setSelectedTurf] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");   // ✅ ADDED
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/turfs")
      .then(res => setTurfs(res.data))
      .catch(err => console.error("Failed to load turfs", err));
  }, []);

  const handleBook = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!user?.id) {
      setMessage("❌ User not logged in properly");
      return;
    }

    if (!selectedTurf || !bookingDate || !timeSlot) {   // ✅ UPDATED
      setMessage("❌ Please select turf, date and time slot");
      return;
    }

    try {
      const payload = {
        userId: parseInt(user.id),
        turfId: parseInt(selectedTurf),
        bookingDate: bookingDate,   // ✅ BACKEND EXPECTS STRING
        timeSlot: timeSlot,         // ✅ REQUIRED BY BACKEND
        status: "PENDING"
      };

      console.log("Booking payload:", payload);

      const res = await api.post("/bookings", payload);

      console.log("Booking response:", res.data);

      setMessage("✅ Booking successful!");
    } catch (err) {
      console.error("Booking failed:", err.response || err);

      const backendError = err.response?.data;

      let errorMsg = "❌ Booking failed. Check backend logs.";

      if (typeof backendError === "string") {
        errorMsg = backendError;
      } else if (backendError?.message) {
        errorMsg = backendError.message;
      } else if (backendError?.error) {
        errorMsg = backendError.error;
      } else if (backendError?.details) {
        errorMsg = backendError.details;
      }

      setMessage(errorMsg);
    }
  };

  return (
  <div className="card">
    <h2 className="card-title">Book Turf</h2>

    {message && (
      <div style={{ marginBottom: 12, fontWeight: 600 }}>
        {message}
      </div>
    )}

    <form onSubmit={handleBook} className="book-form">
      <div className="form-row">
        <div className="form-group">
          <label>Select Turf</label>
          <select
            value={selectedTurf}
            onChange={(e) => setSelectedTurf(e.target.value)}
            className="form-control"
          >
            <option value="">Select Turf</option>
            {turfs.map(t => (
              <option key={t.id} value={t.id}>
                {t.name} - {t.area || t.city || ""}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Select Date</label>
          <input
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Time Slot</label>
          <input
            type="text"
            placeholder="e.g. 6AM - 7AM"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            className="form-control"
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-approve">
          Book Turf
        </button>
      </div>
    </form>
  </div>
);

}
