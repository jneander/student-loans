import { makeTheme, registerTheme } from 'instructure-ui/lib/themeable/registry';
import borders from 'js/theme/borders';
import breakpoints from 'js/theme/breakpoints';
import colors from 'js/theme/colors';
import forms from 'js/theme/forms';
import media from 'js/theme/media';
import shadows from 'js/theme/shadows';
import spacing from 'js/theme/spacing';
import stacking from 'js/theme/stacking';
import typography from 'js/theme/typography';

const variables = {
  borders,
  colors,
  typography,
  spacing,
  forms,
  media,
  breakpoints,
  shadows,
  stacking
};

const brandVariables = {
  'ic-brand-button--primary-bgd': colors.brand,
  'ic-brand-button--primary-text': colors.white,
  'ic-brand-button--secondary-bgd': colors.licorice,
  'ic-brand-button--secondary-text': colors.white,
  'ic-brand-font-color-dark': colors.licorice,
  'ic-brand-primary': colors.brand,
  'ic-link-color': colors.brand
};

const theme = {
  key: 'studentLoans',
  variables
};

registerTheme({
  key: 'studentLoans',
  variables: {
    ...variables,
    ...brandVariables
  }
});

// export const studentLoans = makeTheme({ theme });
