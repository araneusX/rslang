import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect
} from 'react-router-dom';
import { StateProvider } from './store/stateProvider';
import { BackendProvider } from './backend/backendProvider';

import {
  Authorization, Main, Settings, Games, Savannah
} from './pages';
import { Header } from './commonСomponents';
import cardObj from './mosk/testCardObj';

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
              <Route exact path="/games" component={Games} />
              <Route exact path="/games/savannah" component={Savannah} />
              <Redirect to="/main" />
            </Switch>
          </BrowserRouter>
        </BackendProvider>
      </StateProvider>
    </>
  );
}

export default App;
