/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreators from '/home/harvey/test/swpp2020-team12/frontend/caffeine/src/store/actions/index.js';
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
                <p className="logo_text">
                    <img src="/images/logo_text.png"></img>
                </p>
                <p className="Input">
                    <input
                        placeholder="ID"
                        className="Text"
                        value={this.state.username}
                        onChange={(e)=>this.setState({username:e.target.value})}
                    />
                    <br/>
                    <input
                        placeholder="PW"
                        className="Text"
                        value={this.state.password}
                        onChange={(e)=>this.setState({password:e.target.value})}
                    />
                    <br/>
                    <button className="button" onClick={this.handlerSignIn}>SignIn</button>
                    <button className="button" onClick={()=> this.props.history.push('/signup')}>SignUp</button>
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