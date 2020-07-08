import React, { useContext } from 'react';
import {
  BrowserRouter, Switch, Route, Redirect
} from 'react-router-dom';
import {
  Authorization, Main, Settings, Statistics, Games, SpeakIt, About, Vocabulary
} from './pages';

import { Header, Footer } from './commonComponents';
import { StateContext } from './store/stateProvider';

function App() {
  const { state } = useContext(StateContext);
  const { isAuth } = state.auth;
  return (
    <>
      <BrowserRouter>
        {isAuth && <Header />}
        <Switch>
          <Route exact path="/authorization" component={Authorization} />
          {isAuth && (
          <>
            <Route exact path="/main" component={Main} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/statistics" component={Statistics} />
            <Route exact path="/vocabulary" component={Vocabulary} />
            <Route exact path="/games" component={Games} />
            <Route exact path="/about" component={About} />
            <Route exact path="/games/speakit" component={SpeakIt} />
          </>
          )}
          <Redirect to={isAuth ? '/main' : '/authorization'} />
        </Switch>
        {isAuth && <Footer />}
      </BrowserRouter>
    </>
  );
}

export default App;
