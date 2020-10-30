import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Group from './components/groups/groups'

function App(props) {
  return (
    <ConnectedRouter history={props.history}>
      <div className="App" >
        <Switch>
          <Route path='/group' exact component={Group} />
        </Switch>
      </div>
    </ConnectedRouter>
  );
}

export default App;
