export class FetchError extends Error {
  constructor(public response: Response, message?: string) {
    super(message || `HTTP error! status: ${response.status}`);
    this.name = 'FetchError';
  }
}

export async function fetchJson<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new FetchError(response);
  }

  // response.json() の結果を <T> 型として返す
  return response.json() as Promise<T>;
}
