import React, { useState } from 'react';
import { createDigitalHuman } from '../../core/services/aiService';

/**
 * HumanCreator: photoreal digital human generator.
 */
// PUBLIC_INTERFACE
export function HumanCreator() {
  /** Provides a prompt-based and manual parameter creator for digital humans. */
  const [name, setName] = useState('Alex');
  const [style, setStyle] = useState('Photoreal');
  const [result, setResult] = useState(null);

  const onCreate = async () => {
    const human = await createDigitalHuman({ name, style });
    setResult(human);
  };

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <label>
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Name</div>
        <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Style</div>
        <select className="select" value={style} onChange={(e) => setStyle(e.target.value)}>
          <option>Photoreal</option>
          <option>Stylized</option>
        </select>
      </label>
      <button className="btn primary" onClick={onCreate}>Generate</button>
      {result && <div className="pill">Created: {result.name} ({result.quality})</div>}
    </div>
  );
}
