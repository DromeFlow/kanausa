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
  instagram_url: z.string().url("URL inválida").optional().nullable(),
  linkedin_url: z.string().url("URL inválida").optional().nullable(),
  behance_url: z.string().url("URL inválida").optional().nullable(),
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
          instagram_url: settings.instagram_url ?? "",
          linkedin_url: settings.linkedin_url ?? "",
          behance_url: settings.behance_url ?? "",
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
      instagram_url: settings.instagram_url ?? "",
      linkedin_url: settings.linkedin_url ?? "",
      behance_url: settings.behance_url ?? "",
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
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-1">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          Ajustes gerais
        </p>
        <h1 className="text-2xl font-semibold">Configurações do site</h1>
        <p className="text-sm text-muted-foreground max-w-xl">
          Defina como o estúdio aparece no rodapé e controle a visibilidade do acesso ao painel administrativo.
        </p>
      </div>

      <section className="border border-border rounded-xl p-6 lg:p-8 bg-muted/40">
        {settings ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Identidade do site
                  </p>

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
                          <Textarea
                            rows={3}
                            {...field}
                            disabled={isLoading || updateSettings.isPending}
                            placeholder={`© ${new Date().getFullYear()} Kanau Arquitetura`}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground flex items-center gap-2">
                    Acesso administrativo
                  </p>

                  <FormField
                    control={form.control}
                    name="show_admin_link"
                    render={({ field }) => (
                      <FormItem className="flex items-start justify-between gap-4 rounded-lg border border-border bg-background/60 px-4 py-3">
                        <div className="space-y-1">
                          <FormLabel>Mostrar link para painel admin no site</FormLabel>
                          <p className="text-xs text-muted-foreground max-w-sm">
                            Quando ativado, um pequeno link com cadeado aparece no rodapé para acesso rápido ao painel.
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
                          <Input
                            {...field}
                            disabled={isLoading || updateSettings.isPending}
                            placeholder="Admin"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground mt-6">
                    Links de redes sociais globais
                  </p>

                  <FormField
                    control={form.control}
                    name="instagram_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instagram</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isLoading || updateSettings.isPending}
                            placeholder="https://instagram.com/seu-estudio"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="linkedin_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isLoading || updateSettings.isPending}
                            placeholder="https://linkedin.com/company/seu-estudio"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="behance_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Behance</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isLoading || updateSettings.isPending}
                            placeholder="https://behance.net/seu-estudio"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  type="submit"
                  disabled={isLoading || updateSettings.isPending}
                  className="hover-scale"
                >
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
