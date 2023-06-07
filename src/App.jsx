import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Create from './pages/create';
import Test from './pages/test';
import Name from './create_groups/name';
import Type from './create_groups/type';
const App =()=> {
  return (
    <BrowserRouter>
    <main>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/create' element={<Create />} />
        <Route path='/test' element={<Test />} />
        <Route path='/create/name' element={<Name/>} />
        <Route path='/create/type' element={<Type/>} />
      </Routes>
    </main>
    </BrowserRouter>
  );
};

export default App;
