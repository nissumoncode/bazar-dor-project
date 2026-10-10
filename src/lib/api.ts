const API_URLS = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

export async function apiFetch(path: string) {
  let lastError: unknown;

  for (const baseURL of API_URLS) {
    try {
      const response = await fetch(`${baseURL}${path}`);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError ?? new Error("দুইটি API-ই কাজ করছে না।");
}
