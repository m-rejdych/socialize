import { Paper, Avatar, TextField, makeStyles, Box } from '@material-ui/core';

import Post from '../Post';
import { useUserQuery, useFeedQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
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
  const { data: userData } = useUserQuery();
  const { data: feedData } = useFeedQuery();

  return (
    <Box>
      <Paper className={classes.paper}>
        <Avatar className={classes.marginRight} />
        <TextField
          fullWidth
          placeholder={`What's new, ${userData?.user.firstName || ''}?`}
          variant="outlined"
          InputProps={{ className: classes.inputBackground }}
        />
      </Paper>
      {feedData?.feed.map(({ id }) => (
        <Post id={id} />
      ))}
    </Box>
  );
};

export default Feed;
