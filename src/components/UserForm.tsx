"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { UserPlus, User, ChevronDown, Save, X } from "lucide-react";
import { api } from "@/lib/api";
import { sanitizeInput } from "@/config/sanitize";
import { canMakeRequest } from "@/config/rateLimiter";
import { useEffect } from "react";
import { User as UserType } from "@/types";

const schema = z.object({
  nombre: z
    .string()
    .min(2, "Mínimo 2 caracteres")
    .regex(/^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/, "Solo letras permitidas"),
  sexo: z.enum(["masculino", "femenino"], { message: "Selecciona una opción" }),
});

type FormData = z.infer<typeof schema>;

interface UserFormProps {
  onSuccess: () => void;
  userToEdit?: UserType | null;
  onCancel?: () => void;
}

export default function UserForm({ onSuccess, userToEdit, onCancel }: UserFormProps) {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nombre: "",
      sexo: "masculino" // Valor por defecto seguro, aunque el select tiene placeholder
    }
  });

  // Efecto para llenar el formulario cuando se edita un usuario
  useEffect(() => {
    if (userToEdit) {
      setValue("nombre", userToEdit.nombre);
      // Aseguramos que el valor coincida con el enum esperado
      if (userToEdit.sexo === "masculino" || userToEdit.sexo === "femenino") {
        setValue("sexo", userToEdit.sexo as "masculino" | "femenino");
      }
    } else {
      reset({ nombre: "", sexo: undefined });
    }
  }, [userToEdit, setValue, reset]);

  const onSubmit = async (data: FormData) => {
    if (!canMakeRequest()) {
      toast.error("Demasiadas peticiones. Espera un momento.");
      return;
    }
    try {
      const cleanData = { nombre: sanitizeInput(data.nombre), sexo: data.sexo };

      if (userToEdit) {
        await api.put(`/users/${userToEdit.id}`, cleanData);
        toast.success("¡Usuario actualizado correctamente!");
      } else {
        await api.post("/users", cleanData);
        toast.success("¡Usuario creado con éxito!");
      }

      reset();
      onSuccess();
    } catch (error) {
      toast.error(userToEdit ? "Error al actualizar usuario" : "Error al crear usuario");
      console.error(error);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl w-full shadow-xl border border-white/20 space-y-5 relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      layout
    >
      {userToEdit && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-blue-50 text-blue-700 text-sm py-2 px-4 rounded-lg flex justify-between items-center mb-4"
        >
          <span className="font-medium">Editando a: {userToEdit.nombre}</span>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="p-1 hover:bg-blue-100 rounded-full transition-colors cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
        </motion.div>
      )}

      <div className="space-y-1">
        <label className="text-sm font-semibold text-gray-700 ml-1">Nombre completo</label>
        <div className="relative">
          <User className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            {...register("nombre")}
            placeholder="Ej. Asuna Yuuki"
            className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-xl outline-none transition-all focus:ring-2 ${errors.nombre ? "border-red-400 focus:ring-red-100" : "border-gray-200 focus:border-[#6ba9c4] focus:ring-[#6ba9c4]"
              }`}
          />
        </div>
        {errors.nombre && <p className="text-red-500 text-xs mt-1 ml-1">{errors.nombre.message}</p>}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-semibold text-gray-700 ml-1">Género</label>
        <div className="relative">
          <select
            {...register("sexo")}
            className={`w-full appearance-none px-4 py-2.5 bg-gray-50 border rounded-xl outline-none transition-all focus:ring-2 ${errors.sexo ? "border-red-400 focus:ring-red-100" : "border-gray-200 focus:border-[#6ba9c4] focus:ring-[#6ba9c4]"
              }`}
          >
            <option value="">Selecciona una opción</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>
          <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={18} />
        </div>
        {errors.sexo && <p className="text-red-500 text-xs mt-1 ml-1">{errors.sexo.message}</p>}
      </div>

      <div className="flex gap-2 pt-2">
        {userToEdit && onCancel && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={onCancel}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-200 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-300 transition-colors cursor-pointer"
          >
            <X size={20} />
            Cancelar
          </motion.button>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className={`flex-1 flex items-center justify-center gap-2 font-bold py-3 rounded-xl shadow-lg transition-colors cursor-pointer ${userToEdit
            ? "bg-[#6ba9c4] text-white hover:bg-[#6ba9c4]/80 cursor-pointer"
            : "bg-[#6ba9c4] text-white hover:bg-[#6ba9c4]/80 cursor-pointer"
            }`}
        >
          {userToEdit ? <Save size={20} /> : <UserPlus size={20} />}
          {userToEdit ? "Actualizar" : "Guardar registro"}
        </motion.button>
      </div>
    </motion.form>
  );
}
