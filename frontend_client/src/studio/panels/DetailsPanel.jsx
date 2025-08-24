import React, { useState } from 'react';

/**
 * DetailsPanel: shows editable properties for the selected actor.
 */
// PUBLIC_INTERFACE
export function DetailsPanel() {
  /** Placeholder editable fields similar to Unreal's Details tab. */
  const [label, setLabel] = useState('SM_Default_Cube');
  const [location, setLocation] = useState({ x: 0, y: 0, z: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [scale, setScale] = useState({ x: 1, y: 1, z: 1 });

  const NumberInput = ({ value, onChange }) => (
    <input className="input" type="number" step="0.1" value={value} onChange={(e) => onChange(Number(e.target.value))} />
  );

  return (
    <div style={{ display: 'grid', gap: 10 }}>
      <label>
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Label</div>
        <input className="input" value={label} onChange={(e) => setLabel(e.target.value)} />
      </label>

      <div className="pill">Transform</div>
      <div style={{ display: 'grid', gap: 8 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr 1fr 1fr', gap: 8, alignItems: 'center' }}>
          <div style={{ color: 'var(--color-text-muted)', fontSize: 12 }}>Location</div>
          <NumberInput value={location.x} onChange={(v) => setLocation({ ...location, x: v })} />
          <NumberInput value={location.y} onChange={(v) => setLocation({ ...location, y: v })} />
          <NumberInput value={location.z} onChange={(v) => setLocation({ ...location, z: v })} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr 1fr 1fr', gap: 8, alignItems: 'center' }}>
          <div style={{ color: 'var(--color-text-muted)', fontSize: 12 }}>Rotation</div>
          <NumberInput value={rotation.x} onChange={(v) => setRotation({ ...rotation, x: v })} />
          <NumberInput value={rotation.y} onChange={(v) => setRotation({ ...rotation, y: v })} />
          <NumberInput value={rotation.z} onChange={(v) => setRotation({ ...rotation, z: v })} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr 1fr 1fr', gap: 8, alignItems: 'center' }}>
          <div style={{ color: 'var(--color-text-muted)', fontSize: 12 }}>Scale</div>
          <NumberInput value={scale.x} onChange={(v) => setScale({ ...scale, x: v })} />
          <NumberInput value={scale.y} onChange={(v) => setScale({ ...scale, y: v })} />
          <NumberInput value={scale.z} onChange={(v) => setScale({ ...scale, z: v })} />
        </div>
      </div>

      <button className="btn">Reset Transform</button>
      <button className="btn">Add Component</button>
    </div>
  );
}
