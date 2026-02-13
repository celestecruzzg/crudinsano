"use client";

import { useState, useEffect, useCallback } from "react";
import UserForm from "@/components/UserForm";
import UserList from "@/components/UserList";
import { motion } from "framer-motion";
import { User } from "@/types";
import { api } from "@/lib/api";
import toast from "react-hot-toast";
import Modal from "@/components/ui/Modal";
import { useModal } from "@/config/hooks/useModal";
import { AlertTriangle } from "lucide-react";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);

  const { openModal, closeModal, modalProps } = useModal();

  const fetchUsers = useCallback(async () => {
    try {
      const { data } = await api.get("/users");
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users", error);
      toast.error("Error al cargar usuarios");
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleEdit = (user: User) => {
    setEditingUser(user);
    // Scroll suave hacia el formulario
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: number) => {
    setUserIdToDelete(id);
    openModal();
  };

  const confirmDelete = async () => {
    if (userIdToDelete === null) return;

    try {
      await api.delete(`/users/${userIdToDelete}`);
      toast.success("Usuario eliminado");
      fetchUsers();
      closeModal();
    } catch (error) {
      console.error("Error deleting user", error);
      toast.error("Error al eliminar usuario");
    } finally {
      setUserIdToDelete(null);
    }
  };

  const handleSuccess = () => {
    fetchUsers();
    setEditingUser(null);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-gray-100 to-gray-200 px-4 py-8 md:p-12">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

          {/* Columna Izquierda: Sticky (Título + Formulario) */}
          <section className="flex flex-col items-center w-full xl:w-1/2 lg:sticky lg:top-8 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-center mb-2 mt-6 xl:mt-0"
            >
              <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-800 tracking-tight">
                Gestión de <span className="text-[#6ba9c4]">usuarios</span>
              </h1>
              <p className="text-slate-500 mt-2 text-sm xl:text-lg">Realizado por: Celeste González y Joel Vargas</p>
            </motion.div>

            <UserForm
              onSuccess={handleSuccess}
              userToEdit={editingUser}
              onCancel={handleCancelEdit}
            />
          </section>

          {/* Columna Derecha: Lista (Scrollable) */}
          <section className="flex flex-col items-center w-full xl:w-1/2 space-y-6">
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center lg:justify-start">
                <span className="bg-gray-100/50 backdrop-blur-sm px-4 text-gray-500 font-medium uppercase tracking-wider text-sm">
                  Directorio de Registros
                </span>
              </div>
            </div>

            <UserList
              users={users}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </section>
        </div>
      </div>

      <Modal {...modalProps} title="Confirmar eliminación" size={400}>
        <div className="text-center flex flex-col items-center justify-center gap-4">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-2xl leading-6 font-medium text-gray-900 mb-2">¿Estás seguro?</h3>
          <p className="text-sm xl:text-base text-gray-500 mb-6">
            Esta acción no se puede deshacer. Se eliminará permanentemente al usuario seleccionado.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors cursor-pointer"
            >
              Sí, eliminar
            </button>
          </div>
        </div>
      </Modal>
    </main>
  );
}