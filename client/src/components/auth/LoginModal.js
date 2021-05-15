import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/extraReducer/loginExtraReducer';
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

const LoginModal = () => {
  const dispatch = useDispatch();
  const error = useSelector(state => state.errorReducer);
  const { isAuthenticated } = useSelector(state => state.authReducer);
  const [modal, setModal] = useState({
    modal: false,
    email: '',
    password: '',
    msg: null,
  });

  const toggle = () => {
    setModal({
      ...modal,
      modal: !modal.modal,
    });
  };

  useEffect(() => {
    if(error.id === 'LOGIN_FAIL'){
      setModal({
        ...modal,
        msg: error.msg.msg,
      });
    }else{
      setModal({
        ...modal,
        msg: null
      });
    }
    // authenticated close modal
    if(modal.modal){
      if(isAuthenticated){
        toggle();
      }
    }
  },[error,isAuthenticated]);

  const onChange = e => {
    setModal({
        ...modal,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    const {email, password } = modal;
    const user = {
      email,
      password
    }

    dispatch(login(user));
  };

  return (
    <div>
      <NavLink href="#" onClick={toggle}>
        Login
      </NavLink>
      <Modal isOpen={modal.modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          {modal.msg ? <Alert color='danger'>{modal.msg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="email"></Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={onChange}
              />
            
              <Label for="password"></Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={onChange}
              />
           
              <Button color="dark" style={{marginTop: '2rem'}} block>
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default LoginModal;
