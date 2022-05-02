import React, { Component } from 'react'
import CreateProjectView from './createProjectView/CreateProjectView'
import FooterView from './footerView/FooterView'
import './MainView.scss'

export default class MainView extends Component {

  render = () => {
    return (
      <div>
        <div className='main-header'>
          <CreateProjectView />
          <FooterView />
        </div>
      </div>
    )
  }

}
