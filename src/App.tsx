import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect
} from 'react-router-dom';
import { StateProvider } from './store/stateProvider';
import { BackendProvider } from './backend/backendProvider';

import { Authorization, Main, Settings, Statistics } from './pages';
import { Header } from './commonComponents';

function App() {
  return (
    <>
      <StateProvider>
        <BackendProvider>
          <BrowserRouter>
            <Header />
            <Switch>
              <Route exact path="/authorization" component={Authorization} />
              <Route exact path="/main" component={Main} />
              <Route exact path="/settings" component={Settings} />
              <Route exact path="/statistics" component={Statistics} />
              <Redirect to="/main" />
            </Switch>
          </BrowserRouter>
        </BackendProvider>
      </StateProvider>
    </>
  );
}

export default App;
