import { useState } from "react";
import api from "../../api/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", password: "", role: "USER"
  });

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    await api.post("/users", form);
    alert("Registration successful. Please login.");
    navigate("/login");
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleRegister}>
        <h2>Register</h2>

        <input placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})}/>
        <input placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})}/>
        <input placeholder="Phone" onChange={e=>setForm({...form,phone:e.target.value})}/>
        <input type="password" placeholder="Password"
               onChange={e=>setForm({...form,password:e.target.value})}/>

        <select onChange={e=>setForm({...form,role:e.target.value})}>
          <option value="USER">Register as User</option>
          <option value="OWNER">Register as Owner</option>
        </select>

        <button>Register</button>
      </form>
    </div>
  );
}
