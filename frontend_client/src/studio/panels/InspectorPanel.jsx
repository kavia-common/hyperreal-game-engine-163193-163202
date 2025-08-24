import React from 'react';

/**
 * Inspector shows currently selected item summary.
 */
// PUBLIC_INTERFACE
export function InspectorPanel() {
  /** Minimal placeholder for selection inspector. */
  return (
    <div>
      <div className="pill">Selection: None</div>
      <div style={{ height: 10 }} />
      <div style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>
        Select a node or asset to inspect its properties.
      </div>
    </div>
  );
}
