"use client";

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type ModalProps = {
    open: boolean;
    onClose: () => void;
    title?: string;
    titleClass?: string;
    children?: React.ReactNode;
    size?: "sm" | "md" | "lg" | "xl" | number;
    closeOnBackdropClick?: boolean;
    showCloseButton?: boolean;
    initialFocusRef?: React.RefObject<HTMLElement>;
    ariaLabel?: string;
};

function Portal({ children }: { children: React.ReactNode }) {
    const mount = useRef<Element | null>(null);
    const [isClient, setIsClient] = React.useState(false);

    useEffect(() => {
        setIsClient(true);
        mount.current = document.body;
    }, []);

    if (!isClient || !mount.current) return null;
    return createPortal(children, mount.current);
}

export default function Modal({
    open,
    onClose,
    title,
    children,
    size = "md",
    closeOnBackdropClick = true,
    showCloseButton = true,
    initialFocusRef,
    ariaLabel,
}: ModalProps) {
    const panelRef = useRef<HTMLDivElement | null>(null);
    const prevFocused = useRef<HTMLElement | null>(null);

    const maxWidth =
        typeof size === "number"
            ? `${size}px`
            : size === "sm"
                ? "24rem"
                : size === "lg"
                    ? "48rem"
                    : size === "xl"
                        ? "64rem"
                        : "36rem";

    useEffect(() => {
        if (open) {
            prevFocused.current = document.activeElement as HTMLElement;
            // const prevOverflow = document.body.style.overflow;
            // document.body.style.overflow = "hidden";

            const toFocus =
                (initialFocusRef && initialFocusRef.current) ||
                panelRef.current?.querySelector<HTMLElement>(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                ) ||
                panelRef.current;

            toFocus?.focus();

            return () => {
                // document.body.style.overflow = prevOverflow;
                prevFocused.current?.focus?.();
            };
        }
    }, [open, initialFocusRef]);

    useEffect(() => {
        if (!open) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [open, onClose]);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (!closeOnBackdropClick) return;
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <AnimatePresence>
            {open && (
                <Portal>
                    <motion.div
                        className="fixed inset-0 z-1000 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                        onMouseDown={handleBackdropClick}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            aria-label={ariaLabel || title || "Modal"}
                            ref={panelRef}
                            tabIndex={-1}
                            className="relative w-[90%] max-h-[90vh] overflow-y-auto bg-[#F6F6F6] shadow-2xl focus:outline-none rounded-lg"
                            style={{ maxWidth }}
                            initial={{ y: 20, opacity: 0, scale: 0.97 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 10, opacity: 0, scale: 0.97 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        >
                            {/* Header */}
                            {(title || showCloseButton) && (
                                <div className="flex items-center justify-end p-5">
                                    {showCloseButton && (
                                        <button
                                            onClick={onClose}
                                            className="rounded-md p-1 text-gray-300 hover:bg-[#6ba9c4]/10 hover:text-[#6ba9c4]/50 focus:outline-none transition-all cursor-pointer z-999"
                                            aria-label="Cerrar"
                                        >
                                            <X size={18} />
                                        </button>
                                    )}
                                </div>
                            )}

                            {/* Body */}
                            <div className="py-6 px-8 xl:px-12 -mt-18">{children}</div>
                        </motion.div>
                    </motion.div>
                </Portal>
            )}
        </AnimatePresence>
    );
}