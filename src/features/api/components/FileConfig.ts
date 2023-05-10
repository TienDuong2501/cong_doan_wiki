import png from '../../../assets/images_default_icons/png.png';
import jpg from '../../../assets/images_default_icons/jpg.png';
import svg from '../../../assets/images_default_icons/svg.png';
import defaultImage from '../../../assets/images_default_icons/default.png';
import jpeg from '../../../assets/images_default_icons/jpeg.png';

export const ImageConfig: {
  png: string;
  jpg: string;
  svg: string;
  default: string;
  jpeg: string;
  'svg+xml': string;
  'application/x-yaml': string;
} = {
  png,
  jpg,
  svg,
  'svg+xml': svg,
  'application/x-yaml': svg,
  default: defaultImage,
  jpeg,
};
