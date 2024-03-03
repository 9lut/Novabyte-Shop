import React, { useState, useMemo } from 'react';
import { useProducts } from '../hooks/useProducts';
import Navbar from '../components/novaNavbar';
import Product from '../components/product/cardProduct';
import Banner from '../image/banner';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
  const { categories, products } = useProducts();
  const [newProductsPage, setNewProductsPage] = useState(1);
  const productsPerPage = 5; 
  const [categoryPages] = useState({});
  const newProducts = useMemo(() => products.filter(product => product.attributes.isNew), [products]);

  const renderNewProducts = useMemo(() => {
    const startIndex = (newProductsPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return newProducts.slice(startIndex, endIndex).map((product) => (
      <Product key={product.id} product={product} />
    ));
  }, [newProductsPage, newProducts]);

  const handleNextNewProductsPage = () => setNewProductsPage(prevPage => prevPage + 1);
  const handlePrevNewProductsPage = () => setNewProductsPage(prevPage => prevPage - 1);

  const renderProductsForCategory = (categoryId) => {
    const categoryProducts = products.filter(product => product.attributes.category.data.id === categoryId);
    const currentPage = categoryPages[categoryId] || 1;
    const startIndex = (currentPage - 1) * 4; 
    const endIndex = startIndex + 4;
    return categoryProducts.slice(startIndex, endIndex).map((product) => (
      <Product key={product.id} product={product} />
    ));
  };

  return (
    <div>
      <Navbar />
      <div className='Banner-home'>
        <Banner />
      </div>
      <div className="container">
        <div className="home">
          <h3 className='title'>NovaByte ร้านขายอุปกรณ์คอมพิวเตอร์ที่ดีที่สุด</h3>
          <div className="category">
            <h2 className="category-title">สินค้าใหม่ <hr width="100%" color='gray'/> </h2>
            <div className="product-container">
              {renderNewProducts}
            </div>
            {newProducts.length > productsPerPage && (
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end">
                  <li className={`page-item ${newProductsPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={handlePrevNewProductsPage} disabled={newProductsPage === 1}>Previous</button>
                  </li>
                  <li className="page-item">
                    <button className="page-link" onClick={handleNextNewProductsPage}>Next</button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
          {categories.filter(category => category.attributes.Show).map(category => (
            <div key={category.id} className="category">
              <h2 className="category-title">{category.attributes.title} <hr width="100%" color='gray'/> </h2>
              <div className="products-container">
                {renderProductsForCategory(category.id)}
              </div>
            </div> 
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
