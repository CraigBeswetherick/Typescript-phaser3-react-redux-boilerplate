'use-strict';

import { createMuiTheme } from '@material-ui/core/styles';
import Typography from './Typography';
import Button from './Button';

const Theme = createMuiTheme({
  overrides: {
    MuiTypography: Typography,
    MuiButton: Button,
  },
});

export default Theme;
