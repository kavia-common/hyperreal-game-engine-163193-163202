import React, { useCallback } from 'react';
import { useTheme } from '../core/theme/ThemeContext';
import { useAuth } from '../core/auth/AuthContext';
import { TopNav } from './topnav/TopNav';
import { Panel } from './components/Panel';
import { AssetLibrary } from './panels/AssetLibrary';
import { InspectorPanel } from './panels/InspectorPanel';
import { PropertiesPanel } from './panels/PropertiesPanel';
import { TimelineConsole } from './panels/TimelineConsole';
import { AIAssistant } from './panels/AIAssistant';
import { HumanCreator } from './panels/HumanCreator';
import { MaterialEditor } from './panels/MaterialEditor';
import { Viewport3D } from './workspace/Viewport3D';

/**
 * StudioLayout renders the multi-panel dock-like layout for the editor.
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
      <div className="panel sidebar-left">
        <Panel title="Asset Library">
          <AssetLibrary />
        </Panel>
        <div style={{ height: 10 }} />
        <Panel title="AI Assistant">
          <AIAssistant />
        </Panel>
      </div>
      <div className="panel workspace">
        <div className="workspace-toolbar">
          <span className="pill">Viewport 3D</span>
          <button className="btn">Orbit</button>
          <button className="btn">Pan</button>
          <button className="btn">Select</button>
          <button className="btn">Simulate</button>
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
      <div className="panel sidebar-right">
        <Panel title="Inspector">
          <InspectorPanel />
        </Panel>
        <div style={{ height: 10 }} />
        <Panel title="Properties">
          <PropertiesPanel />
        </Panel>
        <div style={{ height: 10 }} />
        <Panel title="Material Editor">
          <MaterialEditor />
        </Panel>
        <div style={{ height: 10 }} />
        <Panel title="Digital Human Creator">
          <HumanCreator />
        </Panel>
      </div>
      <div className="panel bottom">
        <Panel title="Timeline / Console">
          <TimelineConsole />
        </Panel>
      </div>
    </div>
  );
}
