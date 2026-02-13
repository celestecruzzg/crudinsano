import { Dumbbell, Twitter, Instagram, Facebook } from "lucide-react";

const Footer = () => (
  <footer className="py-12 bg-gray-50 border-t">
    <div className="container text-center" style={{ color: 'var(--color-black)', opacity: 0.7 }}>
      <div className="flex justify-center items-center gap-2 mb-4">
        <Dumbbell className="text-[--color-blue]" size={20} />
        <p className="font-bold text-lg">FitLife</p>
      </div>
      <div className="flex justify-center gap-6 mb-6">
        <a href="#" className="hover:text-[--color-blue] transition-colors">Privacidad</a>
        <a href="#" className="hover:text-[--color-blue] transition-colors">Términos</a>
        <a href="#" className="hover:text-[--color-blue] transition-colors">Contacto</a>
      </div>
      <div className="flex justify-center gap-6 mb-6">
        <a href="#" aria-label="Twitter"><Twitter className="hover:text-[--color-blue] transition-colors" /></a>
        <a href="#" aria-label="Instagram"><Instagram className="hover:text-[--color-blue] transition-colors" /></a>
        <a href="#" aria-label="Facebook"><Facebook className="hover:text-[--color-blue] transition-colors" /></a>
      </div>
      <p className="text-sm">&copy; {new Date().getFullYear()} FitLife. Todos los derechos reservados.</p>
    </div>
  </footer>
);

export default Footer;