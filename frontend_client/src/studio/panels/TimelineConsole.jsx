import React, { useState } from 'react';

/**
 * TimelineConsole: combined timeline scrubber and console log.
 */
// PUBLIC_INTERFACE
export function TimelineConsole() {
  /** Provides a timeline slider and logs list. */
  const [time, setTime] = useState(0);
  const [logs] = useState([
    { id: 1, level: 'info', text: 'Engine initialized (Lumen ON, Nanites ON)' },
    { id: 2, level: 'success', text: 'Plugin loaded: Niagara VFX Pack' },
    { id: 3, level: 'error', text: 'Warning: Missing HDRI for skybox (using default)' },
  ]);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <button className="btn">Play</button>
        <button className="btn">Pause</button>
        <button className="btn">Stop</button>
        <input type="range" min="0" max="100" value={time} onChange={(e) => setTime(Number(e.target.value))} />
        <div className="pill">t={time}s</div>
      </div>
      <div className="console-list">
        {logs.map((l) => (
          <div key={l.id} className={`console-item ${l.level}`}>{l.text}</div>
        ))}
      </div>
    </div>
  );
}
