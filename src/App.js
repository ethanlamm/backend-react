import './App.scss'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import AuthRoute from '@/components/AuthRoute';
import GeekLayout from '@/pages/Layout';
import Login from '@/pages/Login'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* 包裹需要鉴权的路由 */}
          <Route path='/' element={<AuthRoute><GeekLayout /></AuthRoute>}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
