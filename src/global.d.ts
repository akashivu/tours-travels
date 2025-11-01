/// <reference types="google.maps" />
export {};

declare global {
  interface Window {
    google: typeof google;
  }
}


declare namespace JSX {
  interface IntrinsicElements {
    'gmpx-api-loader': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & { 'solution-channel'?: string };
    'gmpx-place-autocomplete': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & { ref?: React.Ref<any> };
  }
}


declare module "swiper/css";
