import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from 'frontend/src/app';
import { store } from 'frontend/src/store';
import { Provider } from 'react-redux';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

function renderApp() {
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
}

renderApp();