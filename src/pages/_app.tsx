import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';

import { AuthProvider } from '../contexts/AuthContext';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme='dark'>
      <AuthProvider>
        <Toaster />
        <div>
          <Component {...pageProps} />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
