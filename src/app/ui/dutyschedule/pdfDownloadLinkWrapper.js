import { forwardRef } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";

const PDFDownloadLinkWrapper = forwardRef(({ document, fileName }, ref) => (
  <PDFDownloadLink document={document} fileName={fileName}>
    {({ blob, url, loading, error }) =>
      loading ? (
        <button disabled>Loading document...</button>
      ) : (
        <button ref={ref} style={{ display: "none" }}>
          Download now!
        </button>
      )
    }
  </PDFDownloadLink>
));

PDFDownloadLinkWrapper.displayName = "PDFDownloadLinkWrapper";

export default PDFDownloadLinkWrapper;
