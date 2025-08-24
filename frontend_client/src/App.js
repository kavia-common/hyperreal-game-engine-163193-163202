import React from 'react';
import './App.css';
import './index.css';
import { ThemeProvider } from './core/theme/ThemeContext';
import { AuthProvider } from './core/auth/AuthContext';
import { CollaborationProvider } from './core/collab/CollaborationContext';
import { StudioLayout } from './studio/StudioLayout';
import { RouterProvider } from './core/router/RouterProvider';

/**
 * Root application component wiring providers and the studio layout.
 * The app uses a multi-panel studio layout inspired by Unreal/Figma/Blender.
 */
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CollaborationProvider>
          <RouterProvider>
            <StudioLayout />
          </RouterProvider>
        </CollaborationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
