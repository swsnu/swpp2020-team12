/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreators from '../../../store/actions/index.js';
import "./signUp.css"

class SignUp extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            username:"",
            password:"",
            name:"",
            message:""
        }

    }

    handlerSignUp=()=>{
        this.props.signup({username:this.state.username, password:this.state.password, name:this.state.name, message:this.state.message})
    }

    handlerCancle=(e)=>{
        e.preventDefault()
        this.props.history.push('/signin')
    }
    render(){
        return(
            <div className="SignUp">
                <h1 className="head">SignUp</h1>
                <br></br>
                <label className='label2'>ID</label>
                <br></br>
                <input
                        placeholder="ID"
                        id="username"
                        className="text"
                        value={this.state.username}
                        onChange={(e)=>this.setState({username:e.target.value})}
                    />
                <br></br>
                <label className='label'>NickName</label>
                <br></br>
                <input
                        placeholder="NickName"
                        id="name"
                        className="text"
                        value={this.state.name}
                        onChange={(e)=>this.setState({name:e.target.value})}
                    />
                <br></br>
                <label className='label'>Password</label>
                <br></br>
                <input
                        placeholder="Password"
                        id="password"
                        className="text"
                        value={this.state.password}
                        onChange={(e)=>this.setState({password:e.target.value})}
                    />
                <br></br>
                <label className='label'>Message</label>
                <br></br>
                <input
                        placeholder="Message"
                        id="message"
                        className="text"
                        value={this.state.message}
                        onChange={(e)=>this.setState({message:e.target.value})}
                    />
                <br></br>
                <button className="button" id="sign-up-button" onClick={this.handlerSignUp}>SignUp</button>
                <button className="button" id="cancle-button" onClick={this.handlerCancle}>Cancel</button>
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
        signup: (data)=>
        dispatch(actionCreators.signup(data)),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp));