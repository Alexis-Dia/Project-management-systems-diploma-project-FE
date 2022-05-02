import React, { Component } from 'react'
import TasksView from './tasksView/TasksView'
import FooterView from './footerView/FooterView'
import './MainView.scss'

export default class MainView extends Component {

  render = () => {
    return (
      <div>
        <div className='main-header'>
          <TasksView />
          <FooterView />
        </div>
      </div>
    )
  }

}
