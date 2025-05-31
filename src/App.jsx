import './App.css';
import UserNavbar from './layout/UserNavbar.jsx'; // 사용자용 UserNavbar
import AdminNavbar from './layout/AdminNavbar.jsx'; // 어드민용 UserNavbar

import {Route, Routes, useLocation} from 'react-router-dom';
import ProductAll from './page/user/ProductAll.jsx';
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

function App() {
  // auth는 로그인 여부, userRole은 사용자의 권한 (예: 'USER', 'ADMIN', null)
  const [auth, setAuth] = useState(false);
  const [userRole, setUserRole] = useState("ADMIN"); // 초기값은 null 또는 'GUEST'
  const location = useLocation(); // 현재 경로를 알기 위해 사용

  // 현재 경로가 어드민 페이지인지 확인하는 헬퍼 함수
  const isAdminPath = location.pathname.startsWith('/hc_h_m/admin');

  return (
      <>
        {/* userRole 상태에 따라 다른 UserNavbar 렌더링 */}
        {userRole === 'ADMIN' ? (
            <AdminNavbar  />
        ) : (
            <UserNavbar  />
        )}

        <Routes>
          <Route path="/hc_h_m/" element={<ProductAll/>}></Route>
          {/* Login 컴포넌트에 setUserRole 함수 전달 */}
          <Route path="/hc_h_m/login" element={<Login auth={auth} setAuth={setAuth}/>}></Route>
          <Route path="/hc_h_m/search" element={<Search/>}></Route>
          <Route path="/hc_h_m/product/:id" element={<ProductDetail/>}></Route>

          <Route  path="/hc_h_m/admin/*" element={<AdminLayout />}>
            <Route index element={<AdminHome />} /> {/* /hc_h_m/admin */}
            <Route path="products" element={<AdminProductListPage />} />
            <Route path="products/new" element={<AdminProductCreatePage />} />
            <Route path="products/edit/:id" element={<AdminProductEditPage />} />
            <Route path="categories" element={<AdminCategoryPage />} />
            <Route path="options/types" element={<AdminOptionTypeListJsx />} />
            <Route path="options/values" element={<AdminOptionValueList />} />
            <Route path="users" element={<AdminUserListPage />} />
            {/*<Route path="users/roles" element={<AdminUserRolePage />} />*/}
          </Route>
        </Routes>
      </>
  );
}

export default App;