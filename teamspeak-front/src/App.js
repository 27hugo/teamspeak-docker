import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ChannelCreateComponent from './components/channels/ChannelCreateComponent';
import UpdateClientComponent from './components/clients/UpdateClientComponent';
import ChangePasswordComponent from './components/clients/ChangePasswordComponent';
import HomeComponent from './components/home/HomeComponent';
import FooterComponent from './components/footer/FooterComponent';
import NavbarComponent from './components/navbar/NavbarComponent';
import TokenService from './services/TokenService';
import AdminComponent from './components/admin/AdminComponent';
import TermsComponent from './components/terms/TermsComponent';
const token = new TokenService();
token.validateTokenTime();

function App() {

  return (
    <div>
      <div>
        <Router>
          <NavbarComponent/>
          <Route path="/" exact component={HomeComponent} />
          <Route path="/account/changepassword" exact component={ChangePasswordComponent} />
          <Route path="/account/update" exact component={UpdateClientComponent} />
          <Route path="/channels/create" exact component={ChannelCreateComponent} />
          <Route path="/admin" exact component={AdminComponent} />
          <Route path="/terminos" exact component={TermsComponent} />
        </Router>
      </div>
      <FooterComponent  />
      
      
    </div>
  );
}

export default App;
