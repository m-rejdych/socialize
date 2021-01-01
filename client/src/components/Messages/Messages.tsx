import { Grid } from '@material-ui/core';

import Friends from '../Friends';

const Messages: React.FC = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <Friends />
      </Grid>
    </Grid>
  );
};

export default Messages;
