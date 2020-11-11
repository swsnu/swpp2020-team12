/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreators from '../../store/actions/index';

import "./mainPage.css"

class mainPage extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            
        }

    }
   
     
    gotoGroup=()=>{this.props.history.push('/group')}
    gotoSubject=()=>{this.props.history.push('/subject')}

    render(){
        return(
            <div id="Main">
               <span id="logo_text">Caffeine Camera</span>
               <input type="checkbox" id="menu-icon"></input>
               <label htmlFor="menu-icon">
                   <span></span>
                   <span></span>
                   <span></span>
               </label>
               <div id="sidebar">
                   <br></br>
                   <h1 id="menu">Menu</h1>
                   <br></br>
                   <ul>
                       <li id="id">ID</li>
                       <br></br>
                       <li id="mypage">My Page</li>
                       <br></br>
                       <li id="subject" onClick={this.gotoSubject}>Subject</li>
                       <br></br>
                       <li id="group" onClick={this.gotoGroup}>Group</li>
                       <br></br>
                       <li id="statistics">Statistics</li>
                       <br></br>
                       <li id="ranking">Ranking</li>
                   </ul>
               </div>
               <div>
               <button id="button">
                   <span id="button">Study</span>
               </button>
               </div>
               
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
        
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(mainPage));