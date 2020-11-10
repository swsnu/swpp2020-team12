/* eslint react/prop-types: 0 */
import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Subjects from './components/subjects/subjects'
import Group from './components/groups/groups'
import GroupInfo from './components/groups/GroupInfo/GroupInfo'
import Study from './components/study/study'
import SignIn from './components/user/signIn/signIn'
import SignUp from './components/user/signUp/signUp'

function App(props) {
  return (
    <ConnectedRouter history={props.history}>
      <div className="App" >
        <Switch>
          <Route path='/signin' exact component={SignIn} />
          <Route path='/signup' exact component={SignUp} />
          <Route path='/group' exact component={Group} />
          <Route path='/group/:group_id' exact component={GroupInfo} />
          <Route path='/study/:group_id' exact component={Study}/>
          <Route path='/subject' exact component={Subjects} />
          <Route render={() => <h1>Not Found</h1>} />
        </Switch>
      </div>
    </ConnectedRouter>
  );
}

export default App;
