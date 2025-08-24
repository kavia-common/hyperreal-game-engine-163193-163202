import React from 'react';
import { useTheme } from '../../core/theme/ThemeContext';
import { exportProject } from '../../core/services/exportService';

/**
 * Top navigation bar for global actions.
 */
// PUBLIC_INTERFACE
export function TopNav({ user, onSignIn, onSignOut, onToggleTheme, theme }) {
  /** Renders brand, global actions, user control and theme control. */
  const { theme: currentTheme } = useTheme();

  const doExport = async () => {
    const url = await exportProject({ name: 'My Project', time: new Date().toISOString() });
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="topnav">
      <div className="brand">
        <span style={{ width: 10, height: 10, borderRadius: 3, background: 'var(--color-accent)', display: 'inline-block' }} />
        HyperReal Studio
        <span className="badge">Web</span>
      </div>
      <div className="topnav-actions">
        <button className="btn" onClick={doExport}>Export</button>
        <button className="btn">Plugins</button>
        <button className="icon-btn" title="Theme" onClick={onToggleTheme}>
          {currentTheme === 'dark' ? '☀️' : '🌙'}
        </button>
        {user ? (
          <>
            <span className="pill">Signed in as {user.name}</span>
            <button className="btn" onClick={onSignOut}>Sign out</button>
          </>
        ) : (
          <button className="btn primary" onClick={onSignIn}>Sign in</button>
        )}
      </div>
    </div>
  );
}
