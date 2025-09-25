export {};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "gmpx-place-autocomplete": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        "api-key"?: string;
        "country-code"?: string;
        "place-attribution-src"?: string;
        placeholder?: string;
        style?: React.CSSProperties;
        className?: string;
      };

      "gmpx-api-loader": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        key?: string;
        "solution-channel"?: string;
        libraries?: string;
        style?: React.CSSProperties;
        className?: string;
      };
    }
  }
}
