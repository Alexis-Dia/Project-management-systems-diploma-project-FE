import { connect } from 'react-redux';
import React, { Component } from 'react'
import {
  ADD_FLASH_MESSAGE,
  MESSAGE_LOG_IN_SUCCESSFULY,
} from '../../../../api/flash/flashActions'
import { LOGIN } from '../../../../api/login/loginActions'
import TextFieldGroup from '../signUp/textFieldGroup/TextFieldGroup';
import './LoginForm.scss';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: {user: {errors: ''}},
        };
    }

    componentWillMount () {
        this.setState({auth: {user: {errors: ''}}});
    }

    componentWillReceiveProps (nextprops) {
        if (nextprops.user !== this.props.user) {
            this.setState({auth: nextprops.user});
            if (nextprops.user.isAuthenticated) {
                this.props.showFlashMessage({ type: 'success',  text: MESSAGE_LOG_IN_SUCCESSFULY});
                this.props.toggleLogIn();
            }
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (true) {
            this.props.login(
                {
                    user:
                        {
                            emailAddress: this.state.identifier,
                            password: this.state.password
                        }
                }
            );
        }
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render = () => {
        const { identifier, password } = '';

        return (
            <div className="logInStyle-1">
                <form onSubmit={this.onSubmit} >
                    <h6 style={{marginBottom: '25px'}}>Login to carriages system</h6>
                    { this.state.auth.user.errors !== '' && <div className="alert alert-danger">Wrong username or password!{this.state.auth.user.errors}</div>}
                    {/*{ this.props.user.user.errors !== '' && <div className="alert alert-danger">{this.props.user.errors}</div>}*/}
                    <TextFieldGroup
                        field="identifier"
                        label="Email"
                        value={identifier}
                        onChange={this.onChange}
                    />

                    <TextFieldGroup
                        field="password"
                        label="Password"
                        value={password}
                        onChange={this.onChange}
                        type="password"
                    />

                    <div className="form-group">
                        <button className="btn btn-primary btn-sm" disabled={false}>Login</button>
                    </div>
                    <div align="center">
                        <a href="http://me.org:8080/login/google">Log in with Google</a>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.auth || {}
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        login: (data) => dispatch({type: LOGIN, data}),
        showFlashMessage: (data) => dispatch({type: ADD_FLASH_MESSAGE, data})
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm)
