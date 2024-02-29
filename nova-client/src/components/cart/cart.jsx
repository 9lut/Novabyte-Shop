import React, { useEffect, useState } from 'react';
import NovaNavbar from '../novaNavbar';
import conf from "../../conf";
import Swal from 'sweetalert2';
import { userData } from '../../helpers';
import './Cart.css';

const Cart = () => {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [bill, setBill] = useState([]);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState("");
  const [orderDateTime, setorderDateTime] = useState("");

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
    if (uniqueCartItems.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณาเพิ่มสินค้า!',
        text: 'ไม่มีสินค้าในตะกร้า โปรดเพิ่มสินค้าก่อนที่จะสั่งซื้อ',
      });
    } else {
      const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
      const total = storedCartItems.reduce((acc, item) => acc + item.attributes.price, 0);
      const productList = storedCartItems.map(item => item.attributes.title).join(" , ");
      let bill = 'NOVA';
      for (let i = 0; i < 6; i++) {
        bill += Math.floor(Math.random() * 10); // เลขบิลขึ้นต้นด้วย NOVA+เลข 0-9
      }
      const currentDate = new Date();
      const orderDateTime = currentDate.toLocaleString();

      fetch(`${conf.apiPrefix}/api/oders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            bill: bill,
            total: total,
            products: productList,
            username: user.username,
            orderDateTime: orderDateTime,
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
        <button className="btn btn-danger" onClick={handleOrder}>สั่งซื้อสินค้า</button>
        <p className='text-total'>ยอดรวมทั้งหมด: {total} บาท</p>
      </div>
    </div>
  );
};

export default Cart;

