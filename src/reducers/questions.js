import { RECEIVE_QUESTIONS,SUBMIT_ANSWER,ADD_QUESTION } from '../actions/questions'


export default function questions(state = { },action) {

    switch(action.type){

        case RECEIVE_QUESTIONS : 
            return {

                ...state,
                ...action.questions

            }
        case ADD_QUESTION : 
            return {
                ...state,
                [action.question.id]: action.question,


            }
        case SUBMIT_ANSWER : 

            
            return {
                ...state,
                [action.qid]: {
                ...state[action.qid],
                [action.answer]: {
                    text : state[action.qid][action.answer].text ,
                    votes: state[action.qid][action.answer].votes.concat(action.authedUser)
                }

                }
            }
        
        default :
            return state

        
    }



}