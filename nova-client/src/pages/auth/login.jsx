import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { storeUser } from "../../helpers";
import Swal from 'sweetalert2';
import Navbar from '../../components/novaNavbar';
import conf from "../../conf";
import "./Login.css";

const Login = () => {
  const initialUser = { password: "", identifier: "" };
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    const url = `${conf.apiPrefix}/api/auth/local`;
    try {
      if (user.identifier && user.password) {
        setLoading(true);
        const { data } = await axios.post(url, user);
        if (data.jwt) {
          storeUser(data);
          setUser(initialUser);
          navigate("/");
          Swal.fire({
            icon: 'success',
            title: 'เข้าสู่ระบบสำเร็จ',
            text: 'ยินดีต้อนรับเข้าสู่เว็บไซต์ NovaByte Shop',
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'การเข้าสู่ระบบล้มเหลว',
          text: 'กรุณากรอกอีเมลและรหัสผ่าน',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'การเข้าสู่ระบบล้มเหลว',
        text: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองอีกครั้ง.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div>
      <Navbar />
      <div className="login-page">
        <div className="login-container">
          <div className="form-container">
            <h2>เข้าสู่ระบบ</h2>
            <div className="form-group">
              <label>บัญชีผู้ใช้หรืออีเมล</label>
              <input
                type="email"
                name="identifier"
                value={user.identifier}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder="อีเมล"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>รหัสผ่าน</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder="รหัสผ่าน"
                className="form-input"
              />
            </div>
            <button className="btn-primary" onClick={handleLogin} disabled={loading}>
              {loading ? "กำลังเข้าสู่ระบบ" : "เข้าสู่ระบบ"}
            </button>
            <div className="link-to-register">
              <div>ยังไม่มีบัญชีใช่ไหม? <Link to="/register">สมัครตรงนี้</Link> </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
