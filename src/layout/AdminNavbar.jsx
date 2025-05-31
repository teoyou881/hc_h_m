import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FaBoxes, FaUsers, FaShoppingCart, FaChartBar, FaCog } from 'react-icons/fa'; // 아이콘 추가

function AdminNavbar({ onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/hc_h_m/login');
  };

  return (
      <Navbar bg="dark" variant="dark" expand="lg" className="admin-navbar">
        <Container fluid>
          <Navbar.Brand as={Link} to="/hc_h_m/admin">Admin Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* 주요 기능 단위 메뉴 */}
              <Nav.Link as={Link} to="/hc_h_m/admin/products">
                <FaBoxes className="me-1" /> 상품 관리
              </Nav.Link>
              <Nav.Link as={Link} to="/hc_h_m/admin/users">
                <FaUsers className="me-1" /> 회원 관리
              </Nav.Link>
              <Nav.Link as={Link} to="/hc_h_m/admin/orders">
                <FaShoppingCart className="me-1" /> 주문 관리
              </Nav.Link>
              <Nav.Link as={Link} to="/hc_h_m/admin/statistics">
                <FaChartBar className="me-1" /> 통계
              </Nav.Link>
              <Nav.Link as={Link} to="/hc_h_m/admin/settings">
                <FaCog className="me-1" /> 설정
              </Nav.Link>
            </Nav>
            <Nav>
              <Button variant="outline-light" onClick={handleLogoutClick}>
                로그아웃 (Admin)
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}

export default AdminNavbar;