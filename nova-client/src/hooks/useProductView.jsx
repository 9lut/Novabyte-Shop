import { useState, useEffect } from "react";
import axios from "axios";
import conf from "../conf";

export const useProductView = (id) => {
  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {
    try {
      const {
        data: { data },
      } = await axios.get(`${conf.apiPrefix}/api/products/${id}?populate=*`);
      setProduct(data);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return { product };
};
