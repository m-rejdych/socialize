import { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  CircularProgress,
  Box,
  Avatar,
  makeStyles,
} from '@material-ui/core';

import { useProfileQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme) => ({
  fontBold: {
    fontWeight: 600,
  },
  borderRadius: {
    borderRadius: 10,
  },
}));

const Friends: React.FC = () => {
  const { data, loading } = useProfileQuery();
  const [selectedFriend, setSelectedFriend] = useState<null | string>(null);
  const classes = useStyles();

  if (data?.profile) {
    const { friends } = data.profile;

    const handleSelectFriend = (id: string): void => {
      setSelectedFriend(id);
    };

    return (
      <List title="Friends">
        {friends.map(({ id, user: { fullName } }) => (
          <ListItem
            key={id}
            button
            selected={selectedFriend === id}
            onClick={(): void => handleSelectFriend(id)}
            className={classes.borderRadius}
          >
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText
              classes={{
                primary: selectedFriend === id ? classes.fontBold : undefined,
              }}
            >
              {fullName}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    );
  }

  return loading ? (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <CircularProgress size={300} color="primary" />
    </Box>
  ) : null;
};

export default Friends;
