import React, { Component } from 'react'
import CreateReportView from './createReportView/CreateReportView'
import FooterView from './footerView/FooterView'
import './MainView.scss'

export default class MainView extends Component {

  render = () => {
    return (
      <div>
        <div className='main-header'>
          <CreateReportView />
          <FooterView />
        </div>
      </div>
    )
  }

}
