import '../styles/globals.css';

import { makeServer } from '../services/mirage';

import { AuthProvider } from '../contexts/AuthContext';
import { Toaster } from 'react-hot-toast';

makeServer()

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Toaster />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
