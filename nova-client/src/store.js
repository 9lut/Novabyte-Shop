// store.js
import { createStore } from 'redux';
import rootReducer from './components/cart/cartReducer'; // import rootReducer ของแอพพลิเคชัน

const store = createStore(rootReducer); // สร้าง store ด้วย rootReducer

export default store;
