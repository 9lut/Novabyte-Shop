import axios from "axios";
import React, { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import Navbar from '../../components/novaNavbar';
import Swal from 'sweetalert2';
import conf from "../../conf";

const initialUser = { email: "", username: "" , password: "", confirmPassword: ""};
const Registration = () => {
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  const handleUserChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  const signUp = async () => {
    try {
      const url = `${conf.apiPrefix}/api/auth/local/register`;
      // ตรวจสอบว่ามีฟิลด์แต่ละอันถูกกรอกหรือไม่
      if (!user.name || !user.username || !user.email || !user.password || !user.confirmPassword) {
        Swal.fire({
          icon: 'error',
          title: 'สมัครล้มเหลว',
          text: 'กรุณากรอกข้อมูลให้ครบทุกช่อง',
        });
        return;
      }
  
      // ตรวจสอบ username ว่าเป็นพิมพ์เล็กเท่านั้นหรือไม่
      if (!/^[a-z]+$/.test(user.username)) {
        Swal.fire({
          icon: 'error',
          title: 'สมัครล้มเหลว',
          text: 'ชื่อผู้ใช้ต้องเป็นพิมพ์เล็กเท่านั้น',
        });
        return;
      }
  
      // ตรวจสอบรหัสผ่านว่ามีความยาวอย่างน้อย 6 ตัวอักษรหรือไม่
      if (user.password.length < 6) {
        Swal.fire({
          icon: 'error',
          title: 'สมัครล้มเหลว',
          text: 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร',
        });
        return;
      }
  
      // ตรวจสอบว่ารหัสผ่านและยืนยันรหัสผ่านตรงกันหรือไม่
      if (user.password !== user.confirmPassword) {
        Swal.fire({
          icon: 'error',
          title: 'สมัครล้มเหลว',
          text: 'กรุณาตรวจสอบรหัสผ่านและยืนยันรหัสผ่านของคุณ',
        });
        return;
      }
  
      // ส่งคำขอสมัครผ่าน API
      const res = await axios.post(url, user);
      if (!!res) {
        setUser(initialUser);
        navigate("/login");
        Swal.fire({
          icon: 'success',
          title: 'สมัครสำเร็จ',
          text: 'ยินดีต้อนรับเข้าสู่เว็บไซต์ NovaByte Shop',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'สมัครล้มเหลว',
        text: 'กรุณาลองอีกครั้ง.',
      });
    }
  };
  

  return (
    <div>
      <Navbar />
      <div className="login-page">
        <div className="login-container">
          <div className="form-container">
            <h2>สมัครสมาชิก</h2>
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleUserChange}
                placeholder="ชื่อ"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleUserChange}
                placeholder="บัญชีผู้ใช้"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleUserChange}
                placeholder="อีเมลล์"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleUserChange}
                placeholder="รหัสผ่าน"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleUserChange}
                placeholder="ยืนยันรหัสผ่าน"
                className="form-input"
              />
            </div>
            <button className="btn-primary" onClick={signUp}>
              สมัครสมาชิก
            </button>
            <div className="link-to-register">
              <div>มีบัญชีแล้ว <Link to="/login">เข้าสู่ระบบ</Link> </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
