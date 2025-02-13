import { Suspense } from "react";
import ErrorBoundary from "./ErrorBoundary";
import LoadingPage from "../../pages/loadingpage";

const LazyComponent = ({ children }) => {
  return (
    <ErrorBoundary>
      {/* <Suspense fallback={<LoadingPage />}>{children}</Suspense> */}
      {children}
    </ErrorBoundary>
  );
};

export default LazyComponent;
