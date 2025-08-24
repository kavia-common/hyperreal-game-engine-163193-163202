import React, { useState } from 'react';
import { generate3DAsset } from '../../core/services/aiService';

/**
 * AssetLibrary shows assets and supports AI asset generation.
 */
// PUBLIC_INTERFACE
export function AssetLibrary() {
  /** Displays a simple list of assets and AI generation input. */
  const [prompt, setPrompt] = useState('');
  const [assets, setAssets] = useState([
    { id: 'a1', name: 'Default Cube', type: 'mesh' },
    { id: 'a2', name: 'PBR Material', type: 'material' },
  ]);

  const onGenerate = async () => {
    if (!prompt.trim()) return;
    const newAsset = await generate3DAsset(prompt);
    setAssets((prev) => [newAsset, ...prev]);
    setPrompt('');
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        <input className="input" placeholder="Generate asset (e.g., sci-fi crate)" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        <button className="btn" onClick={onGenerate}>AI</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 6 }}>
        {assets.map((a) => (
          <div key={a.id} className="pill" title={a.type}>
            <span style={{ width: 8, height: 8, background: 'var(--color-accent)', borderRadius: 2 }} />
            {a.name}
          </div>
        ))}
      </div>
    </div>
  );
}
