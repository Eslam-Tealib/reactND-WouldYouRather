import { saveQuestion,saveQuestionAnswer } from "../utils/api";
import {  updateUser } from './users'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SUBMIT_ANSWER = "SUBMIT_ANSWER"
export const ADD_QUESTION = "ADD_QUESTION"

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}
function addQuestion(question){

    return {
      type : ADD_QUESTION,
      question


    } 

}
export function handleAddQuestion(newQuestion) {

  return (dispatch) => {

    return saveQuestion(newQuestion)
      .then(({question,user}) => {
      
        dispatch(addQuestion(question))
        dispatch(updateUser(user))
      
      })
      
  }

}
function submitQuestionAnswer ({ qid, authedUser, answer }) {
  return {
    type: SUBMIT_ANSWER,
    qid,
    authedUser,
    answer
  }
}
// questionAnswer : object of {qid,authedUser,answer}
export function handleSubmitQuestionAnswer(questionAnswer) {

  return (dispatch) => {

    return saveQuestionAnswer(questionAnswer)
      .then((user) => {
        dispatch(submitQuestionAnswer(questionAnswer))
        dispatch(updateUser(user))
      
      })

  
  }

}