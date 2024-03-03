import React, { useState, useEffect, useRef } from "react";
import Navbar from '../../components/novaNavbar';
import conf from "../../conf";
import Swal from 'sweetalert2';
import { Link , useNavigate } from "react-router-dom";
import { userData } from '../../helpers';
import "./Payment.css";

const Payment = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [, setImageUrl] = useState(null);
  const [Title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [bank, setBank] = useState("");
  const [Date, setDate] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const userDataFromLocalStorage = userData(); // get user data from local storage
    setUser(userDataFromLocalStorage);
  }, []);

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedImage = files[0];
      const fileType = selectedImage.type;
      const fileSize = selectedImage.size;
  
      // ตรวจสอบประเภทของไฟล์
      if (!fileType.match(/^image\/(png|jpeg|gif)$/)) {
        Swal.fire({
          title: 'อัปโหลดเป็นไฟล์รูปเท่านั้น',
          icon: 'error',
          text: 'โปรดอัปโหลดเป็นไฟล์ PNG, JPEG, or GIF เท่านั้น.',
        });
        return;
      }
  
      // ตรวจสอบขนาดของไฟล์
      if (fileSize > 10 * 1024 * 1024) {
        Swal.fire({
          title: 'ขนาดไฟล์เกิน 10MB',
          icon: 'error',
          text: 'โปรดเลือกไฟล์ที่มีขนาดเล็กกว่า 10MB',
        });
        return;
      }
  
      setImage(selectedImage);
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      const droppedImage = files[0];
      setImage(droppedImage);
      setImageUrl(URL.createObjectURL(droppedImage));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!user) {
      navigate("/login");
      Swal.fire({
        title: 'โปรดเข้าสู่ระบบก่อน',
        icon: 'error',
        text: 'คุณไม่ได้รับอนุญาตให้ทำการแจ้งโอน',
      });
      return;
    }
  
    if (!image) {
        Swal.fire({
          title: 'รูปภาพหายไป',
          icon: 'error',
          text: 'กรุณาเลือกภาพก่อนส่ง',
        });
        return;
      }
  
    const formData = new FormData();
    formData.append("data", JSON.stringify({
      Title,
      amount,
      bank,
      Date,
      username: user.username, // เพิ่มข้อมูล username จาก user ที่ได้จาก Local Storage
      email: user.email,
      status: "Inspecting",
    }));
  
    formData.append("files.slipImage", image);
  
    try {
      const response = await fetch(`${conf.apiPrefix}/api/payments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
        body: formData,
      });
      if (response.ok) {
        navigate("/paymenthistory");
        Swal.fire({
          title: 'แจ้งยอดโอนสำเร็จ',
          icon: 'success',
          text: ' รอแอดมินตรวจสอบ สามารถเช็คที่ประวัติการโอน',
        });
        
      } else {
        console.error(`Failed to add image. Status code: ${response.status}`);
        Swal.fire({
          title: 'Error!',
          icon: 'error',
          text: 'not complete',
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error!',
        icon: 'error',
        text: 'error',
      });
    }
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit} className="payment-page">
        <div className="payment-container">
        <h2>แจ้งโอนเงิน</h2>
        <Link to={`/paymenthistory`}>
          <button className="btn-secondary">ประวัติการแจ้งโอน</button>
        </Link>
        <div className="form-group">
          <label>กรอกเลขบิล</label>
          <input
            type="text"
            name="bill"
            value={Title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="กรอกเลขบิล"
            maxLength={10}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>เลือกธนาคาร</label>
          <select
            name="bank"
            value={bank}
            onChange={(event) => setBank(event.target.value)}
            className="form-input"
          >
            <option value="">โปรดเลือกธนาคาร</option>
            <option value="xxx-xxx-xxxx ธนาคารกสิกรไทย">xxx-xxx-xxxx ธนาคารกสิกรไทย</option>
          </select>
        </div>
        <div className="form-group">
          <label>จำนวนยอดโอน</label>
          <input
            type="number"
            name="amount"
            value={amount}
            placeholder="จำนวนยอดโอน"
            min={1}
            max={10000000}
            onChange={(event) => setAmount(event.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>วันที่และเวลาที่โอน</label>
          <input
            type="datetime-local"
            name="date"
            value={Date}
            onChange={(event) => setDate(event.target.value)}
            placeholder="เวลาที่โอน"
            className="form-input"
          />
        </div>
        <div className="form-group"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="slipImage/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="btn-primary">ยืนยันแจ้งโอน</button>
        </div>
      </form>
    </div>
  );
  
}

export default Payment;