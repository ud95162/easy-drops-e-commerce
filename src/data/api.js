// Client-side helpers for the POS storefront API (auth + orders).
// Uses a public base URL so it works in the browser; falls back to the
// deployed POS so production needs no configuration.
export const POS_API_BASE =
  process.env.NEXT_PUBLIC_POS_API_URL || 'https://easy-drops-pos.vercel.app';

async function request(path, { method = 'GET', token, body } = {}) {
  const res = await fetch(`${POS_API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  let data = null;
  try {
    data = await res.json();
  } catch {
    /* no body */
  }
  if (!res.ok) {
    throw new Error((data && data.error) || 'Something went wrong. Please try again.');
  }
  return data;
}

export const api = {
  register: (payload) => request('/api/auth/register', { method: 'POST', body: payload }),
  login: (email, password) =>
    request('/api/auth/login', { method: 'POST', body: { email, password } }),
  me: (token) => request('/api/me', { token }),
  updateMe: (token, payload) => request('/api/me', { method: 'PATCH', token, body: payload }),
  createOrder: (token, payload) =>
    request('/api/orders', { method: 'POST', token, body: payload }),
  orders: (token) => request('/api/orders', { token }),
};
