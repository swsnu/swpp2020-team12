/* eslint react/prop-types: 0 */
import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Subjects from './components/subjects/subjects'
import Group from './components/groups/groups'
import GroupInfo from './components/groups/GroupInfo/GroupInfo'

function App(props) {
  return (
    <ConnectedRouter history={props.history}>
      <div className="App" >
        <Switch>
          <Route path='/group' exact component={Group} />
          <Route path='/group/:group_id' exact component={GroupInfo} />
          <Route path='/subject' exact component={Subjects} />
        </Switch>
      </div>
    </ConnectedRouter>
  );
}

export default App;
