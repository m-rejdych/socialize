import { useHistory } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  borderRadius: {
    borderRadius: 10,
  },
}));

interface Profile {
  id: string;
  user: {
    fullName: string;
  };
}

interface Props {
  users: Profile[];
  className?: string;
  goToProfile?: boolean;
}

const UsersList: React.FC<Props> = ({ users, className, goToProfile }) => {
  const history = useHistory();
  const classes = useStyles();

  const handleClick = (id: string): void => {
    if (goToProfile) {
      history.push(`/profile/${id}`);
    }
  };

  return (
    <List className={className}>
      {users.map(({ id, user: { fullName } }) => (
        <ListItem
          key={id}
          button
          className={classes.borderRadius}
          onMouseDown={(e): void => e.preventDefault()}
          onClick={(): void => handleClick(id)}
        >
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText>{fullName}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default UsersList;
