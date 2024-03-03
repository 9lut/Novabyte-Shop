import React, { useState, useEffect } from 'react'; 
import './Banner.css'; // import CSS file

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 2 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? 2 : prevSlide - 1));
  };

  return (
    <div className="bd-example">
      <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators" style={{display: 'none'}}> 
          <li data-target="#carouselExampleCaptions" data-slide-to="0" className={currentSlide === 0 ? "active" : ""}></li>
          <li data-target="#carouselExampleCaptions" data-slide-to="1" className={currentSlide === 1 ? "active" : ""}></li>
          <li data-target="#carouselExampleCaptions" data-slide-to="2" className={currentSlide === 2 ? "active" : ""}></li>
        </ol>
        <div className="carousel-inner">
          <div className={`carousel-item ${currentSlide === 0 ? "active" : ""}`}>
            <img src={require("../image/banner/1.png")} className="d-block banner-image" alt=""/>
            <div className="carousel-caption d-none d-md-block">
            </div>
          </div>
          <div className={`carousel-item ${currentSlide === 1 ? "active" : ""}`}>
            <img src={require("../image/banner/2.png")} className="d-block banner-image" alt=""/>
            <div className="carousel-caption d-none d-md-block">
            </div>
          </div>
          <div className={`carousel-item ${currentSlide === 2 ? "active" : ""}`}>
            <img src={require("../image/banner/3.png")} className="d-block banner-image" alt=""/>
            <div className="carousel-caption d-none d-md-block">
            </div>
          </div>
        </div>
        <a className="carousel-control-prev" role="button" data-slide="prev" onClick={prevSlide}>
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only"></span>
        </a>
        <a className="carousel-control-next" role="button" data-slide="next" onClick={nextSlide}>
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only"></span>
        </a>
      </div>
    </div>
  );
};

export default Banner;
