import React, { Component } from 'react'
import ReportsByIdView from './reportsByIdView/ReportsByIdView'
import FooterView from '../../home/components/footerView/FooterView'
import './MainView.scss'

export default class MainView extends Component {

  render = () => {
    return (
      <div>
        <div className='main-header'>
          <ReportsByIdView taskId={this.props.params.id}/>
          <FooterView />
        </div>
      </div>
    )
  }

}
