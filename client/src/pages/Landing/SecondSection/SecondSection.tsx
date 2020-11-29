import { Container, makeStyles, Box, Typography } from '@material-ui/core';

import { ReactComponent as DividerBigSecond } from '../../../assets/Divider-big-2.svg';
import { ReactComponent as DividerSmallFirst } from '../../../assets/Divider-small-1.svg';
import { ReactComponent as ProfileSvg } from '../../../assets/Profile.svg';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    position: 'relative',
  },
  watermark: {
    fontSize: 350,
    fontWeight: 500,
    letterSpacing: '15%',
    color: 'rgba(245, 0, 87, 0.05)',
    zIndex: -2,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  title: {
    paddingBottom: theme.spacing(1),
    fontWeight: 500,
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      left: theme.spacing(-1.5),
      top: theme.spacing(-1),
      height: '100%',
      width: 180,
      backgroundColor: theme.palette.secondary.main,
      zIndex: -1,
    },
  },
}));

const SecondSection: React.FC = () => {
  const classes = useStyles();

  return (
    <Box position="relative" height="100vh" zIndex={-1}>
      <Container className={classes.container}>
        <Box
          position="absolute"
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          width="100%"
          left={0}
          bottom={120}
        >
          <Box pt={3}>
            <Typography variant="h3" className={classes.title}>
              Create unique profile
            </Typography>
            <Typography variant="h5">That you're gonna be proud of</Typography>
          </Box>
          <ProfileSvg />
        </Box>
      </Container>
      <Box clone position="absolute" top={-1} right={0} zIndex={-1}>
        <DividerBigSecond />
      </Box>
      <Typography className={classes.watermark}>Profile</Typography>
      <Box clone position="absolute" left={0} bottom={-1} zIndex={-1}>
        <DividerSmallFirst />
      </Box>
    </Box>
  );
};

export default SecondSection;
