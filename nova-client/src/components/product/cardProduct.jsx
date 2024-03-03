import React from 'react';
import { Link } from 'react-router-dom';
import conf from "../../conf";
import './cardProduct.css';

function Product({ product }) {
    const productImage = `${conf.apiPrefix}${product.attributes.image.data[0].attributes.formats.medium.url}`;

    return (
        <div className="container">
            <div className="card-container">
                <div className="card">
                    <Link to={`/product-detail/${product.id}`}>
                        <img src={productImage} alt="Product" />
                    </Link>
                    <div className="card-body">
                        <p className="card-title">{product.attributes.title}</p>
                        <p className="card-text">฿{product.attributes.price}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
