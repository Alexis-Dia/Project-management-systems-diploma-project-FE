import React, { Component } from 'react'
import CreateTaskView from './createTaskView/CreateTaskView'
import FooterView from './footerView/FooterView'
import './MainView.scss'

export default class MainView extends Component {

  render = () => {
    return (
      <div>
        <div className='main-header'>
          <CreateTaskView />
          <FooterView />
        </div>
      </div>
    )
  }

}
