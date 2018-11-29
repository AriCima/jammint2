import React from 'react';

// SERVICE API
import DataService from '../services/DataService';
import Calculations from '../services/Calculations';

// MATERIAL-UI
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


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



class NewJam extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            adminId      : this.props.userID,
            userJams    : [],
            jamName     : '',
            jamType     : 'basic',
            jamCode     : '',
        };
        this.onNewJam             = this.onNewJam.bind(this);
    }

    componentDidMount(){
        DataService.getUserInfo(this.state.userID)
        .then(res => {
            let jams = res.userJams;
            this.state.userJams = jams;
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
       
        console.log('new state = ', newState)
        DataService.createJam(newState)
        .then((result)=>{
           
            let newJam = {
                jamId       : result.id,
                jamName     : this.state.jamName,
                admin       : true,
                moderator   : true,
                jammer      : true,
            }
            console.log('el newJam = ', newJam);
            let transJam = this.state.userJams
            transJam.push(newJam);

            this.setState({
                userJams : transJam,
            })
        

            //console.log('el jams actualizado es = ', this.state.userJams)
            DataService.addJamToUser(this.state.adminId, this.state.userJams)
                
            this.props.newJam(result.id);
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
                        label="Jam Name"
                        variant="outlined"
                        id="custom-css-outlined-input"
                        onChange={(e)=>{this.onChangeState('jamName', e.target.value)}}
                    />

                    </div>
                </div>

                <div className="button-area">
                    <Button variant="contained" color="primary" className={classes.button} type="submit">
                        Create
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