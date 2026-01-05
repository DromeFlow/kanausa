import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const AdminDashboard = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Painel Admin</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p>
            Bem-vindo ao painel administrativo. Use o menu à esquerda para editar o conteúdo do site.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
