import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { store } from './store';
import App from './App';
import './index.scss';
import { ItemNotificationsProvider } from './components/utils/ItemNotifications';
import { isEnvBrowser } from './utils/misc';
import { setImagePath } from './store/imagepath';
import { fetchNui } from './utils/fetchNui';

setImagePath('/images');

const root = document.getElementById('root');

if (isEnvBrowser()) {
  root!.style.backgroundImage = 'url("https://files.catbox.moe/00bsru.png")';
  root!.style.backgroundSize = 'cover';
  root!.style.backgroundRepeat = 'no-repeat';
  root!.style.backgroundPosition = 'center';
}

// make defs available globally for simple access inside components
declare global { interface Window { __itemDefs?: Record<string, any> } }

async function boot() {
  try {
    const defs = await fetchNui<Record<string, any>>('getItemDefs'); // waits for client callback
    const normalized: Record<string, any> = {};
    for (const k in defs) normalized[k.toLowerCase()] = defs[k];
    window.__itemDefs = normalized;
  } catch {
    window.__itemDefs = {}; // ok in browser dev
  }

  createRoot(root!).render(
    <React.StrictMode>
      <Provider store={store}>
        <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
          <ItemNotificationsProvider>
            <App />
          </ItemNotificationsProvider>
        </DndProvider>
      </Provider>
    </React.StrictMode>
  );
}

boot();
