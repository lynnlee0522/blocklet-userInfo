import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import App from './app';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>
);
