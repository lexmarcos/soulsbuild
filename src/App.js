import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import ProjectDetails from './components/projects/ProjectDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SingUp';
import CreateProject from './components/projects/CreateProject';
import mostLikebled from './components/dashboard/mostLikebled';
import Home from './components/home/home';
import EmailVerifiedBar from './components/layout/EmailVerifiedBar';
import Perfil from './components/perfil/Perfil';
import UploadPhotos from './components/perfil/UploadPhotos';
import editPerfil from './components/perfil/editPerfil';
import PerfilOtherUser from './components/perfil/perfilOtherUser';


function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
          <Navbar/>
          <EmailVerifiedBar/>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/feed" component={Dashboard}/>
              <Route path="/project/:id" component={ProjectDetails}/>
              <Route path="/signin" component={SignIn}/>
              <Route path="/signup" component={SignUp}/>
              <Route path="/melhores" component={mostLikebled}/>
              <Route path="/create" component={CreateProject}/>
              <Route exact path="/perfil/:uid" render={() => Perfil} component={Perfil}/>
              <Route exact path="/user/:uid" render={() => Perfil} component={PerfilOtherUser}/>
              <Route path="/editperfil/:uid" component={editPerfil}/>
              <Route path="/profilePic/:uid" component={UploadPhotos} />
            </Switch>
        </div>
    </BrowserRouter>
  );
}

export default App;
