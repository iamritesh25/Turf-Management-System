import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function ProfileMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="profile-menu">
      <div className="profile-trigger" onClick={() => setOpen(!open)}>
        👤 {user.name} ⌄
      </div>

      {open && (
        <div className="profile-dropdown">
          <div onClick={() => navigate("/profile")}>View Profile</div>
          <div onClick={() => navigate("/profile/edit")}>Edit Profile</div>
          <hr />
          <div onClick={() => { logout(); navigate("/"); }}>
            Logout
          </div>
        </div>
      )}
    </div>
  );
}
