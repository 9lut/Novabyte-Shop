import React, { useState, useEffect } from 'react';
import Navbar from '../../components/novaNavbar';
import conf from "../../conf";
import { userData } from '../../helpers';
import { Modal, Button } from 'react-bootstrap';
import { BsCopy } from "react-icons/bs";
import 'bootstrap/dist/css/bootstrap.min.css';

const OrderHistory = () => {
  const [payments, setPayments] = useState([]); 
  const [filteredPayments, setFilteredPayments] = useState([]); 
  const [username, setUsername] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    fetchPayments();
  }, [username]); 

  useEffect(() => {
    if (username) {
      const filteredData = payments.filter(payment => payment.attributes.username === username);
      setFilteredPayments(filteredData);
    } else {
      setFilteredPayments([]);
    }
  }, [username, payments]); 

  const fetchPayments = async () => {
    try {
      const userDataFromLocalStorage = userData();
      setUsername(userDataFromLocalStorage.username); 

      const response = await fetch(`${conf.apiPrefix}/api/oders?username=${userDataFromLocalStorage.username}`, {
        headers: {
          Authorization: `Bearer ${userDataFromLocalStorage.jwt}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPayments(data.data); 
      } else {
        console.error(`Failed to fetch payments. Status code: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const handleModalOpen = (payment) => {
    setSelectedPayment(payment);
    setModalShow(true);
  }

  const countProducts = (products) => {
    const productCount = products.reduce((acc, curr) => {
      const trimmedProduct = curr.trim(); // ตัดช่องว่างด้านหน้าและด้านหลังของสินค้าออก
      acc[trimmedProduct] = (acc[trimmedProduct] || 0) + 1;
      return acc;
    }, {});
  
    // สร้างอาร์เรย์ของสตริงที่แสดงชื่อสินค้าและจำนวน
    const productStrings = Object.entries(productCount).map(([product, count]) => `${product} x ${count}`);
  
    return productStrings;
  };
  
  
  return (
    <div>
      <Navbar />
      <div className="payment-history-page">
        <div className="payment-history-container">
            <h4 className='history-titile'>ประวัติการสั่งซื้อ</h4>
          <table className="table-container">
          <thead>
            <tr>
                <th>เลขบิล</th>
                <th>วันที่และเวลา</th>
                <th className="hide-on-small-screen">รายการสินค้า</th>
                <th className="hide-on-small-screen">ยอดทั้งหมด</th>
                <th className="hide-on-small-screen">สถานะ</th>
                <th>รายละเอียดเพิ่มเติม</th>
            </tr>
            </thead>
            <tbody>
            {filteredPayments.map((order, index) => (
                <tr key={index}>
                <td>
                {order.attributes.bill}
                <BsCopy
                    className="copy-button"
                    onClick={() => {
                    navigator.clipboard.writeText(order.attributes.bill);
                    alert("คัดลอกแล้ว " + order.attributes.bill);
                    }}>คัดลอก</BsCopy>
                </td>
                <td>{order.attributes.orderDateTime}</td>
                <td className="hide-on-small-screen">
                {countProducts(order.attributes.products.split("\n")).map((productString, index) => (
                  <div key={index}>{productString}</div>
                ))}
                </td>
                <td className="hide-on-small-screen">{order.attributes.total} บาท</td>
                <td className="hide-on-small-screen">{order.attributes.status}</td>
                <td>
                    <Button className="popup-button" onClick={() => handleModalOpen(order)}>ดูเพิ่มเติม</Button>
                </td>
                </tr>
            ))}
            </tbody>
          </table>
          {filteredPayments.length === 0 && <p style={{ textAlign: 'center' }}>ไม่มีประวัติการแจ้งโอน</p>}
        </div>
      </div>
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>ประวัติการสั่งซื้อ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPayment && (
            <div className="popup-content">
              <p><strong>เลขบิล :</strong> {selectedPayment.attributes.bill}</p>
              <p style={{ whiteSpace: 'pre-line' }}>
                <strong>รายการสินค้า :</strong><br/>
                {countProducts(selectedPayment.attributes.products.split("\n")).map((productString, index) => (
                  <div key={index}>{productString}</div>
                ))}
              </p>
              <p><strong>จำนวนเงิน :</strong> {selectedPayment.attributes.total}</p>
              <p><strong>วันที่และเวลา :</strong> {selectedPayment.attributes.orderDateTime}</p>
              <p><strong>สถานะ:</strong> {selectedPayment.attributes.status}</p>
              <p><strong>ชื่อผู้รับ :</strong> {selectedPayment.attributes.name}</p>
              <p><strong>ที่อยู่ :</strong> {selectedPayment.attributes.address}</p>
              <p><strong>รหัสไปรษณีย์ :</strong> {selectedPayment.attributes.post}</p>
              <p><strong>เบอร์โทร :</strong> {"0" + selectedPayment.attributes.number}</p>  
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            ปิด
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderHistory;
