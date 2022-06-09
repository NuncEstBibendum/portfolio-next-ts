import { useMediaQuery } from 'react-responsive';

import { breakpoints } from '@/constants/breakpoints';

export const useTabletAndMobile = () =>
  useMediaQuery({ maxWidth: breakpoints.tablet });
