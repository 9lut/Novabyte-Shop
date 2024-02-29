import React, { useState, useEffect } from 'react';
import Navbar from '../../components/novaNavbar';
import conf from "../../conf";
import { userData } from '../../helpers';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//import "./PaymentHistory.css"; 

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
                <th>รายการสินค้า</th>
                <th className="hide-on-small-screen">ยอดทั้งหมด</th>
                <th className="hide-on-small-screen">สถานะ</th>
                <th>รายละเอียดเพิ่มเติม</th>
            </tr>
            </thead>
            <tbody>
            {filteredPayments.map((oder, index) => (
                <tr key={index}>
                <td>{oder.attributes.bill}</td>
                <td>{oder.attributes.orderDateTime}</td>
                <td>{oder.attributes.products}</td>
                <td className="hide-on-small-screen">{oder.attributes.total} บาท</td>
                <td className="hide-on-small-screen">{oder.attributes.status}</td>
                <td>
                    <Button className="popup-button" onClick={() => handleModalOpen(oder)}>ดูเพิ่มเติม</Button>
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
          <Modal.Title>รายละเอียดการแจ้งโอน</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPayment && (
            <div className="popup-content">
              <p><strong>เลขบิล :</strong> {selectedPayment.attributes.Title}</p>
              <p><strong>จำนวนเงิน :</strong> {selectedPayment.attributes.amount}</p>
              <p><strong>ธนาคาร :</strong> {selectedPayment.attributes.bank}</p>
              <p><strong>วันที่และเวลา :</strong> {selectedPayment.attributes.Date}</p>
              <p><strong>สถานะ:</strong> {selectedPayment.attributes.status}</p>
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
