import React, { Component } from 'react'
import FreeTasksView from './freeTasksView/FreeTasksView'
import FooterView from './footerView/FooterView'
import './MainView.scss'

export default class MainView extends Component {

  render = () => {
    return (
      <div>
        <div className='main-header'>
          <FreeTasksView />
          <FooterView />
        </div>
      </div>
    )
  }

}
