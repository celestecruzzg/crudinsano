import { toast } from "react-hot-toast";
import { AlertTriangle } from "lucide-react";

export function warningToast(message: string) {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } pointer-events-auto flex w-full max-w-sm rounded-lg bg-white shadow-lg`}
    >
      <div className="flex w-0 flex-1 items-center p-3">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-base text-gray-900">{message}</p>
        </div>
      </div>
    </div>
  ));
}
