import React, { useState } from 'react';

/**
 * PropertiesPanel displays editable parameters for selected item.
 */
// PUBLIC_INTERFACE
export function PropertiesPanel() {
  /** Shows a few property controls as placeholders. */
  const [name, setName] = useState('Untitled');
  const [roughness, setRoughness] = useState(0.5);
  const [metallic, setMetallic] = useState(0.1);

  return (
    <div style={{ display: 'grid', gap: 10 }}>
      <label>
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Name</div>
        <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Roughness: {roughness.toFixed(2)}</div>
        <input type="range" min="0" max="1" step="0.01" value={roughness} onChange={(e) => setRoughness(Number(e.target.value))} />
      </label>
      <label>
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Metallic: {metallic.toFixed(2)}</div>
        <input type="range" min="0" max="1" step="0.01" value={metallic} onChange={(e) => setMetallic(Number(e.target.value))} />
      </label>
      <button className="btn">Apply Material</button>
    </div>
  );
}
