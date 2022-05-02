import React, { Component } from 'react'
import CarsView from './carsView/CarsView'
import FooterView from './footerView/FooterView'
import './MainView.scss'

export default class MainView extends Component {

  render = () => {
    return (
      <div>
        <div className='main-header'>
          <CarsView />
          <FooterView />
        </div>
      </div>
    )
  }

}
