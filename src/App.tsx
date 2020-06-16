import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AuthorizationPage from './Pages/AuthorizationPage';
import MainPage from './Pages/MainPage';
import SettingsPage from './Pages/SettingsPage';

function App() {
  return (
    <>
      <nav>
        <a href="/authorization"> Authorization Page </a>
        <a href="/main"> Main Page </a>
        <a href="/settings"> Settings Page </a>
      </nav>

      <BrowserRouter>
        <Switch>
          <Route exact path="/authorization" component={AuthorizationPage}/>
          <Route exact path="/main" component={MainPage}/>
          <Route exact path="/settings" component={SettingsPage}/>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
