import React, { Component } from 'react'
import './FooterView.scss'
import GitHub from 'react-icons/lib/fa/github'

export default class FooterView extends Component {

  render = () => {
    return (
      <div>
        <div>
          <div className='footer-1'>
            <div></div>
            <div className='footer-1-column'><small>© 2020. Coded by Alexey D.</small></div>
            <div></div>
          </div>
          <div className='footer-2'>
            <div>
              <div className='grid-main'>
                <div className='grid1'>
                </div>
                <div className='grid2'>
                  <div >
                    <h5>Source code:</h5>
                    <ul>
                      <li><GitHub color='#00ccff'/> https://github.com/Alexis-Dk/Module-testing-corse-project-client</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}
