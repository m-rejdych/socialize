import { TextField, makeStyles, MenuItem } from '@material-ui/core';
import { useField } from 'formik';

const useStyles = makeStyles((theme) => ({
  field: {
    '&:not(:last-child)': {
      marginBottom: theme.spacing(3),
    },
    minHeight: 78,
  },
}));

interface Props {
  name: string;
  type: string;
  label: string;
  validate?: (value: string) => string | undefined;
  isSelect?: boolean;
  items?: { value: string; label: string }[];
}

const InputElement: React.FC<Props> = ({
  label,
  isSelect,
  items,
  ...props
}) => {
  const classes = useStyles();
  const [field, { touched, error }] = useField(props);

  if (isSelect) {
    return (
      <TextField
        {...field}
        select
        fullWidth
        variant="outlined"
        label={label}
        helperText={!!touched && error}
        error={!!(touched && error)}
        className={classes.field}
      >
        {items?.map(({ label, value }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        )) || null}
      </TextField>
    );
  }

  return (
    <TextField
      {...field}
      fullWidth
      type={props.type}
      variant="outlined"
      label={label}
      helperText={!!touched && error}
      error={!!(touched && error)}
      className={classes.field}
    />
  );
};

export default InputElement;
