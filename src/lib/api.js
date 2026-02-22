const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");

const getUrl = (path) => {
  if (!path.startsWith("/")) return `${apiBaseUrl}/${path}`;
  return `${apiBaseUrl}${path}`;
};

export const apiRequest = async (path, options = {}) => {
  const response = await fetch(getUrl(path), options);
  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");

  let data = null;
  if (isJson) {
    data = await response.json();
  } else {
    const text = await response.text();
    if (!response.ok) {
      throw new Error(`API returned non-JSON response (${response.status}).`);
    }
    throw new Error(text || "API returned non-JSON response.");
  }

  if (!response.ok) {
    throw new Error(data?.error || `Request failed with ${response.status}.`);
  }

  return data;
};
