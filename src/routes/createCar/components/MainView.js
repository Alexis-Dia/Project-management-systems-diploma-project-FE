import React, { Component } from 'react'
import CreateCarView from './createCarView/CreateCarView'
import FooterView from './footerView/FooterView'
import './MainView.scss'

export default class MainView extends Component {

  render = () => {
    return (
      <div>
        <div className='main-header'>
          <CreateCarView />
          <FooterView />
        </div>
      </div>
    )
  }

}
