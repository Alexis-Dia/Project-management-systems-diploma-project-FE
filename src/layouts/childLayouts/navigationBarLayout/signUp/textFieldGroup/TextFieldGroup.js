import { connect } from 'react-redux';
import React, { Component } from 'react';
import classnames from 'classnames';
import './TextFieldGroup.scss';

class TextFieldGroup extends Component {
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

    checkUserExists = (e) => {
        const field = e.target.name;
        const val = e.target.value;
        if (val !== '') {
            if (field === 'username') {
                this.props.checkIfUserExist({fieldName: field, errorName: 'userNameErr', errorDescription: '', fieldValue: val});
            }
            if (field === 'email') {
                this.props.checkIfUserExist({fieldName: field, errorName: 'emailErr', errorDescription: '', fieldValue: val});
            }
        }
    }

    render = () => {
        const { field, label, type, value, onChange, frontendError } = this.props;

        return (
            <div>
                <div className={classnames("form-group", {'has-error': (this.state.errorDescription || frontendError)})}>
                    <label className="control-label">{label}</label>
                    <input
                        onChange={onChange}
                        type={type}
                        onBlur={this.checkUserExists}
                        name={field}
                        className="form-control"/>
                     {(this.state.errorDescription || frontendError) && <span className="help-block">{ (this.state.errorDescription || frontendError) }</span>}
                </div>
            </div>
            );
        }

}

/*TextFieldGroup.propTypes = {
    field: React.PropTypes.string,
    label: React.PropTypes.string,
    type: React.PropTypes.string,
    value: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
    frontendError: React.PropTypes.string
}*/

const mapStateToProps = (state, ownProps) => {
    return {
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        checkIfUserExist: (data) => dispatch({ type: 'CHECK_CURRENT_USER', data })
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TextFieldGroup);
