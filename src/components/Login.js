import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSetAuthedUser } from '../actions/authedUser'


class Login extends Component {
    state = {
        user : this.props.defaultUser
    }

    handleUserChange = (e) => {
        this.setState({
            user : e.target.value
        })
    }

    handleLogin = (e) => {
        e.preventDefault()
        
        const {dispatch} = this.props
        dispatch(handleSetAuthedUser(this.state.user))
    }

    render() {
        const {users } = this.props        
        
        return (
            <div className='new-question'>
                <div className = 'center' style={{backgroundColor: '#e8e4e1'}}>
                    <h3>Welcome to Would You Rather App</h3>
                    <p>Please Sign In to continue!</p>
                </div>
        
                <h3 className = 'center'>Sign In</h3>
                <hr/>

                <div className='tweet-info'>
                    <div className = 'center'>
                        <select  value={this.state.user} onChange= {this.handleUserChange} id = "selectMenu">
                            <option value="move" disabled>Select User </option>
                            
                            {Object.keys(users).map((userId) => (
                                <option
                                    key = {userId} 
                                    value={userId} >
                                    {users[userId].name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button className = 'btn' onClick={this.handleLogin}>
                        Login
                    </button>
                </div>
            </div>
        )
    }
}

function mapStateToProps ({users}) {
    const usersId = Object.keys(users)
    const defaultUser = usersId.length > 0 ? usersId[0] : ''

    return {
      users,
      defaultUser 
    };
}

export default connect(mapStateToProps)(Login)