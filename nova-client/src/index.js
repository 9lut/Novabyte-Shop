import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // import Provider
import store from './store'; // import store ของ Redux
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* ให้ Provider ครอบแอพพลิเคชัน */}
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
