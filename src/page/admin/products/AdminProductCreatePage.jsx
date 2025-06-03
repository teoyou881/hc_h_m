// src/pages/AdminProductCreatePage.jsx

import React, { useState, useEffect, useRef } from 'react';
import {
  Container, Row, Col, Form, Button, Alert, Card,
  ListGroup, InputGroup, Dropdown
} from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import productService from '../../../services/productService.js'; // ⭐ 경로 확인
import { isEqualAsNumber } from '../../../util/util.js'; // ⭐ 경로 확인

const AdminProductCreatePage = () => {
  // 상품 기본 정보 상태
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  // ⭐ 이미지 관련 상태 제거 (productImages, productImagePreviews, selectedThumbnailIndex)

  // 카테고리 목록 상태
  const [categories, setCategories] = useState([]);

  // 백엔드에서 불러온 사용 가능한 옵션 그룹 목록
  const [availableOptionGroups, setAvailableOptionGroups] = useState([]);
  // 현재 상품에 추가된 옵션 그룹 및 그 하위 옵션 값들
  const [selectedOptionGroups, setSelectedOptionGroups] = useState([]);

  // 로딩 및 에러 상태
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // ⭐ fileInputRef 제거

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const categoriesData = await productService.getAllCategories();
        const optionGroupsData = await productService.getAllAvailableOptionGroups();

        setCategories(categoriesData);
        setAvailableOptionGroups(optionGroupsData);
      } catch (err) {
        console.error("Failed to fetch initial data:", err);
        setError("초기 데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ⭐ handleImageChange 함수 제거
  // ⭐ handleThumbnailSelect 함수 제거

  // 백엔드에서 불러온 옵션 그룹을 상품에 추가하는 핸들러 (Async로 변경)
  const handleAddSelectedOptionGroup = async (groupId) => {
    const groupToAdd = availableOptionGroups.find(group => isEqualAsNumber(group.id, groupId));

    if (groupToAdd && !selectedOptionGroups.some(g => isEqualAsNumber(g.id, groupId))) {
      setLoading(true);
      setError('');
      setSuccessMessage('');
      try {
        const fetchedOptionValues = await productService.getOptionValuesByGroupId(groupId);

        setSelectedOptionGroups(prev => {
          const newGroup = {
            id: groupToAdd.id,
            name: groupToAdd.name,
            displayOrder: groupToAdd.displayOrder,
            optionValues: fetchedOptionValues.map(val => ({
              id: val.id,
              name: val.name,
              extraPrice: val.extraPrice || 0,
              displayOrder: val.displayOrder || 0,
            })).sort((a, b) => a.displayOrder - b.displayOrder)
          };
          return [...prev, newGroup].sort((a, b) => a.displayOrder - b.displayOrder);
        });
        setSuccessMessage(`'${groupToAdd.name}' 옵션 그룹이 추가되었습니다.`);
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (err) {
        console.error(`Failed to fetch option values for group ${groupId}:`, err);
        setError(`'${groupToAdd.name}' 옵션 그룹의 값을 불러오지 못했습니다.`);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAddOptionValue = (groupId, valueName, extraPrice) => {
    if (!valueName.trim()) {
      setError("옵션 값 이름을 입력해주세요.");
      return;
    }

    setSelectedOptionGroups(prevGroups => prevGroups.map(group => {
      if (isEqualAsNumber(group.id, groupId)) {
        const newOptionValue = {
          id: uuidv4(),
          name: valueName.trim(),
          extraPrice: Number(extraPrice),
          displayOrder: group.optionValues.length + 1
        };
        return {
          ...group,
          optionValues: [...group.optionValues, newOptionValue]
          .sort((a, b) => a.displayOrder - b.displayOrder)
        };
      }
      return group;
    }));
    setSuccessMessage("옵션 값이 추가되었습니다.");
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleDeleteOptionGroup = (groupIdToDelete) => {
    if (window.confirm('이 옵션 그룹을 삭제하시겠습니까? 관련 옵션 값도 모두 삭제됩니다.')) {
      setSelectedOptionGroups(prevGroups => prevGroups.filter(group => !isEqualAsNumber(group.id, groupIdToDelete)));
      setSuccessMessage("옵션 그룹이 삭제되었습니다.");
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleDeleteOptionValue = (groupId, valueIdToDelete) => {
    if (window.confirm('이 옵션 값을 삭제하시겠까?')) {
      setSelectedOptionGroups(prevGroups => prevGroups.map(group =>
          isEqualAsNumber(group.id, groupId)
              ? { ...group, optionValues: group.optionValues.filter(value => value.id !== valueIdToDelete) }
              : group
      ));
      setSuccessMessage("옵션 값이 삭제되었습니다.");
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();

    if (!productName || !price || !selectedCategoryId) {
      setError("상품명, 가격, 카테고리는 필수 입력 항목입니다.");
      return;
    }

    // ⭐ 이미지 필드 삭제로 인해 이 유효성 검사도 필요 없습니다.
    // if (productImages.length === 0) {
    //   setError("상품 이미지를 최소 한 장 이상 등록해야 합니다.");
    //   return;
    // }

    setLoading(true);
    setError('');
    setSuccessMessage('');

    const productData = {
      name: productName,
      price: Number(price),
      description: description,
      categoryId: selectedCategoryId,
      optionGroups: selectedOptionGroups.map(group => ({
        id: group.id,
        name: group.name,
        optionValues: group.optionValues.map(value => ({
          ...(typeof value.id === 'number' ? { id: value.id } : {}),
          name: value.name,
          extraPrice: Number(value.extraPrice),
        }))
      }))
    };
    console.log("AdminProductCreatePage.jsx: productData", productData);

    try {
      const response = await productService.createProduct(productData);
      setSuccessMessage(response.message || "상품이 성공적으로 등록되었습니다!");
      // 폼 초기화
      setProductName('');
      setPrice('');
      setDescription('');
      setSelectedCategoryId('');
      setSelectedOptionGroups([]);
    } catch (err) {
      console.error("Failed to create product:", err);
      const errorMessage = err.response?.data?.message || err.message || "상품 등록 중 오류가 발생했습니다.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const selectedOptionGroupIds = new Set(selectedOptionGroups.map(g => g.id));
  const availableOptionGroupsForDropdown = availableOptionGroups.filter(
      group => !selectedOptionGroupIds.has(group.id)
  );

  return (
      <Container className="my-5">
        <h1 className="text-center mb-4">상품 등록</h1>

        {loading && <Alert variant="info" className="text-center">데이터를 불러오거나 처리 중입니다...</Alert>}
        {error && <Alert variant="danger" className="text-center">{error}</Alert>}
        {successMessage && <Alert variant="success" className="text-center">{successMessage}</Alert>}

        <Form onSubmit={handleSubmitProduct}>
          <Card className="mb-4">
            <Card.Header as="h2">기본 정보</Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="productName">상품명</Form.Label>
                <Form.Control
                    type="text"
                    id="productName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="price">가격</Form.Label>
                <InputGroup>
                  <Form.Control
                      type="number"
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                  />
                  <InputGroup.Text>원</InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="description">설명</Form.Label>
                <Form.Control
                    as="textarea"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="category">카테고리</Form.Label>
                <Form.Select
                    id="category"
                    value={selectedCategoryId}
                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                    required
                >
                  <option value="">카테고리 선택</option>
                  {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                  ))}
                </Form.Select>
              </Form.Group>
              {/* ⭐ 상품 이미지 업로드 관련 Form.Group 제거 */}
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header as="h2">상품 옵션 관리</Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>옵션 그룹 추가</Form.Label>
                <Dropdown onSelect={handleAddSelectedOptionGroup}>
                  <Dropdown.Toggle variant="outline-primary" id="dropdown-basic" disabled={availableOptionGroupsForDropdown.length === 0}>
                    {availableOptionGroupsForDropdown.length > 0 ? '옵션 그룹 선택' : '모든 옵션 그룹이 추가됨'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {availableOptionGroupsForDropdown.map(group => (
                        <Dropdown.Item key={group.id} eventKey={group.id}>
                          {group.name}
                        </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>

              {selectedOptionGroups.length > 0 && (
                  <div className="mt-4">
                    {selectedOptionGroups.map((group) => (
                        <Card key={group.id} className="mb-3">
                          <Card.Header className="d-flex justify-content-between align-items-center">
                            <h5>{group.name}</h5>
                            <Button
                                variant="warning"
                                size="sm"
                                onClick={() => handleDeleteOptionGroup(group.id)}
                            >
                              그룹 삭제
                            </Button>
                          </Card.Header>
                          <Card.Body>
                            <ListGroup variant="flush" className="mb-3">
                              {group.optionValues.length > 0 ? (
                                  group.optionValues.map((value) => (
                                      <ListGroup.Item key={value.id} className="d-flex justify-content-between align-items-center">
                                        {value.name} (추가 가격: {value.extraPrice.toLocaleString()}원)
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDeleteOptionValue(group.id, value.id)}
                                        >
                                          삭제
                                        </Button>
                                      </ListGroup.Item>
                                  ))
                              ) : (
                                  <ListGroup.Item className="text-muted">옵션 값이 없습니다.</ListGroup.Item>
                              )}
                            </ListGroup>
                            {/*todo 값 추가*/}
                            {/*<InputGroup>
                              <Form.Control
                                  type="text"
                                  placeholder="옵션 값 이름 (예: 빨강)"
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      e.preventDefault();
                                      const extraPriceInput = e.target.nextElementSibling?.nextElementSibling;
                                      const priceValue = extraPriceInput ? extraPriceInput.value : '';
                                      handleAddOptionValue(group.id, e.target.value, priceValue);
                                      e.target.value = '';
                                      if (extraPriceInput) extraPriceInput.value = '0';
                                    }
                                  }}
                              />
                              <InputGroup.Text>추가 가격:</InputGroup.Text>
                              <Form.Control
                                  type="number"
                                  placeholder="0"
                                  defaultValue={0}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      e.preventDefault();
                                      const valueNameInput = e.target.previousElementSibling?.previousElementSibling;
                                      const nameValue = valueNameInput ? valueNameInput.value : '';
                                      handleAddOptionValue(group.id, nameValue, e.target.value);
                                      e.target.value = '0';
                                      if (valueNameInput) valueNameInput.value = '';
                                    }
                                  }}
                              />

                              <Button
                                  variant="outline-secondary"
                                  onClick={(e) => {
                                    const inputs = e.currentTarget.parentNode.querySelectorAll('input[type="text"], input[type="number"]');
                                    const valueName = inputs[0].value;
                                    const extraPrice = inputs[1].value;
                                    handleAddOptionValue(group.id, valueName, extraPrice);
                                    inputs[0].value = '';
                                    inputs[1].value = '0';
                                  }}
                              >
                                값 추가
                              </Button>
                            </InputGroup>*/}
                          </Card.Body>
                        </Card>
                    ))}
                  </div>
              )}
            </Card.Body>
          </Card>

          <Button variant="success" type="submit" disabled={loading} className="w-100 mt-4 py-3">
            {loading ? '상품 등록 중...' : '상품 등록'}
          </Button>
        </Form>
      </Container>
  );
};

export default AdminProductCreatePage;