import './App.scss'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

// 路由懒加载必要api和组件
import { lazy, Suspense } from 'react'
// 按需导入路由
const AuthRoute=lazy(()=>import('./components/AuthRoute'))
const GeekLayout = lazy(() => import('./pages/Layout'))
const Login = lazy(() => import('./pages/Login'))
const Home = lazy(() => import('./pages/Home'))
const Article = lazy(() => import('./pages/Article'))
const Publish = lazy(() => import('./pages/Publish'))

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Suspense
          fallback={
            <div
              style={{
                textAlign: 'center',
                marginTop: 200
              }}
            >
              loading...
            </div>
          }
        >
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
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
