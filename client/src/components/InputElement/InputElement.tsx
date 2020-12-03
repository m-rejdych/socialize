import { TextField, makeStyles } from '@material-ui/core';
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
  validate: (value: string) => string | undefined;
}

const InputElement: React.FC<Props> = ({ label, ...props }) => {
  const classes = useStyles();
  const [field, { touched, error }] = useField(props);

  return (
    <TextField
      {...field}
      variant="outlined"
      fullWidth
      label={label}
      helperText={!!touched && error}
      error={!!(touched && error)}
      className={classes.field}
    />
  );
};

export default InputElement;
