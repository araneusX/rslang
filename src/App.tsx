import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect
} from 'react-router-dom';
import { StateProvider } from './store/stateProvider';
import { BackendProvider } from './backend/backendProveder';

import { Authorization, Main, Settings } from './pages';
import { Header } from './commonСomponents';
import cardObj from './pages/learn/components/testCardObj';

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
              <Redirect to="/main" />
            </Switch>
          </BrowserRouter>
        </BackendProvider>
      </StateProvider>
    </>
  );
}

export default App;
