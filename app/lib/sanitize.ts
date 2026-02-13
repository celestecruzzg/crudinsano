// allow-lists / disallow (para bloqueo)
export const DISALLOWED_NAME = /[^A-Za-zÀ-ÿ\u00f1\u00d1' -]/;
export const DISALLOWED_EMAIL = /[^A-Za-z0-9@._+\-]/; // < y > quedan bloqueados
export const DISALLOWED_PASSWORD = /[<>\u0000-\u001F\u007F]/;

const NAME_BAD_G = /[^A-Za-zÀ-ÿ\u00f1\u00d1' -]/g;
const EMAIL_BAD_G = /[^A-Za-z0-9@._+\-]/g;
const PASS_BAD_G = /[<>\u0000-\u001F\u007F]/g;

export const stripControl = (v: string) => v.replace(/\p{C}/gu, "");
export const normalizeSpaces = (v: string) => v.replace(/\s+/g, " ").trim();
export const stripTags = (v: string) => v.replace(/<[^>]*>/g, "").replace(/&[a-z]+;/gi, "");

export const sanitizeName = (v: string) => normalizeSpaces(stripTags(stripControl(v)).replace(NAME_BAD_G, ""));
export const sanitizeEmail = (v: string) =>
  stripTags(stripControl(v)).replace(EMAIL_BAD_G, "").replace(/\s+/g, "").replace(/\.{2,}/g, ".").toLowerCase();
export const sanitizePassword = (v: string) => stripControl(v).replace(PASS_BAD_G, "");

type Sanitizer = (v: string) => string;

// Para limpiar listeners si React reutiliza el nodo
const __guardsCleanup = new WeakMap<HTMLInputElement, () => void>();

export function attachGuards(
  el: HTMLInputElement | null,
  sanitize: Sanitizer,
  disallow: RegExp
) {
  if (!el) return;

  // Desmonta listeners previos si existían
  __guardsCleanup.get(el)?.();

  const beforeInputHandler = (ev: InputEvent) => {
    // data = texto que se intenta insertar
    const d = (ev as unknown as InputEvent).data;
    if (d && disallow.test(d)) {
      ev.preventDefault();
    }
  };

  const keydownHandler = (ev: KeyboardEvent) => {
    if (typeof ev.key === "string" && disallow.test(ev.key)) {
      ev.preventDefault();
    }
  };

  const pasteHandler = (ev: ClipboardEvent) => {
    const txt = ev.clipboardData?.getData("text") ?? "";
    if (disallow.test(txt)) {
      ev.preventDefault();
      const clean = sanitize(txt);
      const start = el.selectionStart ?? el.value.length;
      const end = el.selectionEnd ?? el.value.length;
      el.value = el.value.slice(0, start) + clean + el.value.slice(end);
      const pos = start + clean.length;
      requestAnimationFrame(() => el.setSelectionRange(pos, pos));
      // Notifica a React/RHF
      el.dispatchEvent(new Event("input", { bubbles: true }));
    }
  };

  el.addEventListener("beforeinput", beforeInputHandler as EventListener, { capture: true });
  el.addEventListener("keydown", keydownHandler as EventListener, { capture: true });
  el.addEventListener("paste", pasteHandler as EventListener, { capture: true });

  const cleanup = () => {
    el.removeEventListener("beforeinput", beforeInputHandler as EventListener);
    el.removeEventListener("keydown", keydownHandler as EventListener);
    el.removeEventListener("paste", pasteHandler as EventListener);
  };

  __guardsCleanup.set(el, cleanup);
}