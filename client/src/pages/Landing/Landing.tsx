import { Box } from '@material-ui/core';

import FirstSection from './FirstSection';
import SecondSection from './SecondSection';
import ThirdSection from './ThirdSection';
import FourthSection from './FourthSection';
import FifthSection from './FifthSection';

const Landing: React.FC = () => {
  return (
    <Box>
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <FifthSection />
    </Box>
  );
};

export default Landing;
