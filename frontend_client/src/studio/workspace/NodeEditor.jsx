import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useCollaboration } from '../../core/collab/CollaborationContext';

/**
 * NodeEditor: minimal node graph placeholder with drag and real-time broadcast.
 */
// PUBLIC_INTERFACE
export function NodeEditor() {
  /** Minimal canvas with draggable nodes and simple background grid. */
  const { send, subscribe, connected } = useCollaboration();
  const [nodes, setNodes] = useState([
    { id: 'n1', x: 120, y: 80, title: 'Start' },
    { id: 'n2', x: 380, y: 160, title: 'Spawn Niagara' },
  ]);
  const dragRef = useRef({ id: null, dx: 0, dy: 0 });

  useEffect(() => {
    return subscribe((msg) => {
      if (msg.type === 'node-move' && msg.payload) {
        setNodes((prev) => prev.map(n => n.id === msg.payload.id ? { ...n, x: msg.payload.x, y: msg.payload.y } : n));
      }
    });
  }, [subscribe]);

  const onMouseDown = (e, id) => {
    const rect = e.currentTarget.parentElement.getBoundingClientRect();
    const node = nodes.find(n => n.id === id);
    dragRef.current = { id, dx: e.clientX - rect.left - node.x, dy: e.clientY - rect.top - node.y };
  };

  const onMouseMove = useCallback((e) => {
    if (!dragRef.current.id) return;
    const canvas = e.currentTarget.getBoundingClientRect();
    const id = dragRef.current.id;
    const x = e.clientX - canvas.left - dragRef.current.dx;
    const y = e.clientY - canvas.top - dragRef.current.dy;
    setNodes((prev) => prev.map(n => n.id === id ? { ...n, x, y } : n));
    if (connected) send({ type: 'node-move', payload: { id, x, y } });
  }, [connected, send]);

  const onMouseUp = () => { dragRef.current = { id: null, dx: 0, dy: 0 }; };

  return (
    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(#2a2d31 1px, transparent 1px)', backgroundSize: '16px 16px' }} onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
      {nodes.map((n) => (
        <div key={n.id} className="node" style={{ left: n.x, top: n.y }}>
          <div className="node-header">
            <span>{n.title}</span>
            <button className="icon-btn" onMouseDown={(e) => onMouseDown(e, n.id)} title="Drag">⠿</button>
          </div>
          <div className="node-body">
            <div className="pill">Inputs: 1</div>
            <div className="pill">Outputs: 1</div>
          </div>
        </div>
      ))}
    </div>
  );
}
