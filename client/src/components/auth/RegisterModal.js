import React, { useState, useEffect } from 'react';
import { register } from '../../redux/extraReducer/authExtraReducer';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from 'reactstrap';
import { clearErrors } from '../../redux/errorReducer';

const RegisterModal = () => {
  const [modal, setModal] = useState({
    modal: false,
    name: '',
    email: '',
    password: '',
    msg: null,
  });

  const dispatch = useDispatch();
  const error = useSelector(state => state.errorReducer);
  const { isAuthenticated } = useSelector(state => state.authReducer);

  const toggle = () => {
    dispatch(clearErrors());
    setModal({
      ...modal,
      modal: !modal.modal,
    });
  };
  useEffect(() => {
    //Check register error
    if (error.id === 'REGISTER_FAIL') {
      setModal({
        ...modal,
        msg: error.msg.msg,
      });
    } else {
      setModal({
        ...modal,
        msg: null,
      });
    }
    // if authenticated closed modal
    if(modal.modal){
      if(isAuthenticated){
        toggle();
      }
    }
  }, [error,isAuthenticated]);

  const onChange = e => {
    setModal({
      ...modal,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: modal.name,
      email:modal.email,
      password:modal.password,
    };
    dispatch(register(newUser));
    //Close modal
    //toggle();
  };

  return (
    <div>
      <NavLink color="dark" onClick={toggle} href="#">
        Register
      </NavLink>
      <Modal isOpen={modal.modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          {modal.msg ? <Alert color="danger">{modal.msg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="name"
                onChange={onChange}
                className="mb-3"
              />

              <Label for="item">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={onChange}
                className="mb-3"
              />

              <Label for="item">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={onChange}
                className="mb-3"
              />
              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default RegisterModal;
