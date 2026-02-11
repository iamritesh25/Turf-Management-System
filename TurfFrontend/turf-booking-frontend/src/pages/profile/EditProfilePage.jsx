import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import api from "../../api/axiosConfig";

export default function EditProfilePage() {
  const { user } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const payload = { name, email, phone };
      const res = await api.put(`/users/${user.id}`, payload);

      localStorage.setItem("user", JSON.stringify(res.data));
      setMessage("✅ Profile updated successfully!");
      setTimeout(() => {
        window.location.href = "/profile";
      }, 1000);
    } catch (err) {
      console.error("Profile update failed", err);
      setMessage("❌ Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: 520,
          padding: "30px 35px",
        }}
      >
        <h2
          className="card-title"
          style={{ textAlign: "center", marginBottom: 25 }}
        >
          Edit Profile
        </h2>

        {message && (
          <div
            style={{
              marginBottom: 15,
              padding: "10px 12px",
              borderRadius: 6,
              fontWeight: 600,
              background: message.startsWith("✅")
                ? "#ecfdf5"
                : "#fef2f2",
              color: message.startsWith("✅")
                ? "#065f46"
                : "#991b1b",
              border: message.startsWith("✅")
                ? "1px solid #a7f3d0"
                : "1px solid #fecaca",
              textAlign: "center",
            }}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSave}>
          {/* Full Name */}
          <div style={{ marginBottom: 18 }}>
            <label
              style={{
                display: "block",
                marginBottom: 6,
                fontWeight: 600,
              }}
            >
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #d1d5db",
                outline: "none",
              }}
              required
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: 18 }}>
            <label
              style={{
                display: "block",
                marginBottom: 6,
                fontWeight: 600,
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #d1d5db",
                outline: "none",
                background: "#f9fafb",
              }}
              required
            />
          </div>

          {/* Phone */}
          <div style={{ marginBottom: 22 }}>
            <label
              style={{
                display: "block",
                marginBottom: 6,
                fontWeight: 600,
              }}
            >
              Phone Number
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #d1d5db",
                outline: "none",
              }}
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: 10,
              border: "none",
              fontWeight: 700,
              fontSize: 15,
              background: "#2563eb",
              color: "white",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 4px 10px rgba(37,99,235,0.25)",
            }}
          >
            {loading ? "Saving Changes..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
