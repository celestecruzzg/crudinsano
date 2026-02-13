let requests = 0;
let lastReset = Date.now();

export function canMakeRequest(limit = 5, windowMs = 60000) {
  const now = Date.now();

  if (now - lastReset > windowMs) {
    requests = 0;
    lastReset = now;
  }

  if (requests >= limit) return false;

  requests++;
  return true;
}
