import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ItemModal from './components/ItemModal';
import  { Container, Form } from 'reactstrap';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { getUser } from './redux/extraReducer/authExtraReducer'

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  },[]);
  return (
      <div className="App">
        <AppNavbar />
        <Container>
        <ItemModal/>
        <ShoppingList />
        </Container>
      </div>
  );
}

export default App;
