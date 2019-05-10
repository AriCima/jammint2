import React, {Component} from 'react';

import CreatePopup from '..';


// CSS
import './index.css'

export default class CreateButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userID,

      showPopup: this.props.showPopup,
      buttonText: this.props.buttonText,
      popupText: this.props.popupText,
      closeButtonText: this.props.closeButtonText,
    };

    this.togglePopup = this.togglePopup.bind(this);

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
                <CreatePopup
                  userID={this.state.userId}
                  closePopup={this.togglePopup}
                />
            </div>
          : null
        }
      </div>
    );
  }
};