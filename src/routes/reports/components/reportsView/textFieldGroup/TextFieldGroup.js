import { connect } from 'react-redux';
import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
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

    render = () => {
        const { field, label, type, value, onChange, frontendError } = this.props;

        return (
            <div>
                <div className={classnames("form-group", {'has-error': (this.state.errorDescription || frontendError)})}>
                    <label className="control-label">{label}</label>
                    <input
                        value={value}
                        onChange={onChange}
                        type={type}
                        name={field}
                        className="form-control"/>
                     {(this.state.errorDescription || frontendError) && <span className="help-block">{
                    (
                      this.state.errorDescription
                      ||
                      <div className="help-block" style={{color: 'red', marginTop: '20px'}}>
                        {frontendError}
                      </div>
                    )
                  }</span>}

                </div>
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
)(TextFieldGroup);
