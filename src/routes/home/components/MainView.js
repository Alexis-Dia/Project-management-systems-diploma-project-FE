import React, { Component } from 'react'
import MyInformationView from './myInformationView/InformationView'
import FooterView from './footerView/FooterView'
import './MainView.scss'

export default class MainView extends Component {

  render = () => {
    return (
      <div>
        <div className='main-header'>
          <MyInformationView />
          <FooterView />
        </div>
      </div>
    )
  }

}
