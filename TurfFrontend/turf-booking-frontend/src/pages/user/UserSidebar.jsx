import { NavLink } from "react-router-dom";

export default function UserSidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">User Menu</h2>

      <NavLink to="/user/book">🏟 Book Turf</NavLink>
      <NavLink to="/user/bookings">📅 My Bookings</NavLink>
      <NavLink to="/user/payments">💳 Payments</NavLink>

    </div>
  );
}
