import React, { Component } from 'react'
import { connect } from 'react-redux'


class UserDashboard extends Component {
    render(){
        const { user } = this.props

        if (user === null) {
        return <p>This user doesn't exist</p>
        }
    
        const {answers, questions , avatarURL,name} = user
        
        const answeredQuestions = Object.keys(answers).length
        const createdQuestions = questions.length
        const score = answeredQuestions + createdQuestions

        return (
            
            <div className='tweet'>
                <div className='user-image'>
                    <img
                    src={avatarURL}
                    alt={`Avatar of ${name}`}
                    className='avatar'
                    />
                </div>

                <div className='tweet-info'>
                    <h2>{name}</h2>
                    <div>
                        <h4>Answered Questions { answeredQuestions}</h4>
                        <h4>Created Question { createdQuestions}</h4>      
                    </div>
                </div>

                <div className='score'>
                    <h2>Score</h2>
                    <h2> { score} </h2>
                </div>
            </div>
        )
    }
}


function mapStateToProps ({authedUser, users}, { id }) {
    return {
      authedUser,
      user : users[id]
    };
}

export default connect(mapStateToProps)(UserDashboard)