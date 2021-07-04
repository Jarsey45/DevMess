import { useEffect, useState } from 'react';
import './App.less';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useDispatch } from 'react-redux';

import LoginView from './Components/Login/LoginView';
import { auth, getFriendsAndGroup } from './api/Firebase';
import MetroFView from './Components/Metro/MetroFView';
import { loadFriends, loadTeams } from './features/loginReducers';

function App() {
  const [isLogged, setLogged] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    //todo do it better and more secure, and check if someone not trying to change isLogged
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log(user);
        setLogged(true);


        const friendsAndGroupsObject = await getFriendsAndGroup(user.uid);
        dispatch(loadFriends(friendsAndGroupsObject.friends))
        dispatch(loadTeams(friendsAndGroupsObject.teams))
      }
      else {
        setLogged(false);
      }
    })
  }, [])

  return (
    <div className="App">
      <Router>
        {/* Fade>  TODO: ADD FADE*/}
        <Switch>
          <Route exact path="/">
            {/* There should be redirect to metro if we're logged in  */}
            {isLogged ? <Redirect to='/metro'></Redirect> : <LoginView></LoginView>}
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
