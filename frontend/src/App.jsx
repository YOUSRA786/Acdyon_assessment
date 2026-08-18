import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { ShowcaseProvider } from './context/ShowcaseStateContext';
import ShowcaseHome from './pages/ShowcaseHome';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <ShowcaseProvider>
          <ShowcaseHome />
        </ShowcaseProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
