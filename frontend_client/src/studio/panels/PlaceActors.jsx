import React from 'react';

/**
 * PlaceActors: left modes/placement panel similar to Unreal's Place Actors.
 */
// PUBLIC_INTERFACE
export function PlaceActors() {
  /** Shows categories of placeable items (stubs). */
  const sections = [
    { title: 'Modes', items: ['Select', 'Landscape', 'Foliage', 'Brush Editing'] },
    { title: 'Place Actors', items: ['Empty Actor', 'Point Light', 'Camera', 'Player Start', 'Sphere', 'Cube'] },
    { title: 'Visual Effects', items: ['Niagara System', 'Post Process Volume', 'Fog'] },
  ];

  return (
    <div style={{ display: 'grid', gap: 10 }}>
      {sections.map((s) => (
        <div key={s.title}>
          <div className="panel-title" style={{ marginBottom: 6 }}>{s.title}</div>
          <div style={{ display: 'grid', gap: 6 }}>
            {s.items.map((it) => (
              <div key={it} className="pill" style={{ justifyContent: 'space-between' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 8, height: 8, background: 'var(--color-accent)', borderRadius: 2 }} />
                  {it}
                </span>
                <button className="icon-btn" title="Place">＋</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
