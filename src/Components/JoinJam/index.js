import React from 'react';

// SERVICE API
import DataService from '../services/DataService';
import Calculations from '../services/Calculations';

// MATERIAL-UI
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import './index.css'; 

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
    background: 'rgb(0, 144, 248);',
  },
  input: {
    display: 'none',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },

});


class JoinJam extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            userID      : this.props.userID,
            userJams    : [],
            jamCode     : '',
        };
        this.onJoinJam             = this.onJoinJam.bind(this);
    }

    componentDidMount(){
        DataService.getUserInfo(this.state.userID)
        .then(res => {
            let jams = res.jam;
            this.state.userJams = jams;
        })
    }

    onChangeState(field, value){
        let jamInfo = this.state;
        jamInfo[field] = value;
        this.setState(jamInfo)
    };



    onJoinJam(e){
        e.preventDefault();       
       
        DataService.getJam(this.state.jamCode)
        .then((result)=>{
           
            let JoinJam = {
                jamId       : result.id,
                jamName     : this.state.jamName,
                admin       : false,
                moderator   : false,
                jammer      : true,
            }
            console.log('el JoinJam = ', JoinJam);
            let transJam = this.state.userJams
            transJam.push(JoinJam);

            this.setState({
                userJams : transJam,
            })
        

            console.log('el jams actualizado es = ', this.state.userJams)
            DataService.addJamtoUser(this.state.userID, this.state.userJams)
                
            this.props.JoinJam(result.id);
        })
        .catch(function (error) {    
            console.log(error);
        })
        
       
    };

  
  render() {
    const { classes } = this.props;

    return (

        <div className="form-container">

            <div className="form-title">
                <h4>JOIN A JAM</h4>
            </div>

            <form  id="form-format" className={classes.container} noValidate autoComplete="off" onSubmit={this.onJoinJam}>
            
                <div id="input-area">

                    <TextField
                        className={classes.margin}
                        InputLabelProps={{
                        classes: {
                            root: classes.cssLabel,
                            focused: classes.cssFocused,
                        },
                        }}
                        InputProps={{
                        classes: {
                            root: classes.cssOutlinedInput,
                            focused: classes.cssFocused,
                            notchedOutline: classes.notchedOutline,
                        },
                        }}
                        label="Jam Code"
                        variant="outlined"
                        id="custom-css-outlined-input"
                        onChange={(e)=>{this.onChangeState('jamCode', e.target.value)}}
                    />


                </div>

                <div className="button-area">
                    
                        <Button variant="contained" color="primary" className={classes.button} type="submit">
                           Join
                        </Button>
                    
                </div>
            </form>
        </div>
    );
  }
}

JoinJam.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(JoinJam);