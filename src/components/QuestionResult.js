import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'

class QuestionResult extends Component {
    render(){
        const { question, optionOneVotes, optionTwoVotes, totalVotes, authedUser } = this.props
        
        if (question === null) {
        return <h3>Error 404, not found</h3>
        }

        const yourVote = "Your Vote"
        const isOp1 = userIdExists (authedUser, question, "optionOne")
        const isOp2 = userIdExists (authedUser, question, "optionTwo")
        const { author, avatar, optionOne,optionTwo } = question
        
        
        return (
            
            <div className='tweet'>
                
                <img
                src={avatar}
                alt={`Avatar of ${author}`}
                className='avatar'
                />

                <div className='tweet-info'>
                    <div>
                        <span>Asked by {author} </span>
                        
                        <h3>Results: </h3>

                        <h3>
                            {optionOne.text} - {(totalVotes === 0) 
                            ? 0 
                            : optionOneVotes / totalVotes * 100 }% 
                        </h3>
                    
                        {isOp1 && <h4 
                            style={{textAlign: 'center' , 
                            backgroundColor: 'yellow'}}
                        >
                            {yourVote}
                        </h4>}

                        <h5>{optionOneVotes} out of {totalVotes}</h5>
                    
            
                        <h3>
                            {optionTwo.text} - {(totalVotes === 0) 
                            ? 0 
                            : optionTwoVotes / totalVotes * 100 }%
                        </h3>

                        {isOp2 && <h4
                            style={{textAlign: 'center' ,
                            backgroundColor: 'yellow'}}
                        >
                            {yourVote}
                        </h4>}

                        <h5>{optionTwoVotes} out of {totalVotes}</h5>
                    </div>
                </div>
            </div>
        )
    }
}

function userIdExists ( userId, question, option ) {
    return question[option].votes.includes(userId)
}

function mapStateToProps ({authedUser, users, questions}, props) {
    const id = props.match.params.id
    const question = questions[id]
    const author = question ?  users[question.author] : undefined

    const { optionOne,optionTwo } = question ? question : {}
    const optionOneVotes = optionOne ? optionOne.votes.length : 0
    const optionTwoVotes = optionTwo ? optionTwo.votes.length : 0
    const totalVotes = optionOneVotes + optionTwoVotes

    return {
      authedUser,
      question : question ? formatQuestion(question,author) : null,
      optionOneVotes,
      optionTwoVotes,
      totalVotes
    };
}

export default connect(mapStateToProps)(QuestionResult)