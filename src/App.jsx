import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Create from './pages/create';
import Test from './pages/test';
import Name from './create_groups/name';
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
      </Routes>
    </main>
    </BrowserRouter>
  );
};

export default App;
