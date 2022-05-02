import React, { Component }  from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import './FlashMessage.scss'

class FlashMessage extends Component {
    constructor(props) {
        super(props);
    }

    onClick = () => {
      this.props.deleteFlashMessage(this.props.id);
    };

    render = () => {
      const { id, type, text } = this.props;
        return (
            <div>
                <div
                  style={{
                    borderRadius: '0px'
                  }}
                  className={classnames('alert', {
                    'alert-success text-center': type === 'success',
                    'alert-info text-center': type === 'alert',
                    'alert-warning text-center': type === 'warning',
                    'alert-danger text-center': type === 'error',
                    'alert-primary text-center': type === 'primary',
                })}
                >
                    <button onClick={this.onClick} className="close"><span>&times;</span></button>
                    {text}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        deleteFlashMessage: (data) => dispatch({type: 'DELETE_FLASH_MESSAGE', data})
    }
};

export default connect(null, mapDispatchToProps)(FlashMessage);
