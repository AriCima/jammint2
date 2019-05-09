import React, {Component} from 'react';

import './index.css'

export default class PopupBody extends Component {
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
            <div className="popup_inner_title">
              <h1>{this.state.popupText}</h1>
            </div>
            {this.props.renderInside}

          </div>
        </div>
      );
    }
}

