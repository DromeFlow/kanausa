import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import Hero from "@/components/Hero";
import { useHomeHero, useUpdateHomeHero } from "@/hooks/useHomeHero";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Título obrigatório"),
  subtitle: z.string().min(1, "Subtítulo obrigatório"),
  cta_text: z.string().optional().nullable(),
  scroll_label: z.string().optional().nullable(),
  background_image_url: z.string().url("URL inválida").optional().or(z.literal("")).nullable(),
});

type FormValues = z.infer<typeof schema>;

const AdminHome = () => {
  const { data, isLoading } = useHomeHero();
  const updateHero = useUpdateHomeHero();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: data?.data?.id ?? undefined,
      title: data?.data?.title ?? "ARQUITETURA\nMINIMALISTA",
      subtitle:
        data?.data?.subtitle ??
        "Criando espaços que inspiram por meio de um design cuidadoso e qualidade inegociável",
      cta_text: data?.data?.cta_text ?? "Começar um projeto",
      scroll_label: data?.data?.scroll_label ?? "ROLAR",
      background_image_url: data?.data?.background_image_url ?? "",
    },
  });

  useEffect(() => {
    if (!data?.data) return;

    form.reset({
      id: data.data.id,
      title: data.data.title ?? "ARQUITETURA\nMINIMALISTA",
      subtitle:
        data.data.subtitle ??
        "Criando espaços que inspiram por meio de um design cuidadoso e qualidade inegociável",
      cta_text: data.data.cta_text ?? "Começar um projeto",
      scroll_label: data.data.scroll_label ?? "ROLAR",
      background_image_url: data.data.background_image_url ?? "",
    });
  }, [data, form]);

  const onSubmit = async (values: FormValues) => {
    try {
      await updateHero.mutateAsync(values);
      toast({
        title: "Home atualizada",
        description: "As informações da seção principal foram salvas.",
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
        <h1 className="text-2xl font-semibold mb-2">Home</h1>
        <p className="text-sm text-muted-foreground">
          Veja uma pré-visualização da página inicial e edite os textos principais.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="border border-border rounded-lg overflow-hidden bg-muted/30">
          {/* Pré-visualização interativa: clique nas áreas para focar os campos ao lado */}
          <div className="relative aspect-[3/4] lg:aspect-auto max-h-[80vh] overflow-y-auto">
            <Hero />

            {/* Hotspots clicáveis para focar os campos do formulário */}
            <button
              type="button"
              className="absolute inset-x-10 top-1/4 h-1/5 rounded-md border border-transparent hover:border-primary/60 hover:bg-background/5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              onClick={() => form.setFocus("title")}
            />

            <button
              type="button"
              className="absolute inset-x-16 top-[48%] h-1/6 rounded-md border border-transparent hover:border-primary/60 hover:bg-background/5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              onClick={() => form.setFocus("subtitle")}
            />

            <button
              type="button"
              className="absolute left-1/2 -translate-x-1/2 bottom-8 w-32 h-16 rounded-md border border-transparent hover:border-primary/60 hover:bg-background/5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              onClick={() => form.setFocus("scroll_label")}
            />

            <div className="absolute top-4 right-4 flex flex-col items-end gap-1 text-[10px] text-muted-foreground">
              <span className="inline-flex items-center rounded-full bg-background/70 px-2 py-1 border border-border">
                Fundo
                <button
                  type="button"
                  className="ml-1 underline underline-offset-2 hover:text-foreground"
                  onClick={() => form.setFocus("background_image_url")}
                >
                  editar
                </button>
              </span>
            </div>
          </div>
        </section>

        <section className="border border-border rounded-lg p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título (use \n para quebrar linha)</FormLabel>
                    <FormControl>
                      <Textarea rows={3} {...field} disabled={isLoading || updateHero.isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subtitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subtítulo</FormLabel>
                    <FormControl>
                      <Textarea rows={3} {...field} disabled={isLoading || updateHero.isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cta_text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Texto do botão principal (CTA)</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoading || updateHero.isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="scroll_label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Texto do indicador de scroll</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoading || updateHero.isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="background_image_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL da imagem de fundo (opcional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://..."
                        {...field}
                        disabled={isLoading || updateHero.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-2">
                <Button type="submit" disabled={isLoading || updateHero.isPending}>
                  {updateHero.isPending ? "Salvando..." : "Salvar alterações"}
                </Button>
              </div>
            </form>
          </Form>
        </section>
      </div>
    </div>
  );
};

export default AdminHome;
