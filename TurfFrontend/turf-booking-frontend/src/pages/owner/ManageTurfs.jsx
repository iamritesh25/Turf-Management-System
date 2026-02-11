import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import { useAuth } from "../../auth/AuthContext";
import "../../styles/ownerTables.css";

export default function ManageTurfs() {
  const { user } = useAuth();
  console.log("LOGGED IN OWNER:", user);

  const [turfs, setTurfs] = useState([]);
  const [form, setForm] = useState({
    name: "",
    city: "",
    pricePerHour: ""
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ✅ Load ONLY this owner's turfs
  const load = async () => {
    try {
      if (!user?.id) return;

      setLoading(true);

      // 🔥 FIXED (removed extra /api)
      const res = await api.get(`/turfs/owner/${user.id}`);

      setTurfs(res.data || []);
    } catch (err) {
      console.error("Failed to load turfs", err);
      setError("Failed to load turfs. Please refresh.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [user]);

  // Add turf
  const addTurf = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.city || !form.pricePerHour) {
      setError("All fields are required.");
      return;
    }

    try {
      setSaving(true);

      // 🔥 FIXED (removed extra /api)
      await api.post("/turfs", {
        name: form.name,
        location: form.city,     // backend uses location
        pricePerHour: Number(form.pricePerHour),
        ownerId: user.id,        // ✅ OWNER LINKED
        available: true
      });

      setForm({ name: "", city: "", pricePerHour: "" });
      load();
    } catch (err) {
      console.error("Failed to add turf", err);
      setError("Failed to add turf. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="owner-page">
      <h1>Manage Turfs</h1>

      {error && (
        <div style={{ marginBottom: 12, color: "#dc2626", fontWeight: 600 }}>
          {error}
        </div>
      )}

      <form className="turf-form" onSubmit={addTurf}>
        <input
          placeholder="Turf Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="City"
          value={form.city}
          onChange={(e) =>
            setForm({ ...form, city: e.target.value })
          }
        />

        <input
          placeholder="Price Per Hour"
          type="number"
          min="0"
          value={form.pricePerHour}
          onChange={(e) =>
            setForm({ ...form, pricePerHour: e.target.value })
          }
        />

        <button
          type="submit"
          className="btn-primary"
          disabled={saving}
        >
          {saving ? "Adding..." : "+ Add Turf"}
        </button>
      </form>

      <div className="table-card">
        {loading ? (
          <p style={{ padding: 20, textAlign: "center" }}>
            Loading turfs...
          </p>
        ) : (
          <table className="styled-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Turf Name</th>
                <th>City</th>
                <th>Price / Hour (₹)</th>
              </tr>
            </thead>

            <tbody>
              {turfs.map((t) => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.name}</td>
                  <td>{t.location || "-"}</td>
                  <td>₹ {t.pricePerHour}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && turfs.length === 0 && (
          <p style={{ padding: 20, textAlign: "center", color: "#6b7280" }}>
            No turfs found. Add your first turf.
          </p>
        )}
      </div>
    </div>
  );
}
