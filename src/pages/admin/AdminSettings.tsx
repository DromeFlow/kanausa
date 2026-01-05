import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useUpdateSiteSettings } from "@/hooks/useUpdateSiteSettings";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  id: z.string(),
  site_name: z.string().optional().nullable(),
  footer_text: z.string().optional().nullable(),
  show_admin_link: z.boolean(),
  admin_link_label: z.string().min(1, "Texto do link obrigatório"),
});

type FormValues = z.infer<typeof schema>;

const AdminSettings = () => {
  const { data, isLoading } = useSiteSettings();
  const updateSettings = useUpdateSiteSettings();
  const { toast } = useToast();

  const settings = data?.data;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: settings
      ? {
          id: settings.id,
          site_name: settings.site_name ?? "",
          footer_text: settings.footer_text ?? "",
          show_admin_link: settings.show_admin_link,
          admin_link_label: settings.admin_link_label,
        }
      : undefined,
  });

  useEffect(() => {
    if (!settings) return;

    form.reset({
      id: settings.id,
      site_name: settings.site_name ?? "",
      footer_text: settings.footer_text ?? "",
      show_admin_link: settings.show_admin_link,
      admin_link_label: settings.admin_link_label,
    });
  }, [settings, form]);

  const onSubmit = async (values: FormValues) => {
    try {
      await updateSettings.mutateAsync(values);
      toast({
        title: "Configurações salvas",
        description: "As informações gerais do site foram atualizadas.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as alterações. Tente novamente.",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Configurações do site</h1>
        <p className="text-sm text-muted-foreground">
          Ajuste o nome do estúdio, textos de rodapé e visibilidade do link de acesso ao painel admin.
        </p>
      </div>

      <section className="border border-border rounded-lg p-6 max-w-2xl">
        {settings ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="site_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do site / estúdio</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoading || updateSettings.isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="footer_text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Texto de rodapé</FormLabel>
                    <FormControl>
                      <Textarea rows={3} {...field} disabled={isLoading || updateSettings.isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="show_admin_link"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-4 py-3">
                    <div className="space-y-1">
                      <FormLabel>Mostrar link para painel admin no site</FormLabel>
                      <p className="text-xs text-muted-foreground">
                        Útil durante a fase de construção do site. Você pode ocultar depois que o projeto estiver no ar.
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading || updateSettings.isPending}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="admin_link_label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Texto do link do painel admin</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoading || updateSettings.isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-2">
                <Button type="submit" disabled={isLoading || updateSettings.isPending}>
                  {updateSettings.isPending ? "Salvando..." : "Salvar configurações"}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <p className="text-sm text-muted-foreground">
            Nenhuma configuração encontrada. Crie um registro na tabela site_settings para começar.
          </p>
        )}
      </section>
    </div>
  );
};

export default AdminSettings;
