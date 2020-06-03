import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { Redirect } from 'react-router-dom'

class Question extends Component {
    state = {
        toViewPoll : false
    }

    handleViewPoll = (e) => {
        e.preventDefault()
        this.setState({
            toViewPoll : true
        })
    }

    render(){
        const { toViewPoll } = this.state
        const { question, isAnswered } = this.props

        if(toViewPoll === true) {
            const viewPage = '/question/' + question.id

            const resultPage = '/question/' + question.id + '/result'
            const param = isAnswered ? resultPage : viewPage

            // Udacity Review
            // { this.props.isAnswered
            //     ? <AnswerView id={id}/>
            //     : <QuestionView id={id}/>
            // }

            return <Redirect to={{
                pathname: param,
                state: { fromParent: true }
                }
            } />
        }
        
        
        
        if (question === null) {
            return <p>This Question doesn't existd</p>
        }
    
        const { author, avatar, optionOne } = question
    
        return (
            <div className='tweet'>
                <img
                src={avatar}
                alt={`Avatar of ${author}`}
                className='avatar'
                />

                <div className='tweet-info'>
                    <div>
                        <span>{author} asks:</span>
                        
                        <h3>Would you rather</h3>
                    
                        <p>{optionOne.text}...</p>
                    </div>
                    <div className='tweet-icons'>
                    
                    <button className = 'btn' onClick={this.handleViewPoll}>
                        View Poll
                    </button>
                
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps ({authedUser, users, questions}, { id }) {
    const question = questions[id]
    const author = users[question.author]
    return {
      authedUser,
      question : question ? formatQuestion(question,author) : null
      };
  }
  
export default connect(mapStateToProps)(Question)


