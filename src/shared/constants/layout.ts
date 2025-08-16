export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
} as const;

export const CONTAINER = {
  MAX_WIDTH: 1400,
  PADDING: {
    MOBILE: 'p-4',
    SM: 'sm:p-6',
    MD: 'md:p-8',
    LG: 'lg:p-12',
    XL: 'xl:p-16',
  },
} as const;

export const ICON_SIZES = {
  SM: 'w-8 h-8',
  MD: 'md:w-10 md:h-10',
  LG: 'lg:w-12 lg:h-12',
} as const;

export const PROFILE_SIZES = {
  MOBILE: 'w-[120px] h-[120px]',
  SM: 'sm:w-[140px] sm:h-[140px]',
  MD: 'md:w-[160px] md:h-[160px]',
  LG: 'lg:w-[200px] lg:h-[200px]',
  XL: 'xl:w-[240px] xl:h-[240px]',
} as const;
