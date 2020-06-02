import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { handleSubmitQuestionAnswer } from '../actions/questions'
import { Redirect } from 'react-router-dom'
const OPTION_ONE = "optionOne"
const OPTION_TWO = "optionTwo"

class QuestionPoll extends Component {
    state = {
        selectedOption : this.props.question.optionOne.text,
        toResult : false
    }

    handleOptionChange = (e) => {
        this.setState({
            selectedOption: e.target.value
        });
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        
        const { dispatch,question ,authedUser} = this.props
       
        var answer = OPTION_ONE

        if (this.state.selectedOption === question.optionTwo.text){
            answer = OPTION_TWO
        }

        const q = { qid:question.id, authedUser, answer }
      
        dispatch(handleSubmitQuestionAnswer(q))
        this.setState ({
            toResult : true
        })
    }
    
    render(){
        const { question } = this.props
        const { toResult } = this.state

        const fromParent = this.props.location.state

        if (typeof fromParent === 'undefined') {
            return <h3>Error 404, not found</h3>
        }

        if(toResult){
            const param = '/question/' + question.id + '/result'
            return <Redirect to={{
                pathname: param,
                state: { fromParent: true }
                }
            } />
        }

        if (question === null) {
        return <p>This Question doesn't existd</p>
        }
    
        const { author, avatar, optionOne, optionTwo } = question
    
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
                        
                        <h3>Would you rather...</h3>
                        <form onSubmit={this.handleFormSubmit}>
                            <div>
                                <label>
                                    <input type="radio" value={optionOne.text} 
                                        checked={this.state.selectedOption === optionOne.text} 
                                        onChange={this.handleOptionChange} 
                                    />
                                    {optionOne.text}
                                </label>
                            </div>

                            <div>
                                <label>
                                    <input type="radio" value={optionTwo.text} 
                                        checked={this.state.selectedOption === optionTwo.text} 
                                        onChange={this.handleOptionChange} 
                                    />
                                    {optionTwo.text}
                                </label>
                            </div>

                            <button className = 'btn' type = 'submit' >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }




}

function mapStateToProps ({authedUser, users, questions}, props) {
   
    const id = props.match.params.id
    const question = questions[id]
    const author = users[question.author]
    return {
      authedUser,
      question : question ? formatQuestion(question,author) : null
      };
  }
export default connect(mapStateToProps)(QuestionPoll)
