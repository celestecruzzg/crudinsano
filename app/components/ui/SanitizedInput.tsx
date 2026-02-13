'use client';
import * as React from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";

function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (value: T) => refs.forEach(ref => {
    if (!ref) return;
    if (typeof ref === 'function') ref(value);
    else (ref as React.MutableRefObject<T | null>).current = value;
  });
}

type Props<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  sanitize: (v: string) => string;
  disallow: RegExp; // si hace match -> se bloquea
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "value" | "onChange" | "defaultValue">;

export function SanitizedInput<TFieldValues extends FieldValues>({
  control, name, sanitize, disallow, ...rest
}: Props<TFieldValues>) {
  const nativeRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    const el = nativeRef.current;
    if (!el) return;

    const beforeInputHandler = (ev: InputEvent) => {
      const d = (ev as unknown as InputEvent).data;
      if (d && disallow.test(d)) ev.preventDefault();
    };
    const keydownHandler = (ev: KeyboardEvent) => {
      if (typeof ev.key === "string" && disallow.test(ev.key)) ev.preventDefault();
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
        el.dispatchEvent(new Event("input", { bubbles: true }));
      }
    };

    el.addEventListener("beforeinput", beforeInputHandler as EventListener, { capture: true });
    el.addEventListener("keydown", keydownHandler as EventListener, { capture: true });
    el.addEventListener("paste", pasteHandler as EventListener, { capture: true });

    return () => {
      el.removeEventListener("beforeinput", beforeInputHandler as EventListener);
      el.removeEventListener("keydown", keydownHandler as EventListener);
      el.removeEventListener("paste", pasteHandler as EventListener);
    };
  }, [disallow, sanitize]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <input
          {...rest}
          ref={mergeRefs(field.ref, nativeRef)}
          value={field.value ?? ""}
          onChange={(e) => {
            const clean = sanitize(e.currentTarget.value);
            if (clean !== e.currentTarget.value) {
              const el = nativeRef.current;
              if (el) el.value = clean;
            }
            field.onChange(clean);
          }}
          onBlur={field.onBlur}
        />
      )}
    />
  );
}
