/**
 * Created by kyle on 9/18/17.
 */

import React, {PropTypes} from 'react';
import {Link, IndexLink } from 'react-router';
import LoadingWidget from './LoadingWidget';

// activeCLassName is part of react router and allows us to style currently selected anchor
const Header =  ({loading}) =>{
    return(
        <div>
             <p>School Space, your classroom out of the classroom</p>
            <nav>
                <IndexLink to="/" activeClassName="active">Home</IndexLink>
                 {" | "}
                <Link to="/about" activeClassName="active">About</Link>
                {" | "}
                <Link to="/courses" activeClassName="active">Courses</Link>
                {/* equivalent to: loading ? <LoadingWidget.../>  : loading
                    I think ternary is actually better cause it lets you control fail condition
                    ( what if loading is false or 0 and not null/undefined?)
                    */ }
                {loading && <LoadingWidget interval={50} dots={9} />}
             </nav>
        </div>
    );
};

Header.propTypes ={
    loading: PropTypes.bool.isRequired
};

export default Header;