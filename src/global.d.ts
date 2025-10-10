declare namespace JSX {
  interface IntrinsicElements {
    'gmpx-api-loader': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      key?: string;
      'solution-channel'?: string;
    };
    'gmpx-place-autocomplete': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      ref?: React.Ref<any>;
    };
  }
}
declare module "swiper/css";
