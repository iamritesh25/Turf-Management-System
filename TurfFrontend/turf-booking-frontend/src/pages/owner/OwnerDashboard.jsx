import { NavLink, Routes, Route } from "react-router-dom";
import ManageTurfs from "./ManageTurfs";
import ApproveBookings from "./ApproveBookings";
import OwnerPayments from "./OwnerPayments";
import "../../styles/dashboard.css";

export default function OwnerDashboard() {
  return (
    <div className="app-container">
      
      {/* SINGLE SIDEBAR */}
      <aside className="sidebar">
        <div className="logo">Turf System</div>

        <NavLink to="/owner" end>Dashboard</NavLink>
        <NavLink to="/owner/turfs">Manage Turfs</NavLink>
        <NavLink to="/owner/bookings">Approve Bookings</NavLink>
        <NavLink to="/owner/payments">View Payments</NavLink>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <Routes>
          <Route index element={<OwnerHome />} />
          <Route path="turfs" element={<ManageTurfs />} />
          <Route path="bookings" element={<ApproveBookings />} />
          <Route path="payments" element={<OwnerPayments />} />
        </Routes>
      </main>
    </div>
  );
}

function OwnerHome() {
  return (
    <>
      <h1>Owner Dashboard</h1>

      <div className="card-grid">
        <div className="card">Manage Turfs</div>
        <div className="card">Approve Bookings</div>
        <div className="card">View Payments</div>
      </div>
    </>
  );
}
