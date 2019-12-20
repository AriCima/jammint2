import React, {Fragment} from "react";

// FONTAWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

// REDUX
import { connect } from 'react-redux';
import { selectJam } from '../../../redux/actions/jamActive';

// CSS
import "./index.css";

const Home = (props) => {

  const onSelectJam = (jamId) => {
    console.log('jamId en home = ', jamId)
    props.selectJam(jamId);
  };

  return (

    <button  className="home-button" onClick={()=> onSelectJam('overview')}>
        <FontAwesomeIcon className="home-icon-style" icon={faHome} />
    </button>
  )
  
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectJam: () => dispatch(selectJam('overview')),
  }
}

export default connect(null, mapDispatchToProps)(Home)
