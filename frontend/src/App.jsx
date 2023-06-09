import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
// import Test from './pages/test';
import Name from './create_groups/name';
import Type from './create_groups/type';
import Members from './create_groups/members';
import Register from './pages/register';
const App =()=> {
  return (
    
    <>
    <header>
        <meta charSet='UTF-8'/>
        <title>Match-Maker</title>
        <link rel="icon" href="../app/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Changa:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet"/>
    </header>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard />} />
          {/* <Route path='/test' element={<Test />} /> */}
          <Route path='/create/name' element={<Name/>} />
          <Route path='/create/type' element={<Type/>} />
          <Route path='/create/addmember' element={<Members/>} />
        </Routes>
       </BrowserRouter>
    </>
   
  );
};

export default App;
