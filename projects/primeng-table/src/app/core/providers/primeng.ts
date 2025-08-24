import Material from '@primeuix/themes/material';
import { providePrimeNG } from 'primeng/config';

export function primeNGProvider() {
  return providePrimeNG({
    theme: {
      preset: Material,
    },
  });
}
