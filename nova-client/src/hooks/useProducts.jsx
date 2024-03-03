import { useState, useEffect } from "react";
import axios from "axios";
import conf from "../conf";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const {
        data: { data },
      } = await axios.get(`${conf.apiPrefix}/api/categories`);
      setCategories(data);
    } catch (error) {
      console.log({ error });
    }
  };

  const fetchProducts = async () => {
    try {
      const {
        data: { data },
      } = await axios.get(`${conf.apiPrefix}/api/products?populate=*`);
      setProducts(data);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return { categories, products};
};
