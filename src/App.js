import './App.scss'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import AuthRoute from '@/components/AuthRoute';
import GeekLayout from '@/pages/Layout';
import Login from '@/pages/Login'
import Home from './pages/Home';
import Article from './pages/Article';
import Publish from './pages/Publish';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* 包裹需要鉴权的路由 */}
          <Route path='/' element={<AuthRoute><GeekLayout /></AuthRoute>}>
            {/* GeekLayout 下的二级路由 */}
            <Route index element={<Home />}></Route>
            <Route path='article' element={<Article />}></Route>
            <Route path='publish' element={<Publish />}></Route>
          </Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
