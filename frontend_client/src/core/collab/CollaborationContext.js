import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

/**
 * CollaborationContext: provides a minimal pub/sub over WebSocket for real-time collaboration.
 * Set REACT_APP_WS_URL via env. If unset, the provider uses a no-op client.
 */
const CollaborationContext = createContext({
  connected: false,
  send: () => {},
  subscribe: () => () => {},
  presence: { peers: [] },
});

// PUBLIC_INTERFACE
export function CollaborationProvider({ children }) {
  /** Manages WS connection and in-memory subscriber list. */
  const wsRef = useRef(null);
  const subsRef = useRef(new Set());
  const [connected, setConnected] = useState(false);
  const [presence, setPresence] = useState({ peers: [] });

  useEffect(() => {
    const url = process.env.REACT_APP_WS_URL;
    if (!url) {
      // eslint-disable-next-line no-console
      console.warn('[Collab] REACT_APP_WS_URL not configured; collaboration disabled');
      return () => {};
    }
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);
    ws.onerror = () => setConnected(false);
    ws.onmessage = (ev) => {
      try {
        const msg = JSON.parse(ev.data);
        if (msg.type === 'presence') setPresence({ peers: msg.peers || [] });
        subsRef.current.forEach((fn) => fn(msg));
      } catch {
        // ignore
      }
    };

    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, []);

  const value = useMemo(() => ({
    connected,
    presence,
    send: (message) => {
      const payload = typeof message === 'string' ? message : JSON.stringify(message);
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) wsRef.current.send(payload);
    },
    subscribe: (fn) => {
      subsRef.current.add(fn);
      return () => subsRef.current.delete(fn);
    }
  }), [connected, presence]);

  return <CollaborationContext.Provider value={value}>{children}</CollaborationContext.Provider>;
}

// PUBLIC_INTERFACE
export function useCollaboration() {
  /** Hook to access real-time collaboration API. */
  return useContext(CollaborationContext);
}
