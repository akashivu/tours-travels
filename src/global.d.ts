/// <reference types="google.maps" />

import type React from "react";

export {};

declare global {
  interface Window {
    google: typeof google;

    TPWL_CONFIGURATION?: {
      resultsURL?: string;
      [key: string]: unknown;
    };
  }

  namespace JSX {
    interface IntrinsicElements {
      "gmpx-api-loader": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        "solution-channel"?: string;
      };

      "gmpx-place-autocomplete": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        ref?: React.Ref<any>;
      };
    }
  }
}

declare module "swiper/css";