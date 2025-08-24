import React, { useMemo, useState } from 'react';

/**
 * WorldOutliner: lists all actors in the current level with basic hierarchy stubs.
 */
// PUBLIC_INTERFACE
export function WorldOutliner() {
  /** Displays a tree-like list of actors with simple expand/collapse behavior. */
  const [expanded, setExpanded] = useState({ World: true, Lights: true, Props: true });

  const data = useMemo(() => ([
    {
      id: 'root',
      name: 'World',
      children: [
        { id: 'playerStart', name: 'PlayerStart' },
        { id: 'cameraActor', name: 'CameraActor' },
        {
          id: 'lights',
          name: 'Lights',
          children: [
            { id: 'dirLight', name: 'DirectionalLight' },
            { id: 'skyLight', name: 'SkyLight' },
          ]
        },
        {
          id: 'props',
          name: 'Props',
          children: [
            { id: 'cube', name: 'SM_Default_Cube' },
            { id: 'floor', name: 'SM_Floor' },
          ]
        }
      ]
    }
  ]), []);

  const toggle = (name) => setExpanded((e) => ({ ...e, [name]: !e[name] }));

  const Tree = ({ node, depth = 0 }) => {
    const hasChildren = Array.isArray(node.children) && node.children.length > 0;
    const isExpanded = expanded[node.name] ?? true;
    return (
      <div style={{ paddingLeft: depth * 10 }}>
        <div
          className="console-item"
          style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: hasChildren ? 'pointer' : 'default' }}
          onClick={() => hasChildren && toggle(node.name)}
        >
          {hasChildren ? <span style={{ width: 16 }}>{isExpanded ? '▾' : '▸'}</span> : <span style={{ width: 16 }} />}
          <span className="pill" style={{ gap: 6 }}>
            <span style={{ width: 8, height: 8, background: 'var(--color-accent)', borderRadius: 2 }} />
            {node.name}
          </span>
        </div>
        {hasChildren && isExpanded && node.children.map((c) => (
          <Tree key={c.id} node={c} depth={depth + 1} />
        ))}
      </div>
    );
  };

  return (
    <div style={{ overflow: 'auto' }}>
      {data.map((n) => <Tree key={n.id} node={n} />)}
    </div>
  );
}
