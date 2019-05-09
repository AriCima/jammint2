import React, {Component} from 'react';

import PopUpBody from '../../PopUpBody';


// CSS
import './index.css'

export default class PopUpButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userID,
      showPopup: false,
      buttonText: this.props.buttonText,
      popupText: this.props.popupText,
      closeButtonText: this.props.closeButtonText,
    };

    this.togglePopup = this.togglePopup.bind(this);
    console.log('user en popupButton = ', this.state.userId)

  };
  
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  };

  render() {
    return (
      <div className='app'>
        <button onClick={this.togglePopup}>{this.state.buttonText}</button>
        {this.state.showPopup ? 
            <div className="popup-wrapper">
                <PopUpBody
                  popupText={this.state.popupText}
                  closePopup={this.togglePopup}
                  closeButtonText = {'Cancel'}
                  renderInside={this.props.renderInside}
                />
            </div>
          : null
        }
      </div>
    );
  }
};