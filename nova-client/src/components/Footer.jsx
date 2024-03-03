import React from 'react';

const Footer = () => {
  return (
    <footer className="text-center text-lg-start bg-body-tertiary text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        {/* Left */}
        <div className="me-5 d-none d-lg-block">
        </div>
        {/* Left */}
  
        {/* Right */}
        <div>
          <a href="/" className="me-4 text-reset">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="/" className="me-4 text-reset">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="/" className="me-4 text-reset">
            <i className="fab fa-google"></i>
          </a>
          <a href="/" className="me-4 text-reset">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="/" className="me-4 text-reset">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="/" className="me-4 text-reset">
            <i className="fab fa-github"></i>
          </a>
        </div>
        {/* Right */}
      </section>
      {/* Section: Social media */}
  
      {/* Section: Links  */}
      <section className="">
        <div className="container text-center text-md-start mt-5">
          {/* Grid row */}
          <div className="row mt-3">
            {/* Grid column */}
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              {/* Content */}
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3"></i>Novabyte Shop
              </h6>
              <p>
              เป็นเว็บไซต์ร้านค้าที่ให้บริการขายอุปกรณ์คอมพิวเตอร์ที่มีคุณภาพสูงและเป็นที่รู้จักของนักเล่นเกมทั่วโลก 
              ทุกสิ่งที่คุณต้องการสำหรับการเล่นเกม สามารถหาได้ที่นี่อย่างง่ายดาย
              </p>
            </div>
            {/* Grid column */}
  
            {/* Grid column */}
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              {/* Links */}
              <h6 className="text-uppercase fw-bold mb-4">
                เกี่ยวกับสินค้า
              </h6>
              <p>
                <a href="/productall" className="text-reset">สินค้าทั้งหมด</a>
              </p>
            </div>
            {/* Grid column */}
  
            {/* Grid column */}
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              {/* Links */}
              <h6 className="text-uppercase fw-bold mb-4">
                เกี่ยวกับเว็บไซต์
              </h6>
              <p>
                <a href="#" className="text-reset">การสั่งซื้อสินค้า</a>
              </p>
              <p>
                <a href="/payment" className="text-reset">การแจ้งโอนเงิน</a>
              </p>
            </div>
            {/* Grid column */}
            {/* Grid column */}
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              {/* Links */}
              <h6 className="text-uppercase fw-bold mb-4">ช่องทางการติดต่อ</h6>
              <p>
                <i className="fas fa-envelope me-3"></i>
                novabyte-shop@novabyte.com
              </p>
              <p><i className="fas fa-phone me-3"></i>06x-xxx-xxx</p>
            </div>
            {/* Grid column */}
          </div>
          {/* Grid row */}
        </div>
      </section>
      {/* Section: Links  */}
  
      {/* Copyright */}
      <div className="text-center p-4" style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
        ©2024 Copyright : 
        <a className="text-reset fw-bold" href="/">  Novabyte.com  </a>
      </div>
      {/* Copyright */}
    </footer>
  );
}

export default Footer;
