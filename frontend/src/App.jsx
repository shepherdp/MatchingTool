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
<<<<<<< HEAD
import TeamOptions from './pages/team_options';
import PreviousGroups from './pages/PreviousGroups';
import EditRatings from './pages/EditRatings';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';

ReactDOM.render(
  <Router>
    <TeamOptions />
  </Router>,
  document.getElementById('root')
);
=======
import EditParticipants from './pages/edit_participants';
>>>>>>> 7c346e6a4122a5613a7239c23eba8e1ac1996012

const App =()=> {
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
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/editparticipants' element={<PrivateRoute><EditParticipants/></PrivateRoute>} />
          <Route path='/' element = {<Home/>} />
          <Route path='/dashboard' element={<PrivateRoute><Dashboard /> </PrivateRoute>} />
          <Route path='/test' element={<Test />} />
          <Route path='/create/name' element={<PrivateRoute><Name /> </PrivateRoute>} />
          <Route path='/create/type' element={<PrivateRoute><Type /> </PrivateRoute>} />
          <Route path='/maketeams/:groupName' element={<PrivateRoute><MakeTeams /> </PrivateRoute>} />
          <Route path='/create/addmember' element={<PrivateRoute><Members /> </PrivateRoute>} />
          <Route path='/teams' element={<PrivateRoute><DisplayTeams /></PrivateRoute> } />
          <Route path='/teamoptions' element={<TeamOptions /> } />
          <Route path='/editratings' element={<EditRatings />} />
          <Route path='/PreviousGroups' element={<PreviousGroups />} />
        </Routes>
       </BrowserRouter>
       </groupContext.Provider>
    </>
   
  );
};

export default App;
