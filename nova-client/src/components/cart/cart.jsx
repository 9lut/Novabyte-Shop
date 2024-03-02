import React, { useEffect, useState } from 'react';
import NovaNavbar from '../novaNavbar';
import { useNavigate } from "react-router-dom";
import conf from "../../conf";
import Swal from 'sweetalert2';
import { userData } from '../../helpers';
import './Cart.css';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Cart = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [showAddressModal, setShowAddressModal] = useState(false);

  const handleShowAddressModal = () => {
    if (uniqueCartItems.length === 0) {
      navigate("/productall");
      Swal.fire({
        icon: 'warning',
        title: 'กรุณาเพิ่มสินค้า!',
        text: 'ไม่มีสินค้าในตะกร้า โปรดเพิ่มสินค้าก่อนที่จะสั่งซื้อ',
      });
    } else {
      setShowAddressModal(true);
    }
  };  const handleCloseAddressModal = () => setShowAddressModal(false);

  // ย้ายการกำหนดขอบเขตของ calculateTotalPriceProduct ไปยังนอก useEffect
  const calculateTotalPriceProduct = (item) => {
    return item.attributes.price * (item.quantity || 1);
  };

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCartItems);
    const userDataFromLocalStorage = userData(); // get user data from local storage
    setUser(userDataFromLocalStorage);

    // เมื่อมีการเปลี่ยนแปลงใน cartItems ให้อัปเดต total อีกครั้ง
    const totalPrice = storedCartItems.reduce((acc, item) => acc + item.attributes.price, 0);
    setTotal(totalPrice);
  }, []);

  const uniqueItems = cartItems.reduce((acc, item) => {
    if (!acc[item.id]) {
      acc[item.id] = { ...item, quantity: 1 };
    } else {
      acc[item.id].quantity++;
    }
    return acc;
  }, {});

  const uniqueCartItems = Object.values(uniqueItems);

  const removeFromCart = (itemId) => {
    Swal.fire({
      title: 'ยืนยันการลบ?',
      text: 'คุณแน่ใจหรือไม่ที่ต้องการลบสินค้านี้ออกจากตะกร้า?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่, ลบ!',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCart = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        Swal.fire(
          'ลบสำเร็จ!',
          'สินค้าถูกลบออกจากตะกร้าแล้ว',
          'success'
        );
      }
    });
  };

  const handleOrder = () => {
    // ตรวจสอบข้อมูลที่อยู่ว่าถูกกรอกหรือไม่
    const name = document.getElementsByName('name')[0].value;
    const address = document.getElementsByName('address')[0].value;
    const post = document.getElementsByName('post')[0].value;
    const number = document.getElementsByName('number')[0].value;

    if (!name || !address || !post || !number) {
      Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกข้อมูลที่อยู่ให้ครบถ้วน',
        text: 'โปรดกรอกข้อมูลที่อยู่ให้ครบถ้วน',
      });
      return;
    }

    if (number.length !== 10 || isNaN(number)) {
      Swal.fire({
        icon: 'error',
        title: 'เบอร์โทรศัพท์ไม่ถูกต้อง',
        text: 'โปรดป้อนเบอร์โทรศัพท์ที่ถูกต้อง (10 หลัก)',
      });
      return;
    }
  
    if (post.length !== 5 || isNaN(post)) {
      Swal.fire({
        icon: 'error',
        title: 'เลขไปรษณีย์ไม่ถูกต้อง',
        text: 'โปรดป้อนเลขไปรษณีย์ที่ถูกต้อง (5 หลัก)',
      });
      return;
    }

    if (!user) {
      navigate("/login");
      Swal.fire({
        title: 'โปรดเข้าสู่ระบบก่อน',
        icon: 'error',
        text: 'คุณไม่ได้รับอนุญาต',
      });
      return;
    }

    if (uniqueCartItems.length === 0) {
      navigate("/productall");
      Swal.fire({
        icon: 'warning',
        title: 'กรุณาเพิ่มสินค้า!',
        text: 'ไม่มีสินค้าในตะกร้า โปรดเพิ่มสินค้าก่อนที่จะสั่งซื้อ',
      });
    } else {
      // รายละเอียดการสั่งซื้อ
      const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
      const total = storedCartItems.reduce((acc, item) => acc + item.attributes.price, 0);
      const productList = storedCartItems.map(item => item.attributes.title).join(" , ");
      let bill = 'NOVA';
      for (let i = 0; i < 6; i++) {
        bill += Math.floor(Math.random() * 10); // เลขบิลขึ้นต้นด้วย NOVA+เลข 0-9
      }
      const currentDate = new Date();
      const orderDateTime = currentDate.toLocaleString();
  
      // ตรวจสอบว่ามีการล็อคอินหรือไม่
      if (!user.jwt) {
        Swal.fire({
          title: 'โปรดเข้าสู่ระบบก่อน',
          icon: 'error',
          text: 'ต้องเข้าสู่ระบบก่อนถึงจะสามารถสั่งซื้อได้',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/login');
          }
        });
        return;
      }
  
      // ส่งคำสั่งซื้อไปยังเซิร์ฟเวอร์
      fetch(`${conf.apiPrefix}/api/oders`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.jwt}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            bill: bill,
            total: total,
            products: productList,
            username: user.username,
            orderDateTime: orderDateTime,
            name: name,
            address: address,
            post: post,
            number: number,
          }
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Order successfully placed:', data);
          localStorage.removeItem('cart');
          setCartItems([]);
          setTotal(0);
          Swal.fire({
            icon: 'success',
            title: 'สั่งซื้อสินค้าสำเร็จ!',
            text: `บิลเลขที่: ${bill}`,
            confirmButtonText: 'ไปที่ประวัติสั่งซื้อ',
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/orderhistory');
            }
            window.location.reload(); 
          });
        })
        .catch(error => {
          console.error('Error placing order:', error);
          Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'ไม่สามารถสั่งซื้อสินค้าได้ในขณะนี้ โปรดลองอีกครั้งในภายหลัง',
          });
        });
    }
  };

  return (
    <div>
      <NovaNavbar />
      <div className="cart-container">
        <h2>ตะกร้าสินค้า</h2>
        <table className="cart-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ชื่อสินค้า</th>
              <th scope="col">ราคา</th>
              <th scope="col">ยอดรวม</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {uniqueCartItems.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.attributes.title}</td>
                <td>{item.attributes.price} x {item.quantity || 1}</td>
                <td>{calculateTotalPriceProduct(item)}</td>
                <td><button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>ลบ</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className='text-total'>ยอดรวมทั้งหมด: {total} บาท</p>
        <Button type="button" className="btn btn-primary" onClick={handleShowAddressModal}>
          กดสั่งซื้อ
        </Button>
      </div>
      <Modal show={showAddressModal} onHide={handleCloseAddressModal}>
        <Modal.Header closeButton>
          <Modal.Title>กรอกที่อยู่</Modal.Title>
        </Modal.Header>
        <Modal.Body>        
          <div className="form-group">
            <label>ชื่อ-สกุล</label>
            <input
              type="text"
              name="name"
              placeholder="กรอกชื่อ-สกุล"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>ที่อยู่</label>
            <textarea
              type="text"
              name="address"
              placeholder="กรอกที่อยู่"
              className="form-input"
            ></textarea>
          </div>
          <div className="form-group">
            <label>เลขไปรษณีย์</label>
            <input
              type="number"
              name="post"
              placeholder="เลขไปรษณีย์"
              max={10000}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>เบอร์โทร</label>
            <input
              type="number"
              name="number"
              placeholder="กรอกเบอร์โทร"
              max={1000000000}
              className="form-input"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
        <Button className="btn btn-danger" onClick={handleOrder}>
          ยืนยันการสั่งซื้อสินค้า
        </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cart;
