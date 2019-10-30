import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function StandardInputField(props) {
    const classes = useStyles();
    const { id, handleChange, value, placeholder } =  props

    return (
        
        <TextField
            id={id}
            className={classes.textField}
            label={placeholder}
            margin="normal"
            value={value}
            handleChange={handleChange}
        />
        
    );
}