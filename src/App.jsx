import './App.css';
import UserNavbar from './layout/UserNavbar.jsx'; // 사용자용 UserNavbar
import AdminNavbar from './layout/AdminNavbar.jsx'; // 어드민용 UserNavbar

import {Route, Routes, useLocation} from 'react-router-dom';
import HomePage from './page/user/HomePage.jsx';
import Login from './page/auth/Login.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from 'react'; // useEffect 추가
import PrivateRoute from './route/PrivateRoute.jsx';
import Search from './page/user/Search.jsx';
import ProductDetail from './page/user/ProductDetail.jsx';
import AdminHome from './page/admin/AdminHome.jsx';
import AdminProductListPage from './page/admin/products/AdminProductListPage.jsx';
import AdminProductCreatePage from './page/admin/products/AdminProductCreatePage.jsx';
import AdminLayout from './layout/AdminLayout.jsx';
import AdminProductEditPage
  from './page/admin/products/AdminProductEditPage.jsx';
import AdminCategoryPage from './page/admin/categories/AdminCategoryPage.jsx';
import AdminOptionTypeListJsx
  from './page/admin/options/AdminOptionTypeList.jsx.jsx';
import AdminUserListPage from './page/admin/users/AdminUserListPage.jsx';
import AdminOptionValueList
  from './page/admin/options/AdminOptionValueList.jsx';
import AdminOptionTypeList
  from './page/admin/options/AdminOptionTypeList.jsx.jsx';
import AdminSkuListPage from './page/admin/products/AdminSkuListPage.jsx';
import AdminSkuPage from './page/admin/AdminSkuPage.jsx';
import RegisterForm from './page/auth/RegisterForm.jsx';
import UserLayout from './layout/UserLayout.jsx';

function App() {
  // auth는 로그인 여부, userRole은 사용자의 권한 (예: 'USER', 'ADMIN', null)
  const [auth, setAuth] = useState(false);
  const [userRole, setUserRole] = useState("USER"); // 초기값은 null 또는 'GUEST'
  const location = useLocation(); // 현재 경로를 알기 위해 사용

  // 현재 경로가 어드민 페이지인지 확인하는 헬퍼 함수
  const isAdminPath = location.pathname.startsWith('/hc_h_m/admin');

  return (
      <>
        <Routes>
          <Route path="/*" element={<UserLayout />}> {/* 이제 /hc_h_m/ */}
            <Route index element={<HomePage />}></Route> {/* 이제 /hc_h_m/ */}
            <Route path="login" element={<Login auth={auth} setAuth={setAuth} />}></Route> {/* 이제 /hc_h_m/login */}
            <Route path="register" element={<RegisterForm />}></Route> {/* 이제 /hc_h_m/register */}
            <Route path="search" element={<Search />}></Route> {/* 이제 /hc_h_m/search */}
            <Route path="product/:productId" element={<ProductDetail />}></Route> {/* 이제 /hc_h_m/product/:productId */}
          </Route>

          <Route path="/admin/*" element={<AdminLayout />}> {/* 이제 /hc_h_m/admin/* */}
            <Route index element={<AdminHome />} /> {/* /hc_h_m/admin */}
            <Route path="products" element={<AdminProductListPage />} /> {/* /hc_h_m/admin/products */}
            <Route path="products/:productId/sku" element={<AdminSkuListPage />} />
            <Route path="products/new" element={<AdminProductCreatePage />} />
            <Route path="sku/:skuId" element={<AdminSkuPage />} />
            <Route path="products/edit/:id" element={<AdminProductEditPage />} />
            <Route path="categories" element={<AdminCategoryPage />} />
            <Route path="options/types" element={<AdminOptionTypeList />} />
            <Route path="options/values" element={<AdminOptionValueList />} />
            <Route path="users" element={<AdminUserListPage />} />
          </Route>
        </Routes>
      </>
  );
}

export default App;