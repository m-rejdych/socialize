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
import { useHistory } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { Home, Message, Search, Assignment } from '@material-ui/icons';

import { userVar } from '../../graphql/reactiveVariables/user';

const useStyles = makeStyles((theme) => ({
  fontBold: {
    fontWeight: 700,
  },
  marginBottomBig: {
    marginBottom: theme.spacing(4),
  },
  marginRight: {
    marginRight: theme.spacing(2),
  },
  borderRadius: {
    borderRadius: 10,
  },
  cursorPointer: {
    cursor: 'pointer',
  },
}));

type TabTypes = 'home' | 'messages' | 'articles' | 'search';

interface Props {
  homeActive: boolean;
  messagesActive: boolean;
  articlesActive: boolean;
  searchActive: boolean;
  setHomeActive: (isActive: boolean) => void;
  setMessagesActive: (isActive: boolean) => void;
  setArticlesActive: (isActive: boolean) => void;
  setSearchActive: (isActive: boolean) => void;
}

const Dashboard: React.FC<Props> = ({
  homeActive,
  messagesActive,
  articlesActive,
  searchActive,
  setHomeActive,
  setMessagesActive,
  setArticlesActive,
  setSearchActive,
}) => {
  const user = useReactiveVar(userVar);
  const classes = useStyles();
  const history = useHistory();

  if (user) {
    const { fullName, userName } = user;

    const setActive = (type: TabTypes) => {
      switch (type) {
        case 'home':
          if (!homeActive) {
            setMessagesActive(false);
            setSearchActive(false);
            setArticlesActive(false);
            setHomeActive(true);
          }
          break;
        case 'messages':
          if (!messagesActive) {
            setMessagesActive(true);
            setSearchActive(false);
            setArticlesActive(false);
            setHomeActive(false);
          }
          break;
        case 'articles':
          if (!articlesActive) {
            setMessagesActive(false);
            setSearchActive(false);
            setArticlesActive(true);
            setHomeActive(false);
          }
          break;
        case 'search':
          if (!searchActive) {
            setMessagesActive(false);
            setSearchActive(true);
            setArticlesActive(false);
            setHomeActive(false);
          }
          break;
        default:
          break;
      }
    };

    const goToProfile = (id: string): void => {
      history.push(`/profile/${id}`);
    };

    return (
      <Box>
        <Box
          display="flex"
          alignItems="center"
          mb={1}
          className={classes.cursorPointer}
          onClick={() => goToProfile(user.profile.id)}
        >
          <Avatar className={classes.marginRight} />
          <Typography variant="h5" className={classes.fontBold}>
            {fullName}
          </Typography>
        </Box>
        <Typography
          variant="caption"
          color="textSecondary"
          component="div"
          className={classes.marginBottomBig}
        >
          {userName}
        </Typography>
        <List className={classes.marginBottomBig}>
          <ListItem
            button
            selected={homeActive}
            className={classes.borderRadius}
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
            className={classes.borderRadius}
            onClick={() => setActive('messages')}
          >
            <ListItemIcon>
              <Message />
            </ListItemIcon>
            <ListItemText>Messages</ListItemText>
          </ListItem>
          <ListItem
            button
            selected={articlesActive}
            className={classes.borderRadius}
            onClick={() => setActive('articles')}
          >
            <ListItemIcon>
              <Assignment />
            </ListItemIcon>
            <ListItemText>Articles</ListItemText>
          </ListItem>
          <ListItem
            button
            selected={searchActive}
            className={classes.borderRadius}
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
