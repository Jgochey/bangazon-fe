/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/styles/globals.css';
import { AuthProvider } from '../src/utils/context/authContext';
import ViewDirectorBasedOnUserAuthStatus from '../src/utils/ViewDirector';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      {' '}
      {/* gives children components access to user and auth methods */}
      <ViewDirectorBasedOnUserAuthStatus
        // if status is pending === loading
        // if status is logged in === view app
        // if status is logged out === sign in page
        component={Component}
        pageProps={pageProps}
      />
    </AuthProvider>
  );
}

export default MyApp;
