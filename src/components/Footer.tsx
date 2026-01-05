const Footer = () => {
  return (
    <footer className="border-t border-border mt-16">
      <div className="container mx-auto px-6 py-6 flex items-center justify-between text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} Kanau Arquitetura</span>
        <a href="/auth" className="hover:text-foreground transition-colors">
          Admin
        </a>
      </div>
    </footer>
  );
};

export default Footer;
