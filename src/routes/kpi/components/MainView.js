import React, { Component } from 'react'
import DriversView from './driversView/DriversView'
import FooterView from './footerView/FooterView'
import './MainView.scss'

export default class MainView extends Component {

  render = () => {
    return (
      <div>
        <div className='main-header'>
          <DriversView />
          <FooterView />
        </div>
      </div>
    )
  }

}
