import { NavLink, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";

const navLinkBase =
  "block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-foreground hover:bg-muted/60";

const AdminLayout = () => {
  return (
    <div className="min-h-screen grid grid-rows-[auto,1fr] bg-background">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <span className="text-sm font-semibold tracking-[0.18em] uppercase text-muted-foreground">
          Painel Admin Kanau
        </span>
        <Button asChild variant="ghost" size="sm">
          <a href="/" className="font-normal">
            Voltar ao site
          </a>
        </Button>
      </header>
      <div className="grid grid-cols-[220px,1fr] min-h-[0]">
        <aside className="border-r border-border px-4 py-6 text-sm">
          <nav className="space-y-6">
            <div className="space-y-1">
              <p className="px-3 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Conteúdo
              </p>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `${navLinkBase} ${isActive ? "bg-muted text-foreground" : "text-muted-foreground"}`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/admin/home"
                className={({ isActive }) =>
                  `${navLinkBase} ${isActive ? "bg-muted text-foreground" : "text-muted-foreground"}`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/admin/services"
                className={({ isActive }) =>
                  `${navLinkBase} ${isActive ? "bg-muted text-foreground" : "text-muted-foreground"}`
                }
              >
                Serviços
              </NavLink>
              <NavLink
                to="/admin/projects"
                className={({ isActive }) =>
                  `${navLinkBase} ${isActive ? "bg-muted text-foreground" : "text-muted-foreground"}`
                }
              >
                Projetos
              </NavLink>
              <NavLink
                to="/admin/blog"
                className={({ isActive }) =>
                  `${navLinkBase} ${isActive ? "bg-muted text-foreground" : "text-muted-foreground"}`
                }
              >
                Blog
              </NavLink>
              <NavLink
                to="/admin/contact"
                className={({ isActive }) =>
                  `${navLinkBase} ${isActive ? "bg-muted text-foreground" : "text-muted-foreground"}`
                }
              >
                Contato / Estúdio
              </NavLink>
              <NavLink
                to="/admin/settings"
                className={({ isActive }) =>
                  `${navLinkBase} ${isActive ? "bg-muted text-foreground" : "text-muted-foreground"}`
                }
              >
                Configurações do site
              </NavLink>
            </div>
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
