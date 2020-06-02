import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserDashboard from './UserDashboard'


class LeadershipBoard extends Component {
    render(){
        return (
        
            <div>
                <h3 className = 'center' >Leadership Board</h3>

                <ul className = 'dashboard-list'>
                
                    {this.props.usersId.map((id) => (
                        <li key = {id} >
                            <UserDashboard id = {id} />
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function compare( a, b ) {
    const score1 = a.questions.length + Object.keys(a.answers).length
    const score2 = b.questions.length + Object.keys(b.answers).length

    if ( score1 < score2 ){
      return 1;
    }

    if ( score1 > score2 ){
      return -1;
    }

    return 0;
}

function sortUsersByScoreDescending(users){
    const mapped = Object.keys(users).map((id) => ({
        id : users[id].id,
        questions: users[id].questions,
        answers: users[id].answers
    })) 

    return mapped.sort(compare).map((user) => (user.id ))
}

function mapStateToProps ({authedUser, users}) {
    return {
      authedUser,
      usersId : users ? sortUsersByScoreDescending(users) : []
    };
}

export default connect(mapStateToProps)(LeadershipBoard)