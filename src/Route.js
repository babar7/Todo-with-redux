import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import TodoList from './components/todoList';
// import About from './components/about';
import history from './History'

// const history = createBrowserHistory()

class Routers extends Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    <Route exact path="/" component={TodoList} />
                    {/* <Route exact path="/about" component={About} /> */}
                </div>
            </Router>
        )
    }
}

export default Routers;