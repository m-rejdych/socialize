import { Box, Typography, makeStyles, Button } from '@material-ui/core';
import classNames from 'classnames';

import { ReactComponent as DividerSmallSecond } from '../../../assets/Divider-small-2.svg';
import { ReactComponent as DividerSmallThird } from '../../../assets/Divider-small-3.svg';
import { ReactComponent as LineSvg } from '../../../assets/Line.svg';
import { ReactComponent as DotsSvg } from '../../../assets/Dots.svg';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 96,
    fontWeight: 600,
  },
  marginBottom: {
    marginBottom: theme.spacing(4),
  },
  marginBottomBig: {
    marginBottom: theme.spacing(7),
  },
}));

const FifthSection: React.FC = () => {
  const classes = useStyles();

  return (
    <Box
      position="relative"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography className={classNames(classes.title, classes.marginBottom)}>
          Join now
        </Typography>
        <Box clone className={classes.marginBottomBig}>
          <LineSvg />
        </Box>
        <Button
          size="large"
          variant="contained"
          color="secondary"
          className={classes.marginBottomBig}
        >
          CREATE FREE ACCOUNT
        </Button>
        <Typography variant="h5" className={classes.marginBottomBig}>
          or
        </Typography>
        <Button size="large" className={classes.marginBottomBig}>
          LOGIN
        </Button>
        <DotsSvg />
      </Box>
      <Box clone position="absolute" top={-1} left={0}>
        <DividerSmallSecond />
      </Box>
      <Box clone position="absolute" bottom={0} right={0}>
        <DividerSmallThird />
      </Box>
    </Box>
  );
};

export default FifthSection;
