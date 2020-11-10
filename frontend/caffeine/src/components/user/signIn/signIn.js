/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreators from '../../../store/actions/index.js';
import "./signIn.css"

class SignIn extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            username:"",
            password:""
        }

    }
   
    handlerSignIn=()=>{
        this.props.signin({username:this.state.username, password:this.state.password})
    }

    render(){
        return(
            <div className="Signin">
                <p className="logo">
                    <img src="/images/logo.png"></img>
                </p>
                <span className="logo_text">
                    Caffeine Camera
                </span>
                <p className="Input">
                    <input
                        placeholder="ID"
                        className="Text"
                        id="username"
                        value={this.state.username}
                        onChange={(e)=>this.setState({username:e.target.value})}
                    />
                    <br/>
                    <input
                        type="password"
                        placeholder="PW"
                        className="Text"
                        id="password"
                        value={this.state.password}
                        onChange={(e)=>this.setState({password:e.target.value})}
                    />
                    <br/>
                    <button className="button" id="sign-in-button" onClick={this.handlerSignIn}>SignIn</button>
                    <button className="button" id="sign-up-button" onClick={()=> this.props.history.push('/signup')}>SignUp</button>
                </p>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {

    };
  }
  
const mapDispatchToProps = dispatch => {
    return {
        signin: (data)=>
        dispatch(actionCreators.signin(data)),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));