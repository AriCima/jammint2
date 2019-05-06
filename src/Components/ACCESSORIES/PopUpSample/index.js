import React, {Component} from 'react';

import './index.css'

export default class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popupText       : this.props.popupText,
            closeButtonText : this.props.closeButtonText,
        }

    };
    render() {
      return (
        <div className='popup'>
          <div className='popup_inner'>
            <h1>{this.state.popupText}</h1>
           
            {this.props.renderInside}

          <button onClick={this.props.closePopup}>{this.state.closeButtonText}</button>
          </div>
        </div>
      );
    }
}

