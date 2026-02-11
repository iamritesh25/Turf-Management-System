import { useAuth } from "../../auth/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="card" style={{ maxWidth: 900, margin: "0 auto" }}>
      <h2 className="card-title">My Profile</h2>

      {/* ================= USER INFO ================= */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          marginBottom: 30,
        }}
      >
        <div>
          <p><strong>Full Name</strong></p>
          <p>{user?.name || "—"}</p>
        </div>

        <div>
          <p><strong>Email</strong></p>
          <p>{user?.email || "—"}</p>
        </div>

        <div>
          <p><strong>Phone</strong></p>
          <p>{user?.phone || "Not Provided"}</p>
        </div>

        <div>
          <p><strong>Role</strong></p>
          <span className="status-badge approved">
            {user?.role}
          </span>
        </div>
      </div>

      {/* ================= MEMBERSHIP SECTION ================= */}
      <div
        style={{
          borderTop: "1px solid #e5e7eb",
          paddingTop: 20,
          marginTop: 10,
        }}
      >
        <h3 style={{ marginBottom: 15 }}>Membership Details</h3>

        {/* 🔥 These can be wired to backend later */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 20,
          }}
        >
          <div className="card" style={{ padding: 15 }}>
            <p><strong>Plan</strong></p>
            <p>Standard</p>
          </div>

          <div className="card" style={{ padding: 15 }}>
            <p><strong>Status</strong></p>
            <span className="status-badge approved">Active</span>
          </div>

          <div className="card" style={{ padding: 15 }}>
            <p><strong>Valid Till</strong></p>
            <p>31 Dec 2026</p>
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 20 }}>
          <button className="btn btn-approve">
            Upgrade Membership
          </button>
        </div>
      </div>
    </div>
  );
}
