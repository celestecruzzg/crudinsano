"use client";

import { motion, AnimatePresence } from "framer-motion";
import { User as UserIcon, Edit2, Trash2 } from "lucide-react";
import { User } from "@/types";

interface UserListProps {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (id: number) => void;
}

export default function UserList({ users, onEdit, onDelete }: UserListProps) {
    return (
        <div className="grid gap-4 w-full">
            <AnimatePresence mode="popLayout">
                {users.map((user, index) => (
                    <motion.div
                        key={user.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300"
                    >
                        <div className="flex items-center gap-4 w-full sm:w-auto mb-4 sm:mb-0">
                            <div className={`p-3 rounded-full ${user.sexo === 'femenino' ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-[#6ba9c4]'}`}>
                                <UserIcon size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 group-hover:text-[#6ba9c4] transition-colors">
                                    {user.nombre}
                                </h3>
                                <p className="text-xs text-gray-400 uppercase tracking-tighter font-medium">
                                    ID: {user.id.toString().padStart(3, '0')} • {user.sexo}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                            <div className={`hidden sm:block h-2 w-2 rounded-full mr-4 ${user.sexo === 'femenino' ? 'bg-pink-400' : 'bg-blue-400'}`} />

                            <button
                                onClick={() => onEdit(user)}
                                className="p-2 text-gray-400 hover:text-[#6ba9c4] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                title="Editar usuario"
                            >
                                <Edit2 size={18} />
                            </button>

                            <button
                                onClick={() => onDelete(user.id)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                title="Eliminar usuario"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            {users.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-10 text-gray-400"
                >
                    No hay usuarios registrados
                </motion.div>
            )}
        </div>
    );
}
