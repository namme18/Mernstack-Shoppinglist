import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ItemModal from './components/ItemModal';
import  { Container } from 'reactstrap';

function App() {
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
