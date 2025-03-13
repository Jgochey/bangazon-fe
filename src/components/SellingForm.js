import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import Link from 'next/link';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useRouter } from 'next/router';
import { Dropdown } from 'react-bootstrap';
import { getCategories, postProduct, updateProduct } from '../api/callData';

const initialState = {
  CategoryId: 0,
  Title: '',
  Description: '',
  PricePerUnit: 0,
  UnitsAvailable: 0,
  SellerId: 0, // default value, will be updated with user.Id
};

function SellingForm({ obj, newUser }) {
  const formObj = obj || { ...initialState, SellerId: newUser };
  const [formInput, setFormInput] = useState(formObj);
  const [categoryList, setCategoryList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getCategories().then((categories) => {
      setCategoryList(categories);
    }).catch((error) => {
      console.error('Error fetching categories:', error);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCategorySelect = (category) => {
    // Set the category id in the form input to the selected category id.
    setFormInput((prevState) => ({
      ...prevState,
      CategoryId: category.id,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput, SellerId: newUser };

    if (obj.Id) {
      updateProduct({ ...payload, Id: obj.Id }).then(() => router.push('/'));
    } else if (formInput.CategoryId !== 0) {
      postProduct(payload).then(() => router.push('/'));
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black">
      <h2 className="text-white mt-5">{obj.Id ? 'Update' : 'Create'} Item Listing</h2>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Product Title" className="mb-3">
        <Form.Control type="text" placeholder="Enter a Title" name="Title" value={formInput.Title} onChange={handleChange} required />
      </FloatingLabel>

      {/* DESCRIPTION INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Product Description" className="mb-3">
        <Form.Control type="text" placeholder="Enter a Description" name="Description" value={formInput.Description} onChange={handleChange} required />
      </FloatingLabel>

      {/* PRICE INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Product Price" className="mb-3">
        <Form.Control type="text" placeholder="Enter Price per Unit" name="PricePerUnit" value={formInput.PricePerUnit} onChange={handleChange} />
      </FloatingLabel>

      {/* UNITS AVAILABLE INPUT  */}
      <FloatingLabel controlId="floatingInput4" label="Units Available" className="mb-3">
        <Form.Control type="text" placeholder="Enter number of Units Available" name="UnitsAvailable" value={formInput.UnitsAvailable} onChange={handleChange} />
      </FloatingLabel>

      {/* CATEGORY INPUT  */}
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{ color: 'white', width: '80%' }}>
          {formInput.CategoryId ? categoryList.find((cat) => cat.id === formInput.CategoryId)?.name : 'Select Category'}
        </Dropdown.Toggle>

        <Dropdown.Menu className="custom-dropdown-menu" style={{ width: '80%' }}>
          {categoryList.map((category) => (
            <Dropdown.Item className="custom-dropdown-item" key={category.id} onClick={() => handleCategorySelect(category)} style={{ color: 'black', fontSize: '16px' }}>
              {category.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.Id ? 'Update' : 'Create'} Product </Button>
    </Form>
  );
}

SellingForm.propTypes = {
  obj: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string,
    PricePerUnit: PropTypes.number,
    CategoryId: PropTypes.number,
    UnitsAvailable: PropTypes.number,
    Id: PropTypes.number,
    SellerId: PropTypes.number,
  }),
  newUser: PropTypes.number.isRequired,
};

SellingForm.defaultProps = {
  obj: initialState,
};

export default SellingForm;
