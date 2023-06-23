import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
const Posts = () => <h2>Posts</h2>
const PostNew = () => <h2>PostNew</h2>

class App extends Component {
    componentDidMount() {
      this.props.fetchUser();
    }
  
    render() {
      return (
        <div className="container">
          <BrowserRouter>
            <div>
              <Header />
              <Route exact path="/" component={Landing} />
              <Route exact path="/surveys" component={Dashboard} />
              <Route path="/surveys/new" component={SurveyNew} />
              <Route exact path="/posts" component={Posts} />
              <Route path="/posts/new" component={PostNew} />
            </div>
          </BrowserRouter>
        </div>
      );
    }
  }
  
export default connect(null, actions)(App);

/* 

const App = () => {
    return (
        <div className='container'>
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/surveys" component={Dashboard} />
                    <Route path="/surveys/new" component={SurveyNew} />
                    <Route exact path="/posts" component={Posts} />
                    <Route path="/posts/new" component={PostNew} />
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App; */