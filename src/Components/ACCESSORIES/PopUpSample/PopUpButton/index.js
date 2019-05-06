import React, {Component} from 'react';

import PopUpSample from '../../PopUpSample';

// CSS
import './index.css'

export default class PopUpButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      buttonText: this.props.buttonText,
      popupText: this.props.popupText,
      closeButtonText: this.props.closeButtonText,
    };

    this.togglePopup = this.togglePopup.bind(this);
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  render() {
    return (
      <div className='app'>
        <button onClick={this.togglePopup}>{this.state.buttonText}</button>
        {this.state.showPopup ? 
            <div className="popup-wrapper">
                <PopUpSample
                    popupText={this.state.popupText}
                    closePopup={this.togglePopup}
                    closeButtonText={this.state.closeButtonText}
                    renderInside={this.props.renderInside}
                />
                <div className="popup-buttons-area">
                    <div className="popup-button" id="cancel-button">
                        <button onClick={this.cancel}>Cancel</button>
                    </div>
                    <div className="popup-button" id="submit-button">
                        <button onClick={this.cancel}>Cancel</button>
                    </div>
                </div>
            </div>
          : null
        }
      </div>
    );
  }
};