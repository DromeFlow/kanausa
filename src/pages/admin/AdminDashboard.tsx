import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState<"admin" | "moderator" | "user">("admin");
  const [isSaving, setIsSaving] = useState(false);

  const handleCreateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId.trim()) {
      toast({
        title: "Informe o ID do usuário",
        description: "Cole o UUID do usuário criado no Supabase Auth.",
      });
      return;
    }

    try {
      setIsSaving(true);
      const { error } = await supabase.from("user_roles").insert({ user_id: userId.trim(), role });

      if (error) {
        console.error(error);
        toast({
          title: "Erro ao atribuir papel",
          description: "Não foi possível criar o usuário admin. Verifique o ID e tente novamente.",
        });
        return;
      }

      toast({
        title: "Papel atribuído",
        description: "O usuário agora possui acesso de acordo com o papel definido.",
      });
      setUserId("");
      setRole("admin");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Painel Admin</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>Bem-vindo ao painel administrativo.</p>
          <p>Use o menu à esquerda para editar o conteúdo do site.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Criar usuário com acesso</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateRole} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground" htmlFor="user-id">
                ID do usuário (UUID do Supabase Auth)
              </label>
              <Input
                id="user-id"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="ex: 3b4c2c9e-..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground" htmlFor="role">
                Papel
              </label>
              <select
                id="role"
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-1"
                value={role}
                onChange={(e) => setRole(e.target.value as typeof role)}
              >
                <option value="admin">Admin</option>
                <option value="moderator">Moderador</option>
                <option value="user">Usuário padrão</option>
              </select>
            </div>

            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Salvando..." : "Atribuir papel"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
