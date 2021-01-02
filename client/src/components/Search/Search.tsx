import { useState } from 'react';
import { TextField, makeStyles, Paper } from '@material-ui/core';

import UsersList from '../UsersList';
import { useProfilesQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    maxHeight: '40vh',
  },
  bgColor: {
    backgroundColor: '#FAFAFA',
  },
  fullWidth: {
    width: '100%',
  },
}));

const Search: React.FC = () => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { data } = useProfilesQuery();
  const classes = useStyles();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const handleFocus = (): void => {
    setIsFocused(true);
  };

  const handleBlur = (): void => {
    setIsFocused(false);
  };

  const filteredProfiles =
    data?.profiles.filter(({ user: { fullName } }) =>
      fullName.toLowerCase().includes(value.toLowerCase()),
    ) || [];

  return (
    <Paper
      className={isFocused ? classes.paper : undefined}
      elevation={isFocused ? 3 : 0}
    >
      <TextField
        fullWidth
        variant="outlined"
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Search user"
        InputProps={{ className: classes.bgColor }}
      />
      {isFocused && filteredProfiles.length > 0 && value.length > 0 && (
        <UsersList users={filteredProfiles} goToProfile />
      )}
    </Paper>
  );
};

export default Search;
