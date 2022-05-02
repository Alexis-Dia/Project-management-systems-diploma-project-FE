import React, { Component } from 'react'
import ProjectsView from './projectsView/ProjectsView'
import FooterView from './footerView/FooterView'
import './MainView.scss'

export default class MainView extends Component {

  render = () => {
    return (
      <div>
        <div className='main-header'>
          <ProjectsView />
          <FooterView />
        </div>
      </div>
    )
  }

}
