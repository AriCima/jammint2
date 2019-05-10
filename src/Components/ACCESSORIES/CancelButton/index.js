import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles, MuiThemeProvider, createMuiTheme, withTheme } from '@material-ui/core/styles';

// CSS
import './index.css';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    background: 'none',
    padding: '5px',
    boxShadow: 'none',
    
  },
  cssRoot: {
    color: theme.palette.getContrastText('rgba(0, 144, 248, 1)'),
    border: 'solid 1px rgba(170, 170, 170, 1)',
    backgroundColor: 'white',
    color: 'rgba(0, 144, 248, 1)',
    fontSize: '12px',
    fontWeight: '550',
    display: 'flex',
    alignItems: 'center',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'rgba(170, 170, 170, 0.3)',
      color: 'white',
    },
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
    boxShadow: 'none',
  },
});

class CancelButton extends React.Component {
  // constructor(props){
  //   super(props);
  // }
  render(){
    const { classes } = this.props;
    return (
      
      <div>
        <Button
          variant="contained"
          color="primary"
          box-shadow="none"
          type="submit"
          className={classNames(classes.margin, classes.cssRoot)}
          onSubmit={this.props.fn}
        >
        {this.props.text}
        </Button>
      </div>
    );
  }
}

CancelButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CancelButton);