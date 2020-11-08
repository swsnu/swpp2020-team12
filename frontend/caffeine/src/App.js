/* eslint react/prop-types: 0 */
import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Group from './components/groups/groups'
import GroupInfo from './components/groups/GroupInfo/GroupInfo'
import SignIn from './components/user/signIn/signIn'
import SignUp from './components/user/signUp/signUp'
import mainPage from './components/main/mainPage'

function App(props) {
  return (
    <ConnectedRouter history={props.history}>
      <div className="App" >
        <Switch>
          <Route path='/signin' exact component={SignIn} />
          <Route path='/signup' exact component={SignUp} />
          <Route path='/group' exact component={Group} />
          <Route path='/' exact component={mainPage} />
          <Route path='/group/:group_id' exact component={GroupInfo} />
          <Route render={() => <h1>Not Found</h1>} />
        </Switch>
      </div>
    </ConnectedRouter>
  );
}

export default App;
