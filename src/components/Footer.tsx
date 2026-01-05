import { Lock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border mt-16">
      <div className="container mx-auto px-6 py-6 flex items-center justify-between text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} Kanau Arquitetura</span>
        <a
          href="/auth"
          className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
          aria-label="Área administrativa"
        >
          <Lock className="w-4 h-4" />
          <span>Admin</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
