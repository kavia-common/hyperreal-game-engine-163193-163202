const API_BASE = process.env.REACT_APP_API_BASE_URL || '';

/**
 * aiService: stubs for backend-connected AI features. Replace with real endpoints.
 */

// PUBLIC_INTERFACE
export async function chatWithAssistant(messages) {
  /** Sends messages to AI assistant and returns assistant reply. */
  try {
    if (!API_BASE) {
      return { role: 'assistant', content: 'AI backend not configured. Using local stub. What can I help you build?' };
    }
    const res = await fetch(`${API_BASE}/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages })
    });
    if (!res.ok) throw new Error('AI chat failed');
    return await res.json();
  } catch (e) {
    return { role: 'assistant', content: `Error: ${e.message}` };
  }
}

// PUBLIC_INTERFACE
export async function generatePlugin(brief) {
  /** Generates a plugin from a textual brief. */
  return { id: `plug_${Date.now()}`, name: `Plugin from brief`, manifest: { brief } };
}

// PUBLIC_INTERFACE
export async function generate3DAsset(prompt) {
  /** Generates a 3D asset via AI (placeholder). */
  return { id: `asset_${Date.now()}`, name: 'AI Asset', prompt, type: 'mesh' };
}

// PUBLIC_INTERFACE
export async function createDigitalHuman(params) {
  /** Creates a photorealistic digital human stub. */
  return { id: `human_${Date.now()}`, name: params?.name || 'Digital Human', quality: 'photoreal' };
}
