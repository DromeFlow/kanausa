import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import ServicesPage from "@/pages/Services";
import { useServices, useUpdateService } from "@/hooks/useServices";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  id: z.string(),
  title: z.string().min(1, "Título obrigatório"),
  description: z.string().min(1, "Descrição obrigatória"),
});

type FormValues = z.infer<typeof schema>;

const AdminServices = () => {
  const { data: services = [], isLoading } = useServices();
  const updateService = useUpdateService();
  const { toast } = useToast();

  const firstService = useMemo(() => services[0], [services]);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: firstService
      ? {
          id: firstService.id,
          title: firstService.title,
          description: firstService.description ?? "",
        }
      : undefined,
  });

  useEffect(() => {
    if (!firstService) return;

    form.reset({
      id: firstService.id,
      title: firstService.title,
      description: firstService.description ?? "",
    });
  }, [firstService, form]);

  const onSubmit = async (values: FormValues) => {
    try {
      await updateService.mutateAsync({ ...values, id: values.id });
      toast({
        title: "Serviço atualizado",
        description: "O primeiro serviço da lista foi atualizado.",
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
        <h1 className="text-2xl font-semibold mb-2">Serviços</h1>
        <p className="text-sm text-muted-foreground">
          Clique em áreas do preview para focar o formulário e edite o primeiro serviço da lista.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="border border-border rounded-lg overflow-hidden bg-muted/30">
          <div className="relative aspect-[3/4] lg:aspect-auto max-h-[80vh] overflow-y-auto">
            <ServicesPage />

            {/* Hotspot no título da seção */}
            <button
              type="button"
              className="absolute left-8 right-8 top-24 h-16 rounded-md border border-transparent hover:border-primary/60 hover:bg-background/5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              onClick={() => form.setFocus("title")}
            />

            {/* Hotspot no bloco do primeiro serviço */}
            <button
              type="button"
              className="absolute left-16 right-16 top-56 h-40 rounded-md border border-transparent hover:border-primary/60 hover:bg-background/5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              onClick={() => form.setFocus("description")}
            />
          </div>
        </section>

        <section className="border border-border rounded-lg p-6">
          {firstService ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título do primeiro serviço</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isLoading || updateService.isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição do primeiro serviço</FormLabel>
                      <FormControl>
                        <Textarea rows={4} {...field} disabled={isLoading || updateService.isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-2">
                  <Button type="submit" disabled={isLoading || updateService.isPending}>
                    {updateService.isPending ? "Salvando..." : "Salvar alterações"}
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <p className="text-sm text-muted-foreground">Nenhum serviço cadastrado ainda.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminServices;
