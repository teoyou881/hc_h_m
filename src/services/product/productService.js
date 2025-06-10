import axios from 'axios';

const VITE_PRODUCT_URL = import.meta.env.VITE_USER_URL + '/product';
const productService = {

  getProducts:async () => {
    const response = await axios.get(`${VITE_PRODUCT_URL}`);
    return response.data;
  },

}

export default productService;