import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class Home extends Component {
    state = {
        isSortedByAnswered : false
    }

    handleClick = (e) => {

        this.setState((currentState) => (
            {
                isSortedByAnswered : !currentState.isSortedByAnswered
            }
        ))
    }

    render(){

        const { isSortedByAnswered } = this.state
        const {questions, user} = this.props
        
        var targetQuestions = isSortedByAnswered ?  getSortedAnsweredQuestions(questions, user)
        : getUnansweredQuestions(questions, user)

      
        return (
            <div>
                <h3 className = 'center' >Your Timeline</h3>
            
                <div className = 'center'>
                    <button className = {isSortedByAnswered ? 'menu-btn-active' : 'menu-btn'} 
                    onClick = {this.handleClick}>
                    Answered</button>
                    <button className = {!isSortedByAnswered ? 'menu-btn-active' : 'menu-btn'} 
                    onClick = {this.handleClick}>Unanswered</button>
                </div>

                <ul className = 'dashboard-list'>
                    {targetQuestions.map((id) => (
                        <li key = {id} >
                            <Question id = {id} isAnswered={isSortedByAnswered}/>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function getAnsweredQuestions(user){
    const usersAnswerO = Object.keys(user.answers)
    return usersAnswerO
}

function getUnansweredQuestions(questions, user) {
    const questionsIds = questions.map((question) =>question.id) 
    const usersAnswerO = getAnsweredQuestions(user) 
    const unansweredQuestions = questionsIds.filter((id) => !usersAnswerO.includes(id)) 

    return unansweredQuestions
}

function getSortedAnsweredQuestions(questions, user) {
    const questionsIds = questions.map((question) =>question.id) 
    const usersAnswerO = getAnsweredQuestions(user) 
    const sortedAnsweredQuestions = questionsIds.filter((id) => usersAnswerO.includes(id)) 

    return sortedAnsweredQuestions
}


function sortByDate(questions){
    const sorted = Object.keys(questions)
    .sort((a,b) => questions[b].timestamp - questions[a].timestamp).map((key) => questions[key])

    return sorted
}

function mapStateToProps({questions,users,authedUser}){
    return {
        questions : sortByDate(questions),
        user: users[authedUser],
    }
}

export default connect(mapStateToProps)(Home)
