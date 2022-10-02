import React from 'react';
import ReactDOM from 'react-dom/client';
// 先引入antd样式(修复bug，引入antd/dist/antd.min.css)
// 官方：import 'antd/dist/antd.css'
import 'antd/dist/antd.min.css'
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
