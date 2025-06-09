// src/layout/AdminLayout.jsx (새로 생성)
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import './AdminLayout.css'; // 사이드바 스타일링을 위한 CSS 파일

function AdminLayout() {
  const location = useLocation();

  return (
      <Container fluid className="admin-layout">
        <Row>
          {/* 사이드바 */}
          <Col xs={2} id="sidebar-wrapper" className="bg-light border-end">
            <Nav className="flex-column p-3">
              {/* 상품 관리 하위 메뉴 */}
              <Nav.Item>
                <Nav.Link as={Link} to="/hc_h_m/admin/products" active={location.pathname.startsWith('/hc_h_m/admin/products')}>
                  상품 목록
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/hc_h_m/admin/products/new" active={location.pathname === '/hc_h_m/admin/products/new'}>
                  상품 등록
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/hc_h_m/admin/categories" active={location.pathname.startsWith('/hc_h_m/admin/categories')}>
                  카테고리 관리
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/hc_h_m/admin/options/types" active={location.pathname.startsWith('/hc_h_m/admin/options/types')}>
                  옵션 관리
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/hc_h_m/admin/options/values" active={location.pathname.startsWith('/hc_h_m/admin/options/values')}>
                  값 관리
                </Nav.Link>
              </Nav.Item>

              {/* 회원 관리 하위 메뉴 (예시) */}
              <hr />
              <Nav.Item>
                <Nav.Link as={Link} to="/hc_h_m/admin/users" active={location.pathname===('/hc_h_m/admin/users')}>
                  전체 회원
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/hc_h_m/admin/users/roles" active={location.pathname.startsWith('/hc_h_m/admin/users/roles')}>
                  권한 설정
                </Nav.Link>
              </Nav.Item>
              {/* ... 기타 하위 메뉴 */}
            </Nav>
          </Col>

          {/* 메인 콘텐츠 영역 */}
          <Col xs={10} id="page-content-wrapper">
            <Outlet /> {/* 중첩된 라우트의 컴포넌트가 여기에 렌더링됩니다. */}
          </Col>
        </Row>
      </Container>
  );
}

export default AdminLayout;