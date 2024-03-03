import { ADD_TO_CART } from './cartActions';
import Swal from 'sweetalert2';

const initialState = {
  items: JSON.parse(localStorage.getItem('cart')) || [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const updatedItems = [...state.items, action.payload];
      localStorage.setItem('cart', JSON.stringify(updatedItems));
      Swal.fire({
        icon: 'success',
        title: 'เพิ่มสินค้าสำเร็จ',
        confirmButtonText: 'OK',
        allowOutsideClick: true
      }).then(() => {
        window.location.reload(); 
      });
      return {
        ...state,
        items: updatedItems,
      };
    default:
      return state;
  }
};

export default cartReducer;