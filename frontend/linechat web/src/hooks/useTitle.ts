import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function useTitle() {
  const location = useLocation();

  useEffect(() => {
    document.title = getTitleFromPathname(location.pathname) || 'LineChat';
  }
    , [location]);
}

function getTitleFromPathname(pathname: string) {
  const cleanedPathname = pathname.replace(/^\/|\/$/g, '');

  // Split the pathname into separate segments based on slashes
  const pathSegments = cleanedPathname.split('/');

  // Check if the pathSegments array is not empty
  if (pathSegments.length > 0) {
    // Get the last segment of the pathname as the page title
    const pageTitle = pathSegments[pathSegments.length - 1];
    // Capitalize the first letter of the page title
    const capitalizedTitle = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);

    return capitalizedTitle + ' | LineChat';
  }

}
  export default useTitle;