import React, {Component} from 'react';
import {connect} from 'react-redux';
import {MuiPickersUtilsProvider} from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import {EN} from "../properties/properties";
import moment from 'moment';

const localeMap = {
    de: 'de',
    en: 'en',
    fr: 'fr',
};

class MuiProviderWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        this.setState({
            lang: "EN"
        });
    }

    componentWillReceiveProps (nextProps) {
    }

    render() {
        const { children } = this.props;
        moment.locale("EN");
        return (
            <MuiPickersUtilsProvider utils={MomentUtils} locale="EN" moment={moment}>
                {children}
            </MuiPickersUtilsProvider>
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
)(MuiProviderWrapper)
