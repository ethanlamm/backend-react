import React from 'react';
import ReactDOM from 'react-dom/client';
// 先引入antd样式
import 'antd/dist/antd.css'
// 后引入公共样式，防止样式覆盖
import './index.scss';
// 根组件
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
