import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Todo from './components/Todo'
import Navbar from './components/Navbar';
import Transaction from './components/Transaction';
import Login from './components/Login';
import Signup from './components/Signup';
import ExpenseState from './context/expenses/ExpenseState'
import TodoState from './context/todos/TodoState'


function App() {
  return (
    <>
    <TodoState>
      <ExpenseState>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Todo/>}/>
          <Route path='/transaction' element={<Transaction/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>
      </Router>
      </ExpenseState>
      </TodoState>
    </>
  );
}

export default App;
