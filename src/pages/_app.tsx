import '../styles/globals.css';

import { makeServer } from '../services/mirage';

import { AuthProvider } from '../contexts/AuthContext';
import { Toaster } from 'react-hot-toast';

if (process.env.NODE_ENV === 'development') {
  makeServer({ environment: 'development' });
}

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Toaster />
      <div className="bg-neutral">
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}

export default MyApp;
