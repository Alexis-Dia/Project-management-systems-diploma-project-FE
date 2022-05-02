import React, { Component } from 'react'
import SignUpView from './signUpView/SignUpView'
import FooterView from './footerView/FooterView'
import './MainView.scss'

export default class MainView extends Component {

  render = () => {
    return (
      <div>
        <div className='main-header'>
          <SignUpView />
          <FooterView />
        </div>
      </div>
    )
  }

}
