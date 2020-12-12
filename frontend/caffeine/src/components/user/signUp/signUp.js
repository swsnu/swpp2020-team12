/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreators from '../../../store/actions/index.js';
import { Button, Jumbotron} from 'react-bootstrap'
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

    handlerCancel=(e)=>{
        e.preventDefault()
        this.props.history.push('/signin')
    }
    render(){
        return(
            <Jumbotron>
                <div className="SignUp">
                    <h1 className="head">SignUp</h1>
                    <br></br>
                    <span id="sign-up-label-id">ID</span>
                    <br></br>
                    <input
                            placeholder="ID"
                            id="username"
                            className="text"
                            value={this.state.username}
                            onChange={(e)=>this.setState({username:e.target.value})}
                        />
                    <br></br>
                    <span id="sign-up-label">NickName</span>
                    <br></br>
                    <input
                            placeholder="NickName"
                            id="name"
                            className="text"
                            value={this.state.name}
                            onChange={(e)=>this.setState({name:e.target.value})}
                        />
                    <br></br>
                    <span id="sign-up-label">Password</span>
                    <br></br>
                    <input
                            placeholder="Password"
                            id="password"
                            className="text"
                            value={this.state.password}
                            onChange={(e)=>this.setState({password:e.target.value})}
                        />
                    <br></br>
                    <span id="sign-up-label-message">Message</span>
                    <br></br>
                    <input
                            placeholder="Message"
                            id="message"
                            className="text"
                            value={this.state.message}
                            onChange={(e)=>this.setState({message:e.target.value})}
                        />
                    <br></br>
                    <Button variant="primary" id="sign-up-Button" onClick={this.handlerSignUp} style={{width:'295px', margin:'5px'}}>SignUp</Button>
                    <Button variant="secondary" id="cancle-Button" onClick={this.handlerCancel} style={{width:'295px',margin:'5px'}}>Cancel</Button>
                </div>
            </Jumbotron>
        )
    }
}

  
const mapDispatchToProps = dispatch => {
    return {
        signup: (data)=>
        dispatch(actionCreators.signup(data)),
    }
  }

export default connect(null, mapDispatchToProps)(withRouter(SignUp));