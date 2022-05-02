import React from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import MuiProviderWrapper from "./MuiProvederContext";
import PropTypes from 'prop-types'

class App extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
  };

  shouldComponentUpdate () {
    return false
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <MuiProviderWrapper>
          <div style={{ overflow: 'auto' }}>
            <Router history={browserHistory} children={this.props.routes} />
          </div>
        </MuiProviderWrapper>
      </Provider>
    )
  }
}

export default App
