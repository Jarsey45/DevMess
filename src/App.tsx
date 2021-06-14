import React, { useEffect, useState } from 'react';
import './App.less';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import LoginView from './Components/Login/LoginView';
import { RootState } from './app/store';
import { auth } from './api/Firebase';
import MetroFView from './Components/Metro/MetroFView';

function App() {
  const [isLogged, setLogged] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user)
        setLogged(true);
    })
  })

  return (
    <div className="App">
      <Router>
        {/* Fade>  TODO: ADD FADE*/}
        <Switch>
          <Route exact path="/">
            {/* There should be redirect to metro if we're logged in  */}
            <LoginView></LoginView>
          </Route>
          <Route exact path="/metro">
            {isLogged ? <MetroFView></MetroFView> : <Redirect to='/'></Redirect>}
          </Route>
        </Switch>
        {/* </Fade> */}
      </Router>
    </div>
  );
}

export default App;
