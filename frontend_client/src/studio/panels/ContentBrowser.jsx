import React, { useState } from 'react';

/**
 * ContentBrowser: bottom dock with folders and assets like Unreal's Content Browser.
 */
// PUBLIC_INTERFACE
export function ContentBrowser() {
  /** Displays a simple path bar, search, and grid list of assets. */
  const [path] = useState('/Game');
  const [query, setQuery] = useState('');
  const [assets] = useState([
    { id: 'a1', name: 'SM_Default_Cube', type: 'StaticMesh' },
    { id: 'a2', name: 'M_Default', type: 'Material' },
    { id: 'a3', name: 'BP_Character', type: 'Blueprint' },
    { id: 'a4', name: 'T_Noise', type: 'Texture2D' },
  ]);

  const filtered = assets.filter(a => a.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr', height: '100%' }}>
      <div className="workspace-toolbar" style={{ borderBottom: 'var(--panel-border)' }}>
        <span className="pill">Path: {path}</span>
        <div style={{ flex: 1 }} />
        <input className="input" placeholder="Search Content" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button className="btn">Add</button>
        <button className="btn">Import</button>
      </div>
      <div className="panel-content" style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
        {filtered.map((a) => (
          <div key={a.id} className="panel" style={{ borderRadius: 'var(--radius-sm)' }}>
            <div className="panel-header">
              <div className="panel-title">{a.type}</div>
              <div className="pill">Asset</div>
            </div>
            <div className="panel-content">
              <div style={{ height: 80, background: 'linear-gradient(135deg, #1b1d22, #0f1215)', borderRadius: 6, marginBottom: 8 }} />
              <div style={{ fontSize: 13 }}>{a.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
