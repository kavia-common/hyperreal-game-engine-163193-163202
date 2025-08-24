const API_BASE = process.env.REACT_APP_API_BASE_URL || '';

/**
 * exportService: handles project export and download.
 */

// PUBLIC_INTERFACE
export async function exportProject(project) {
  /** Returns a downloadable Blob URL representing the exported project zip. */
  try {
    if (!API_BASE) {
      const data = new Blob([JSON.stringify(project, null, 2)], { type: 'application/json' });
      return URL.createObjectURL(data);
    }
    const res = await fetch(`${API_BASE}/export`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project)
    });
    if (!res.ok) throw new Error('Export failed');
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  } catch (e) {
    const data = new Blob([`Export error: ${e.message}`], { type: 'text/plain' });
    return URL.createObjectURL(data);
  }
}
