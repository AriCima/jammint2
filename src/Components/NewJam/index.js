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


const jamType = [
    {
      value: 'shared_flat',
      label: 'Shared Flat',
    },
    {
      value: 'friends_jams',
      label: 'Friends Jam',
    },
];
  

class NewJam extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            userID      : this.props.userID,
            jams        : [],
            jamName     : '',
            jamType     : 'basic',
            jamCode     : '',
        };
        this.onNewJam             = this.onNewJam.bind(this);
    }

    componentDidMount(){
        DataService.getUserInfo(this.state.userID)
        .then(res => {
            console.log('el res = ', res)
            let jams = res.jam;
            this.state.jams = jams;
        })
    }

    onChangeState(field, value){
        let jamInfo = this.state;
        jamInfo[field] = value;
        this.setState(jamInfo)
    };



    onNewJam(e){
        e.preventDefault();       

        let jcode = Calculations.generateCode();
        this.state.jamCode = jcode;

        let newState = this.state;
        console.log('state del Jam = ', newState)
        DataService.createJam(newState)
        .then((result)=>{
            console.log('el result del createJam = ', result);
           
            let newJam = {
                jamId       : result.id,
                admin       : true,
                moderator   : true,
                jammer      : true,
            }

            let transJam = this.state.jams
            transJam.push(newJam);

            this.setState({
                jams : transJam,
            })
        

            console.log('el jams actualizado es = ', this.state.jams)
            DataService.addJamtoUser(this.state.userID, this.state.jams)
                
            this.props.propsFn.push(`/jam/${result.id}`)
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
                <h4>CREATE A JAM</h4>
            </div>

            <form  id="form-format" className={classes.container} noValidate autoComplete="off" onSubmit={this.onNewJam}>
            
                <div id="input-area">

                    <div id="input-fields">
                        <TextField
                            id="with-placeholder"
                            label="Jam Name"
                            className={classes.textField}
                            margin="normal"
                            value={this.state.jamName}
                            onChange={(e)=>{this.onChangeState('jamName', e.target.value)}}
                        />
                    </div>


                    {/* <div id="input-fields-select">
                        <TextField
                            select
                            label="Jam Type"
                            className={classNames(classes.margin, classes.textField)}
                            value={this.state.jamType}
                            onChange={(e)=>{this.onChangeState('jamType', e.target.value)}}
                        >
                            {jamType.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div> */}


                </div>

                <div className="button-area">
                    
                        <Button variant="contained" color="primary" className={classes.button} type="submit">
                            Enviar
                        </Button>
                    
                </div>
            </form>
        </div>
    );
  }
}

NewJam.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewJam);