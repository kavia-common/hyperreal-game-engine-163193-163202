import React, { useCallback } from 'react';
import { useTheme } from '../core/theme/ThemeContext';
import { useAuth } from '../core/auth/AuthContext';
import { TopNav } from './topnav/TopNav';
import { Panel } from './components/Panel';
import { Viewport3D } from './workspace/Viewport3D';

// New Unreal-like dock panels
import { PlaceActors } from './panels/PlaceActors';
import { WorldOutliner } from './panels/WorldOutliner';
import { DetailsPanel } from './panels/DetailsPanel';
import { ContentBrowser } from './panels/ContentBrowser';

/**
 * StudioLayout renders the multi-panel dock-like layout for the editor.
 * Updated to mirror Unreal Engine's default level view:
 * - Top toolbar
 * - Left: Place Actors / Modes
 * - Center: large Viewport3D
 * - Right: World Outliner (top) and Details (bottom)
 * - Bottom: Content Browser
 */
export function StudioLayout() {
  const { theme, setTheme } = useTheme();
  const { user, login, logout } = useAuth();

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'auto' ? 'dark' : (theme === 'dark' ? 'light' : 'auto'));
  }, [theme, setTheme]);

  return (
    <div className="studio">
      <TopNav
        user={user}
        onSignIn={() => login('demo@user.dev', 'password')}
        onSignOut={() => logout()}
        onToggleTheme={toggleTheme}
        theme={theme}
      />

      {/* Left: Place Actors */}
      <div className="panel sidebar-left">
        <Panel title="Place Actors / Modes">
          <PlaceActors />
        </Panel>
      </div>

      {/* Center: Viewport */}
      <div className="panel workspace">
        <div className="workspace-toolbar">
          <span className="pill">Viewport 3D</span>
          <button className="btn">Select</button>
          <button className="btn">Translate</button>
          <button className="btn">Rotate</button>
          <button className="btn">Scale</button>
          <div style={{ flex: 1 }} />
          <select className="select" aria-label="Render mode">
            <option>Nanites</option>
            <option>Lumen</option>
            <option>Volumetric</option>
            <option>Niagara VFX</option>
            <option>Virtual Shadows</option>
            <option>TSR</option>
          </select>
        </div>
        <div className="workspace-canvas">
          <Viewport3D />
        </div>
      </div>

      {/* Right: World Outliner + Details */}
      <div className="panel sidebar-right" style={{ display: 'grid', gridTemplateRows: '1fr 10px 1fr' }}>
        <div className="panel" style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <Panel title="World Outliner">
            <WorldOutliner />
          </Panel>
        </div>
        <div />
        <div className="panel" style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <Panel title="Details">
            <DetailsPanel />
          </Panel>
        </div>
      </div>

      {/* Bottom: Content Browser */}
      <div className="panel bottom" style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <Panel title="Content Browser">
          <ContentBrowser />
        </Panel>
      </div>
    </div>
  );
}
