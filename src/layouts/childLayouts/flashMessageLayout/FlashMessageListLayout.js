import React from 'react';
import FlashMessage from './FlashMessage';
import { connect } from 'react-redux';
import {
  ADD_FLASH_MESSAGE,
  MESSAGE_LOG_IN_SUCCESSFULY,
  DELETE_BY_VALUE_FLASH_MESSAGES
} from '../../../api/flash/flashActions'
import './FlashMessageListLayout.scss'
import { EMPTY_STRING } from '../../../properties/properties';

class FlashMessagestListLoyout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: {user: {errors: EMPTY_STRING}},
            flashMessages: null
      };
    }

  componentDidUpdate() {
    window.setTimeout(() => {
      this.props.deleteByValueFlashMessages(MESSAGE_LOG_IN_SUCCESSFULY);
    }, 3000)
  }

  shouldComponentUpdate() {
    return true;
  }

  componentWillReceiveProps (nextprops) {
    if (nextprops.user !== this.props.user) {
      this.setState({auth: nextprops.user});
    }
    this.setState({flashMessages: nextprops.flashMessages});
  }

    render() {

      return (
        <div className='flash-message-main-style'>
          <div className='flash-message-main-style-2'>
            <div></div>
            <div></div>
            <div>
              {this.state.flashMessages !== null && (this.state.flashMessages.map((ob) =>
                <FlashMessage
                  key={ob.id}
                  id={ob.id}
                  type={ob.type}
                  text={ob.text}/>
              ))}
            </div>
          </div>
        </div>
      );
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.auth || {},
    flashMessages: state.flashMessages || {}
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteByValueFlashMessages: (data) => dispatch({type: DELETE_BY_VALUE_FLASH_MESSAGES, data}),
    showFlashMessage: (data) => dispatch({type: ADD_FLASH_MESSAGE, data})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlashMessagestListLoyout);
