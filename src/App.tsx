import React from 'react';
import { AppProvider } from './context/context';

function App() {
  return (
    <AppProvider>
      <div>Hello</div>
    </AppProvider>
  );
}

export default App;
