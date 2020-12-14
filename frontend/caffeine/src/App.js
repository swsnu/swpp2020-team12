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
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Button} from 'react-bootstrap';


class App extends React.Component {
    componentDidMount() {
        this.props.getLogin();
    }

    LogoutHandler = () => {
        if(window.location.href.startsWith('studies', 29)){
            window.alert("stop study before logout")
        }
        else{
            this.props.signout();
        }
    }
    gotoHome = () => {
        this.props.history.push('/');
    }

    gotoGroup = () => {
        this.props.history.push('/groups')
    }
    gotoSubject = () => {
        this.props.history.push('/subjects')
    }
    gotoRank = () => {
        this.props.history.push('/rankings')
    }
    gotoStat = () => {
        this.props.history.push('/statistics')
    }
    render() {
        return (
            <ConnectedRouter history={this.props.history}>
                {this.props.isLoggedIn ?
                    (<div className="App">
                        <Navbar bg="dark" variant="dark">
                            <Navbar.Brand href="#home">Caffeine Camera</Navbar.Brand>
                                <Nav className="mr-auto">
                                    <Nav.Link id='home-link' href="#" onSelect={this.gotoHome}>Home</Nav.Link>
                                    <Nav.Link id='subject-link' href="# " onSelect={this.gotoSubject}>Subject</Nav.Link>
                                    <Nav.Link id='group-link' href="#  " onSelect={this.gotoGroup}>Group</Nav.Link>
                                    <Nav.Link id='stat-link' href="#   " onSelect={this.gotoStat}>Statistic</Nav.Link>
                                    <Nav.Link id='rank-link' href="#    " onSelect={this.gotoRank}>Ranking</Nav.Link>
                                </Nav>
                                <Nav>
                                    <Button variant="outline-warning">{this.props.user && <div id='user-info'>Hello, {this.props.user.name}</div>}</Button>
                                    <Button variant="outline-warning" id='logout-button' onClick={this.LogoutHandler}>Sign-Out</Button>
                                </Nav>
                        </Navbar>
                        <Navbar className="justify-content-center" bg="dark" variant="dark" fixed="bottom">
                            <p className="text-center mt-4 mb-4" style={{color: 'white'}}>Copyright © swpp2020-team12. All Right Reserved</p>
                        </Navbar>
                        <Switch>
                            <Route path='/groups' exact component={Group}/>
                            <Route path='/' exact component={mainPage}/>
                            <Route path='/groups/:group_id' exact component={GroupInfo}/>
                            <Route path='/studies/:group_id' exact component={Study}/>
                            <Route path='/subjects' exact component={Subjects}/>
                            <Route path='/rankings' exact component={Ranking}/>
                            <Route path='/statistics' exact component={Statistic}/>
                            <Redirect exact to="/"/>
                        </Switch>
                        
                    </div>) : (
                        <div className="App">
                             <Navbar bg="dark" variant="dark">
                                <Navbar.Brand href="#home">Caffeine Camera</Navbar.Brand>
                            </Navbar>
                            <Navbar className="justify-content-center" bg="dark" variant="dark" fixed="bottom">
                                <p className="text-center mt-4 mb-4" style={{color: 'white'}}>Copyright © swpp2020-team12. All Right Reserved</p>
                            </Navbar>
                            <Switch>
                                <Route path='/signin' exact component={SignIn}/>
                                <Route path='/signup' exact component={SignUp}/>
                                <Redirect exact to="/signin"/>
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
            dispatch(actionCreators.signout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);