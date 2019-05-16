import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles} from '@material-ui/core/styles';

// CSS
import './index.css';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    background: 'rgba(0, 144, 248, 1)',
    padding: '5px',
    boxShadow: 'none',
    
  },
  cssRoot: {
    color: theme.palette.getContrastText('rgb(0, 187, 150)'),
    border: 'solid 1px rgba(0, 144, 248, 1)',
    backgroundColor: 'rgba(0, 144, 248, 1)',
    color: 'white',
    fontSize: '12px',
    fontWeight: '550',
    display: 'flex',
    alignItems: 'center',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'rgba(0, 144, 248, 0.7)',
      color: 'white',
    },
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
    boxShadow: 'none',
  },
});

class ChatButton extends React.Component {
 
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
        >
        {this.props.text}
        </Button>
      </div>
    );
  }
}

ChatButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatButton);