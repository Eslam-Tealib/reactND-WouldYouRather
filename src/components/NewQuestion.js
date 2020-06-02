import React, { Component } from 'react'
import { connect } from 'react-redux'
import {  handleAddQuestion } from "../actions/questions";
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
    state = {
        optionOneText: '',
        optionTwoText: '',
        toHome: false,
    }

    handleOptionOneTextChange = (e) => {

        const text = e.target.value

        this.setState(() => ({
            optionOneText : text
        }))
    }

    handleOptionTwoTextChange = (e) => {

        const text = e.target.value

        this.setState(() => ({
            optionTwoText : text
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { optionOneText,optionTwoText} = this.state
        const { dispatch,authedUser } = this.props
        const newQ = { optionOneText, optionTwoText, author : authedUser }
    
        dispatch(handleAddQuestion(newQ))

        this.setState({
            toHome : true
        })
    }

    render(){
        const { optionOneText,optionTwoText,toHome} = this.state

        if (toHome === true) {
            return <Redirect to='/' />
        }
        
        return (
            <div  className = 'new-question'>

                <div >
                    <h3 className='center'>Create New Question</h3>
                    <hr></hr>

                    <form className='new-tweet' onSubmit={this.handleSubmit}>
                        <h5>Complete the question</h5>
                        <h3>Would you rather</h3>
                        <textarea
                            placeholder="Enter Option One Text here"
                            value={optionOneText}
                            onChange={this.handleOptionOneTextChange}
                            className='textarea'
                            maxLength={280}
                        />
                        
                        <h3 className="center">OR</h3>
                        
                        <textarea
                            placeholder="Enter Option Two Text here"
                            value={optionTwoText}
                            onChange={this.handleOptionTwoTextChange}
                            className='textarea'
                            maxLength={280}
                        />
                        
                        <button
                            className='btn'
                            type='submit'
                            disabled={optionOneText === '' || optionTwoText === ''}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps ({authedUser}) {
    return {
      authedUser
    };
}

export default connect(mapStateToProps)(NewQuestion)