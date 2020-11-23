/* eslint react/prop-types: 0 */
import React from 'react';
import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import {ConnectedRouter} from 'connected-react-router';
import Subjects from './components/subjects/subjects'
import Group from './components/groups/groups'
import GroupInfo from './components/groups/GroupInfo/GroupInfo'
import Study from './components/study/study'
import SignIn from './components/user/signIn/signIn'
import SignUp from './components/user/signUp/signUp'
import mainPage from './components/main/mainPage'
import Statistic from './components/statistic/statistic'
import Ranking from './components/rank/ranking'
import * as actionCreators from './store/actions/index';


class App extends React.Component {
    componentDidMount() {
        this.props.getLogin();
    }

    LogoutHandler = () => {
        this.props.signout();
    }
    homeHandler = () => {
        this.props.history.push('/');
    }

    render() {


        const userTools = this.props.isLoggedIn ?
            <div>
                <button id='logout-button' onClick={this.LogoutHandler}>logout</button>
                <button id='home-button' onClick={this.homeHandler}>HOME</button>
                {this.props.user && <div id='user-info'>Hello, {this.props.user.name}</div>}
            </div>
            : null;

        return (
            <ConnectedRouter history={this.props.history}>
                {this.props.isLoggedIn ?
                    (<div className="App">
                        {userTools}
                        <Switch>
                            <Route path='/group' exact component={Group}/>
                            <Route path='/' exact component={mainPage}/>
                            <Route path='/group/:group_id' exact component={GroupInfo}/>
                            <Route path='/study/:group_id' exact component={Study}/>
                            <Route path='/subject' exact component={Subjects}/>
                            <Route path='/ranking' exact component={Ranking}/>
                            <Redirect exact to="/"/>
                        </Switch>
                    </div>) : (
                        <div className="App">
                            <Switch>
                                <Route path='/signin' exact component={SignIn}/>
                                <Route path='/signup' exact component={SignUp}/>
                                <Redirect exact to="/signin"/>
                                <Route render={() => <h1>Not Found</h1>}/>
                            </Switch>
                        </div>
                    )
                }
            </ConnectedRouter>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        user: state.user.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getLogin: () =>
            dispatch(actionCreators.getLogin()),
        signout: () =>
            dispatch(actionCreators.signout())
        ,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);