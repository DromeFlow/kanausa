import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AdminLayout = () => {
  return (
    <div className="min-h-screen grid grid-rows-[auto,1fr] bg-background">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <span className="font-semibold tracking-wide">Painel Admin Kanau</span>
        <Link to="/">
          <Button variant="ghost" size="sm">
            Voltar ao site
          </Button>
        </Link>
      </header>
      <div className="grid grid-cols-[220px,1fr] min-h-[0]">
        <aside className="border-r border-border p-4 space-y-2 text-sm">
          <nav className="space-y-1">
            <Link to="/admin" className="block hover:text-foreground text-muted-foreground">
              Dashboard
            </Link>
            <Link to="/admin/home" className="block hover:text-foreground text-muted-foreground">
              Home
            </Link>
            <Link to="/admin/services" className="block hover:text-foreground text-muted-foreground">
              Serviços
            </Link>
            <Link to="/admin/projects" className="block hover:text-foreground text-muted-foreground">
              Projetos
            </Link>
            <Link to="/admin/blog" className="block hover:text-foreground text-muted-foreground">
              Blog
            </Link>
            <Link to="/admin/contact" className="block hover:text-foreground text-muted-foreground">
              Contato / Estúdio
            </Link>
            <Link to="/admin/settings" className="block hover:text-foreground text-muted-foreground">
              Configurações do site
            </Link>
          </nav>
        </aside>
        <main className="p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
