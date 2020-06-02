import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Home from './Home'
import '../App.css';
import QuestionPoll from './QuestionPoll';
import QuestionResult from "./QuestionResult";
import LeadershipBoard from "./LeadershipBoard";
import NewQuestion from './NewQuestion'
import Login from './Login'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Nav from './Nav'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    const {loading , authedUser} = this.props
    return (
      <Router>
        <div className='container'>
          <Nav />

          { (loading === false && authedUser) 
            ? <div>
                <Route path='/' exact component={authedUser ? Home : Login} />
                <Route path='/question/:id' exact component={authedUser ? QuestionPoll : Login} />
                <Route path='/question/:id/result' exact component={authedUser ? QuestionResult : Login} />
                <Route path='/add' component={authedUser ? NewQuestion : Login} />
                <Route path='/leaderboard' component={authedUser ? LeadershipBoard : Login} />
              </div>
            
            : ((loading === false && !authedUser) ? <Login /> : null) 
          }
        </div>
      </Router>
    )
  }
}

function mapStateToProps ({ users,authedUser }) {
  const usersLen = Object.keys(users).length
  return {
    loading: usersLen === 0,
    authedUser,
  }
}

export default connect(mapStateToProps)(App)

