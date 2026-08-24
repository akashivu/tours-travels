import { useEffect, useRef } from "react";

const RESULTS_DOCUMENT = "/tp-results.html";

// Adjust this if your navbar has a different height
const NAVBAR_HEIGHT = 76;

export default function FlightResultsPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;

    if (!iframe) return;

    // Forward all search parameters to Travelpayouts
    const searchParams = window.location.search;

    iframe.src = `${RESULTS_DOCUMENT}${searchParams}`;
  }, []);

  return (
    <div
      className="flight-results-page"
      style={{
        width: "100%",
        minWidth: 0,
        minHeight: "100vh",
        margin: 0,
        paddingTop: `${NAVBAR_HEIGHT}px`,
        boxSizing: "border-box",
        overflow: "hidden",
        background: "#fff",
      }}
    >
      <iframe
        ref={iframeRef}
        title="Flight search results"
        scrolling="auto"
        style={{
          display: "block",
          width: "100%",
          height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
          minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
          margin: 0,
          padding: 0,
          border: 0,
          outline: "none",
          background: "#fff",
        }}
      />
    </div>
  );
}