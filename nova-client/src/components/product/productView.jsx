import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProductView } from '../../hooks/useProductView';
import { useDispatch } from 'react-redux';
import { addToCart } from '../cart/cartActions';
import Navbar from '../novaNavbar';
import conf from "../../conf";
import './ProductView.css';
import Loading from '../Loading';
import Footer from '../Footer';

function ProductView() {
  const { id } = useParams(); 
  const { product } = useProductView(id);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // State เก็บจำนวนสินค้าที่จะเพิ่ม
  const dispatch = useDispatch(); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (!product) {
    return <div><Loading /></div>;
  }

  const productImage = product.attributes.image.data[0].attributes.formats.medium.url;
  
  const handleAddToCart = () => {
    if (quantity <= product.attributes.quantity) {
      for (let i = 0; i < quantity; i++) {
        dispatch(addToCart(product));
      }
    } else {
      alert('ไม่สามารถเพิ่มสินค้าได้ เนื่องจากเกินจำนวนสินค้าที่มีในสต๊อก');
    }
  };

  const handleIncreaseQuantity = () => {
    if (quantity < product.attributes.quantity) {
      setQuantity(quantity + 1);
    } else {
      alert('ไม่สามารถเพิ่มจำนวนสินค้าได้ เนื่องจากเกินจำนวนสินค้าที่มีในสต๊อก');
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="product-details">
              <div className="product-image">
                <img src={productImage} alt={product.attributes.title} className="img-fluid rounded" />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="product-info">
              <h2>{product.attributes.title}</h2>
              <p>{product.attributes.description}</p>
              <p>สินค้าในสต๊อก : {product.attributes.quantity}</p>
              <p>ราคา: ฿{product.attributes.price}</p>
              <div className="quantity-control">
                <button className="btn btn-secondary" onClick={handleDecreaseQuantity}>-</button>
                <input type="number" value={quantity} readOnly />
                <button className="btn btn-secondary" onClick={handleIncreaseQuantity}>+</button>
              </div>
              <button className="btn btn-primary" onClick={handleAddToCart}>เพิ่มลงตะกร้า</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductView;
