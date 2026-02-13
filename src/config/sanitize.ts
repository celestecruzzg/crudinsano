export function sanitizeInput(value: string) {
  return value
    .replace(/<[^>]*>?/gm, "")
    .replace(/[^\wÁÉÍÓÚáéíóúñÑ\s]/gi, "")
    .trim();
}
