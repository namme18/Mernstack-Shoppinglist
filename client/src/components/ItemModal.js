import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { addItem } from '../redux/rootreducer';
import { useDispatch, useSelector } from 'react-redux';

const ItemModal = () => {
  const { isAuthenticated } = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const [modal, setModal] = useState({
    modal: false,
    name: '',
  });
  // state = {
  //   modal: false,
  //   name: '',
  // };

  const toggle = () => {
    setModal({
      ...modal,
      modal: !modal.modal,
    });
  };

  const onChange = e => {
    setModal({
      ...modal,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    const newItem = {
      name: modal.name,
    };
    //Add Item via AddItem action
    dispatch(addItem(newItem));

    //closed modal
    toggle();
  };
  return (
    <div>
      {isAuthenticated ? (
        <Button color="dark" style={{ marginBottom: '2rem' }} onClick={toggle}>
          Add Item
        </Button>
      ) : (
        <h4 className="mb-3 ml-4">Please log in to manage items</h4>
      )}

      <Modal isOpen={modal.modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add To Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Add shopping item"
                onChange={onChange}
              />
              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ItemModal;
