import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import WorkPage from "@/pages/Work";
import { useProjects, useUpdateProject } from "@/hooks/useProjects";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ImageField } from "@/components/admin/ImageField";

const schema = z.object({
  id: z.string(),
  title: z.string().min(1, "Título obrigatório"),
  description: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  year: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  thumbnail_url: z.string().url("URL inválida").optional().or(z.literal("")).nullable(),
});

type FormValues = z.infer<typeof schema>;

const AdminProjects = () => {
  const { data: projects = [], isLoading } = useProjects();
  const updateProject = useUpdateProject();
  const { toast } = useToast();

  const firstProject = useMemo(() => projects[0], [projects]);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: firstProject
      ? {
          id: firstProject.id,
          title: firstProject.title,
          description: firstProject.description ?? "",
          category: firstProject.category ?? "",
          year: firstProject.year ?? "",
          location: firstProject.location ?? "",
          thumbnail_url: firstProject.thumbnail_url ?? "",
        }
      : undefined,
  });

  useEffect(() => {
    if (!firstProject) return;

    form.reset({
      id: firstProject.id,
      title: firstProject.title,
      description: firstProject.description ?? "",
      category: firstProject.category ?? "",
      year: firstProject.year ?? "",
      location: firstProject.location ?? "",
      thumbnail_url: firstProject.thumbnail_url ?? "",
    });
  }, [firstProject, form]);

  const onSubmit = async (values: FormValues) => {
    try {
      await updateProject.mutateAsync({ ...values, id: values.id });
      toast({
        title: "Projeto atualizado",
        description: "O primeiro projeto da lista foi atualizado.",
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
        <h1 className="text-2xl font-semibold mb-2">Projetos</h1>
        <p className="text-sm text-muted-foreground">
          Clique em áreas do preview para focar o formulário e edite o primeiro projeto da lista.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="border border-border rounded-lg overflow-hidden bg-muted/30">
          <div className="relative aspect-[3/4] lg:aspect-auto max-h-[80vh] overflow-y-auto">
            <WorkPage />

            {/* Hotspot no título principal */}
            <button
              type="button"
              className="absolute left-8 right-8 top-24 h-20 rounded-md border border-transparent hover:border-primary/60 hover:bg-background/5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              onClick={() => form.setFocus("title")}
            />

            {/* Hotspot na descrição do projeto */}
            <button
              type="button"
              className="absolute left-16 right-16 top-64 h-40 rounded-md border border-transparent hover:border-primary/60 hover:bg-background/5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              onClick={() => form.setFocus("description")}
            />
          </div>
        </section>

        <section className="border border-border rounded-lg p-6">
          {firstProject ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título do primeiro projeto</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isLoading || updateProject.isPending} />
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
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea rows={4} {...field} disabled={isLoading || updateProject.isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isLoading || updateProject.isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ano</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isLoading || updateProject.isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Localização</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isLoading || updateProject.isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="thumbnail_url"
                  render={({ field }) => (
                    <FormItem>
                      <ImageField
                        label="Thumbnail / imagem de capa do projeto"
                        description="Esta imagem será usada como capa na listagem de projetos."
                        value={field.value || null}
                        onChange={(url) => field.onChange(url ?? "")}
                        bucketPathPrefix={firstProject ? `projects/${firstProject.id}` : "projects"}
                        disabled={isLoading || updateProject.isPending}
                      />
                    </FormItem>
                  )}
                />

                <div className="pt-2">
                  <Button type="submit" disabled={isLoading || updateProject.isPending}>
                    {updateProject.isPending ? "Salvando..." : "Salvar alterações"}
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <p className="text-sm text-muted-foreground">Nenhum projeto cadastrado ainda.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminProjects;
