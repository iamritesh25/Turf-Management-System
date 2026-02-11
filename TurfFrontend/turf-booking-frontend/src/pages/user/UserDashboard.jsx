import { Routes, Route, Navigate } from "react-router-dom";
import UserSidebar from "./UserSidebar";

import BookTurf from "./BookTurf";
import MyBookings from "./MyBookings";
import UserPayments from "./UserPayments";

export default function UserDashboard() {
  return (
    <div className="app-container">
      <UserSidebar />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="book" />} />
          <Route path="book" element={<BookTurf />} />
          <Route path="bookings" element={<MyBookings />} />
          <Route path="payments" element={<UserPayments />} />
        </Routes>
      </div>
    </div>
  );
}
