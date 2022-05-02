import { connect } from 'react-redux';
import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import classnames from 'classnames';
import map from 'lodash/map';

class SelectFieldGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorName: "",
            errorDescription: "",
            fieldValue: ""
        }
    }

    componentWillReceiveProps (nextprops) {
    }

    render = () => {
        const { field, label, type, value, onChange, frontendError } = this.props;

        return (
            <div>

               </div>
        );
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectFieldGroup);
