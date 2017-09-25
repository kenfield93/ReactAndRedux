/**
 * Created by kyle on 9/18/17.
 */
import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {

    render(){
        return(
            <div className="jumbotron">
                <h1>Class Admin</h1>
                <p> React, Redux, and React Router writen in ES6</p>
                <Link to="about" className="btn btn-primary btn-lg">Learn More</Link>
            </div>
        );
    }
}

export default  HomePage;