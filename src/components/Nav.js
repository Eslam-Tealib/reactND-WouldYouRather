import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleLogout } from '../actions/authedUser'
class Nav extends Component {

  logout = (e) => {
    const { dispatch , authedUser} = this.props

    dispatch(handleLogout(authedUser))
  }

  render() {
    const {username,authedUser} = this.props
   
    return (
      <nav className="topnav">

        <NavLink to='/' exact activeClassName='active'>
          Home
        </NavLink>
    
        <NavLink to='/add' activeClassName='active'>
          New Question
        </NavLink>
    
        <NavLink to='/leaderboard' activeClassName='active'>
          Leader Board
        </NavLink>
        
        {authedUser && 
          <div className="topnav-right">
          
            <p>{username}</p>
            
            <NavLink to='/' activeClassName='active' className="topnav-right" onClick = {this.logout} >
              Logout
            </NavLink>
          
          </div>
        }
      </nav>
    )
  }
} 

function mapStateToProps ({authedUser,users}) {
  const username = users[authedUser] ? users[authedUser].name : ''
  
  return {
    authedUser,
    username
  };
}

export default connect(mapStateToProps)(Nav)