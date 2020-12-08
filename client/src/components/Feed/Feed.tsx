import { Paper, Avatar, TextField, makeStyles } from '@material-ui/core';

import { useUserQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  marginRight: {
    marginRight: theme.spacing(2),
  },
  inputBackground: {
    backgroundColor: '#FAFAFA',
  },
}));

const Feed: React.FC = () => {
  const classes = useStyles();
  const { data } = useUserQuery();

  return (
    <Paper className={classes.paper}>
      <Avatar className={classes.marginRight} />
      <TextField
        fullWidth
        placeholder={`What's new, ${data?.user.firstName || ''}?`}
        variant="outlined"
        InputProps={{ className: classes.inputBackground }}
      />
    </Paper>
  );
};

export default Feed;
