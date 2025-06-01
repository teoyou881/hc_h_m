// src/pages/admin/categories/AdminCategoryPage.jsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Alert } from 'react-bootstrap';
import categoryService from '../../../services/categoryService'; // 경로 확인

function AdminCategoryPage() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({ id: null, name: '', description: '', displayOrder: 0 });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setError(null);
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      setError('카테고리 목록을 불러오는데 실패했습니다.');
      if (err.response && err.response.status === 403) {
        setError('접근 권한이 없습니다. 관리자만 접근할 수 있습니다.');
      }
    }
  };

  const handleShowCreateModal = () => {
    setIsEditing(false);
    setCurrentCategory({ id: null, name: '', description: '', displayOrder: 0 });
    setError(null);
    setShowModal(true);
  };

  const handleShowEditModal = (category) => {
    setIsEditing(true);
    setCurrentCategory({ ...category });
    setError(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setError(null);
    setSuccessMessage(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentCategory((prev) => ({
      ...prev,
      [name]: name === 'displayOrder' ? parseInt(value) || 0 : value, // 숫자로 변환
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      if (isEditing) {
        await categoryService.updateCategory(currentCategory.id, currentCategory);
        setSuccessMessage('카테고리가 성공적으로 수정되었습니다.');
      } else {
        await categoryService.createCategory(currentCategory);
        setSuccessMessage('카테고리가 성공적으로 추가되었습니다.');
      }
      fetchCategories(); // 목록 새로고침
      handleCloseModal(); // 모달 닫기
    } catch (err) {
      console.error('Failed to save category:', err);
      let errorMessage = '카테고리 저장에 실패했습니다.';
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message; // 백엔드에서 전달된 에러 메시지
      } else if (err.response && err.response.status === 409) { // HTTP 409 Conflict (중복)
        errorMessage = "이미 같은 이름의 카테고리가 존재합니다.";
      }
      setError(errorMessage);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('정말로 이 카테고리를 삭제하시겠습니까? 관련 상품이 있을 경우 문제가 발생할 수 있습니다.')) {
      try {
        setError(null);
        setSuccessMessage(null);
        await categoryService.deleteCategory(id);
        setSuccessMessage('카테고리가 성공적으로 삭제되었습니다.');
        fetchCategories(); // 목록 새로고침
      } catch (err) {
        console.error('Failed to delete category:', err);
        let errorMessage = '카테고리 삭제에 실패했습니다.';
        if (err.response && err.response.data && err.response.data.message) {
          errorMessage = err.response.data.message;
        } else if (err.response && err.response.status === 400) {
          errorMessage = "이 카테고리를 사용하는 상품이 존재하여 삭제할 수 없습니다."; // 백엔드에서 특정 로직으로 처리 시
        }
        setError(errorMessage);
      }
    }
  };

  return (
      <div className="container mt-4">
        <h1>카테고리 관리</h1>
        <Button variant="primary" onClick={handleShowCreateModal} className="mb-3">
          새 카테고리 추가
        </Button>

        {error && <Alert variant="danger">{error}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}

        <Table striped bordered hover>
          <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>정렬 순서</th>
            <th>생성일</th>
            <th>수정일</th>
            <th>액션</th>
          </tr>
          </thead>
          <tbody>
          {categories.length > 0 ? (
              categories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>{category.displayOrder}</td>
                    <td>{new Date(category.createdDate).toLocaleDateString()}</td>
                    <td>{new Date(category.lastModifiedDate).toLocaleDateString()}</td>
                    <td>
                      <Button
                          variant="info"
                          size="sm"
                          className="me-2"
                          onClick={() => handleShowEditModal(category)}
                      >
                        수정
                      </Button>
                      <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(category.id)}
                      >
                        삭제
                      </Button>
                    </td>
                  </tr>
              ))
          ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  카테고리가 없습니다.
                </td>
              </tr>
          )}
          </tbody>
        </Table>

        {/* 카테고리 추가/수정 모달 */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{isEditing ? '카테고리 수정' : '새 카테고리 추가'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>이름</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={currentCategory.name}
                    onChange={handleChange}
                    required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>상위 카테고리</Form.Label>
                <Form.Select
                    name="parentId"
                    value={currentCategory.parentId === null ? '' : currentCategory.parentId}
                    onChange={handleChange}
                >
                  <option value="">-- 최상위 카테고리 --</option>
                  {/* 현재 카테고리 자신은 부모로 선택할 수 없게 필터링 */}
                  {categories
                  .filter(cat => cat.id !== currentCategory.id)
                  .map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>정렬 순서</Form.Label>
                <Form.Control
                    type="number"
                    name="displayOrder"
                    value={currentCategory.displayOrder}
                    onChange={handleChange}
                    min="0"
                    disabled={!isEditing} // 생성 시에는 백엔드에서 자동 부여, 수정 시에만 수동 변경 가능하도록 (옵션)
                />
                <Form.Text className="text-muted">
                  생성 시 정렬 순서는 자동으로 부여됩니다. 수정 시에만 직접 변경할 수 있습니다.
                </Form.Text>
              </Form.Group>
              <Button variant="primary" type="submit">
                {isEditing ? '수정' : '추가'}
              </Button>
              <Button variant="secondary" onClick={handleCloseModal} className="ms-2">
                취소
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
  );
}

export default AdminCategoryPage;