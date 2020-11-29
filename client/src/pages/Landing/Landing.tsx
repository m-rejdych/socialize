import { Box } from '@material-ui/core';

import FirstSection from './FirstSection';
import SecondSection from './SecondSection';
import ThirdSection from './ThirdSection';

const Landing: React.FC = () => {
  return (
    <Box>
      <FirstSection />
      <SecondSection />
      <ThirdSection />
    </Box>
  );
};

export default Landing;
