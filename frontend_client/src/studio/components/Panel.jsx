import React from 'react';

/**
 * A generic panel with header and content slots.
 */
// PUBLIC_INTERFACE
export function Panel({ title, actions, children }) {
  /** Renders a titled panel with optional actions area. */
  return (
    <>
      <div className="panel-header">
        <div className="panel-title">{title}</div>
        <div>{actions}</div>
      </div>
      <div className="panel-content">{children}</div>
    </>
  );
}
