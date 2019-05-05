import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    margin: '10px',
  },
  title: {
    fontSize: 14,
    maxWidth: '50vw'

  },
  div: {
      display: 'table',
  },
  sender: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  seen: {
    color: '#bdbdbd',
  }
};

function PieceMessage(props) {
    const { classes } = props;
    var senderStyle;
    var isSeen;
    if(props.sender === true)
        senderStyle = classes.sender;
    if(props.seen === true)
        isSeen = "seen";
  return (
      <li className={senderStyle} style={{listStyleType: 'none'}} >
        <div className={classes.div}>
            <Card className={classes.card}>
                <CardContent style={{paddingBottom: '16px'}}>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {props.content}
                    </Typography>
                </CardContent>
            </Card>
            <div className={classes.seen}>
              {isSeen}
            </div>
        </div>
      </li>
  );
}

PieceMessage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PieceMessage);