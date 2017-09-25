/**
 * Created by kyle on 9/18/17.
 */
import React, {PropTypes} from 'react';
import Header from './common/Header';
import {connect} from 'react-redux';

class AppTemplate extends React.Component{

    render(){

        return(
            <div className="container-fluid">
                <Header loading={this.props.loading} />
                {this.props.children}

            </div>
        );
    }
}
//Ensures a props.children isn't null and is an object
AppTemplate.propTypes = {
    children: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
};

function mapStateToProps(state){
    return{ loading: state.numAjaxCallsInProgress > 0};
}

export default connect(mapStateToProps)(AppTemplate);