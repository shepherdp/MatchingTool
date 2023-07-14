import './App.css';
import { BrowserRouter, Routes, Route, json} from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Test from './pages/test';
import Name from './create_groups/name';
import Type from './create_groups/type';
import Members from './create_groups/members';
import Register from './pages/register';
import PrivateRoute from './components/private_route';
import MakeTeams from './pages/maketeams';
import { groupContext } from './helper/group_context';
import { useState } from 'react';
import DisplayTeams from './pages/display_teams';
import Home from './pages/home';
import TeamOptions from './pages/team_options';
import PrevTeams from './pages/PreviousTeams';
import EditParticipants from './pages/edit_participants';
import RequestReset from './pages/request_reset';
import SetNewPass from './pages/set_new_pass';
import NotFound from './pages/not_found';
import About from './pages/about';
import CookieNotice from './components/cookie_notice';
import Cookies from 'universal-cookie';
import Privacy from './pages/privacy';

const App =()=> {
  const cookie = new Cookies();
  const [cookies_accepted, setCookiesAccepted] = useState(cookie.get('accept_teammaker_cookies'))
  const [groups, setGroups] = useState(JSON.parse(sessionStorage.getItem('groups')))
  const [groupName, setGroupName] = useState(sessionStorage.getItem('groupName'))
  const [teams, setTeams] = useState(JSON.parse(sessionStorage.getItem('teams')))
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
    <groupContext.Provider value={{groups, setGroups, groupName, setGroupName, teams, setTeams}}>
      {!cookies_accepted && <CookieNotice />}
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/*' element={<NotFound />} />
          <Route path='/aboutteam' element={<About />} />
          <Route path='/privacy' element={<Privacy />} />
          <Route path='/reset' element={<RequestReset />} />
          <Route path='/reset/:token' element={<SetNewPass />} />
          <Route path='/register' element={<Register />} />
          <Route path='/editparticipants/:groupName' element={<PrivateRoute><EditParticipants/></PrivateRoute>} />
          <Route path='/' element = {<Home/>} />
          <Route path='/dashboard' element={<PrivateRoute><Dashboard /> </PrivateRoute>} />
          <Route path='/test' element={<Test />} />
          <Route path='/create/name' element={<PrivateRoute><Name /> </PrivateRoute>} />
          <Route path='/create/type' element={<PrivateRoute><Type /> </PrivateRoute>} />
          <Route path='/maketeams/:groupName' element={<PrivateRoute><MakeTeams /> </PrivateRoute>} />
          <Route path='/create/addmember' element={<PrivateRoute><Members /> </PrivateRoute>} />
          <Route path='/teams' element={<PrivateRoute><DisplayTeams /></PrivateRoute> } />
          <Route path='/teamoptions' element={<PrivateRoute><TeamOptions /></PrivateRoute> } />
          <Route path='/PreviousTeams' element={<PrivateRoute><PrevTeams /></PrivateRoute>} />
        </Routes>
       </BrowserRouter>
       </groupContext.Provider>
    </>
   
  );
};

export default App;
