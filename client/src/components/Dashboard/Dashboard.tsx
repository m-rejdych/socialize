import { useState } from 'react';
import {
  Typography,
  Avatar,
  Box,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Button,
  ListItemIcon,
} from '@material-ui/core';
import { useReactiveVar } from '@apollo/client';
import { Home, Message, Search } from '@material-ui/icons';

import { userVar } from '../../graphql/reactiveVariables/user';

const useStyles = makeStyles((theme) => ({
  fontBold: {
    fontWeight: 700,
  },
  marginBottomSmall: {
    marginBottom: theme.spacing(1),
  },
  marginBottomBig: {
    marginBottom: theme.spacing(4),
  },
  activeBackground: {
    backgroundColor: theme.palette.action.selected,
  },
}));

type TabTypes = 'home' | 'messages' | 'search';

const Dashboard: React.FC = () => {
  const [homeActive, setHomeActive] = useState(true);
  const [messagesActive, setMessagesActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const user = useReactiveVar(userVar);
  const classes = useStyles();

  if (user) {
    const { fullName, userName } = user;

    const setActive = (type: TabTypes) => {
      switch (type) {
        case 'home':
          if (!homeActive) {
            setMessagesActive(false);
            setSearchActive(false);
            setHomeActive(true);
          }
          break;
        case 'messages':
          if (!messagesActive) {
            setMessagesActive(true);
            setSearchActive(false);
            setHomeActive(false);
          }
          break;
        case 'search':
          if (!searchActive) {
            setMessagesActive(false);
            setSearchActive(true);
            setHomeActive(false);
          }
          break;
        default:
          break;
      }
    };

    return (
      <Box>
        <Avatar className={classes.marginBottomSmall} />
        <Typography variant="h5" className={classes.fontBold}>
          {fullName}
        </Typography>
        <Typography
          variant="caption"
          color="textSecondary"
          className={classes.marginBottomBig}
        >
          {userName}
        </Typography>
        <List>
          <ListItem
            button
            selected={homeActive}
            onClick={() => setActive('home')}
          >
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText>Home Feed</ListItemText>
          </ListItem>
          <ListItem
            button
            selected={messagesActive}
            onClick={() => setActive('messages')}
          >
            <ListItemIcon>
              <Message />
            </ListItemIcon>
            <ListItemText>Messages</ListItemText>
          </ListItem>
          <ListItem
            button
            selected={searchActive}
            onClick={() => setActive('search')}
          >
            <ListItemIcon>
              <Search />
            </ListItemIcon>
            <ListItemText>Search</ListItemText>
          </ListItem>
        </List>
        <Button variant="contained" color="primary">
          Write Article
        </Button>
      </Box>
    );
  }

  return null;
};

export default Dashboard;
