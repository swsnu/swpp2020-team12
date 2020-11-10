/* eslint react/prop-types: 0 */
import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Group from './components/groups/groups'
import GroupInfo from './components/groups/GroupInfo/GroupInfo'
import Study from './components/study/study'
function App(props) {
  return (
    <ConnectedRouter history={props.history}>
      <div className="App" >
        <Switch>
          <Route path='/group' exact component={Group} />
          <Route path='/group/:group_id' exact component={GroupInfo} />
          <Route path='/study/:group_id' exact component={Study}/>
        </Switch>
      </div>
    </ConnectedRouter>
  );
}

export default App;
