import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '@arcblock/ux/lib/ErrorBoundary';
import i18n from './i18n';
import App from './app';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </ErrorBoundary>
);
