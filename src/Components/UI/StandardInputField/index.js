import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// const useStyles = makeStyles(theme => ({
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   textField: {
//     marginLeft: theme.spacing(1),
//     marginRight: theme.spacing(1),
//     width: 200,
//   },
// }));

const StandardInputField = (props) => {
  // const classes = useStyles();
  const { id, value, placeholder } =  props

  const manageChange = () => {
    console.log('value material= ', value)
    props.onChange()
  } 

  return (
      
      <TextField
        id={id}
        // className={classes.textField}
        label={placeholder}
        margin="normal"
        value={value}
        onChange={manageChange}
      />
      
  );
}

export default StandardInputField;