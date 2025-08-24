const registry = [];

/**
 * pluginRegistry: in-memory plugin registry. Swap with persisted store later.
 */

// PUBLIC_INTERFACE
export function registerPlugin(plugin) {
  /** Registers a plugin descriptor. */
  registry.push(plugin);
  return plugin;
}

// PUBLIC_INTERFACE
export function listPlugins() {
  /** Returns all registered plugins. */
  return [...registry];
}
