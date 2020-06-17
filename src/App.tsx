import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect
} from 'react-router-dom';
import { AuthorizationPage, MainPage, SettingsPage } from './components';

function App() {
  return (
    <>
    <AppProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/authorization" component={AuthorizationPage} />
          <Route exact path="/main" component={MainPage} />
          <Route exact path="/settings" component={SettingsPage} />
          <Redirect to="/main" />
        </Switch>
      </BrowserRouter>
    </AppProvider>
    </>
  );
}

export default App;
