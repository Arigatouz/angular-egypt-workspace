import Material from '@primeuix/themes/material';
import { PrimeNGConfigType, providePrimeNG } from 'primeng/config';

export const primeNGProvider = (features?: PrimeNGConfigType) => {
  return providePrimeNG({
    theme: {
      preset: Material,
    },
    ...features,
  });
};
