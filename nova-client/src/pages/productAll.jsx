import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import Product from '../components/product/cardProduct';
import Navbar from '../components/novaNavbar';
import './ProductAll.css';
import Footer from '../components/Footer';

const ProductAll = () => {
  const { categories, products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProductsByCategory = selectedCategory
    ? products.filter(product => product.attributes.category.data.id === selectedCategory)
    : products;

  const filteredProductsBySearch = searchQuery
    ? products.filter(product => product.attributes.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : filteredProductsByCategory;

  const renderProductsForCategory = (categoryId) => {
    const productsForCategory = products.filter(product => product.attributes.category.data.id === categoryId);
    return productsForCategory.map(product => <Product key={product.id} product={product} />);
  };

  return (
    <div>
      <Navbar />
      <div className="productall-container">
        <div className="categoryall-sidebar">
          <div className="product-search">
            <input
              type="text"
              placeholder="ค้นหาสินค้า..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <h2 className='categoryall-text'>ประเภทสินค้า</h2>
          <ul className="list-group">
            <li key="show-all"
              className={`list-group-item ${!selectedCategory ? 'active' : ''}`}
              onClick={() => setSelectedCategory(null)}>
              ทั้งหมด
            </li>
            {categories.map(category => (
              <li key={category.id}
                className={`list-group-item ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}>
                {category.attributes.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="productall-list">
          {selectedCategory === null && filteredProductsBySearch.length > 0 && (
            <div className="category">
              <h2 className="category-title">ทั้งหมด</h2>
              <div className="products-container">
                {filteredProductsBySearch.map(product => (
                  <Product key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}

          {selectedCategory !== null && filteredProductsBySearch.length > 0 && (
            <div className="category">
              <h2 className="category-title">{categories.find(category => category.id === selectedCategory).attributes.title}</h2>
              <div className="products-container">
                {renderProductsForCategory(selectedCategory)}
              </div>
            </div>
          )}

          {filteredProductsBySearch.length === 0 && (
            <p class="centered-text">ไม่มีสินค้า</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductAll;
