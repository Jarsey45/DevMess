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
import { auth, getFriendsAndGroup, getUserData } from './api/Firebase';
import MetroFView from './Components/Metro/MetroFView';
import { loadFriends, loadTeams, userLoadData } from './features/loginReducers';

function App() {
  const [isLogged, setLogged] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    //todo do it better and more secure, and check if someone not trying to change isLogged
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setLogged(true);

        //set redux logged state after auth
        const loggedData = await getUserData();
        dispatch(userLoadData(loggedData))


        //getting friends/teams from db
        const friendsAndGroupsObject = await getFriendsAndGroup();

        //adding friends and teams to state;
        dispatch(loadFriends(friendsAndGroupsObject.friends));
        dispatch(loadTeams(friendsAndGroupsObject.teams));

      }
      else {
        setLogged(false);
      }
    })
  }, [dispatch])

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
