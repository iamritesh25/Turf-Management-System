import Sidebar from "./Sidebar";
import "../styles/dashboard.css";

export default function DashboardLayout({ children }) {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
