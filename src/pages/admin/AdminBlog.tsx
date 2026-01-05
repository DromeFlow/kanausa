import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import BlogPage from "@/pages/Blog";
import { useBlogPosts, useUpdateBlogPost } from "@/hooks/useBlogPosts";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ImageField } from "@/components/admin/ImageField";

const schema = z.object({
  id: z.string(),
  title: z.string().min(1, "Título obrigatório"),
  summary: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  read_time: z.string().optional().nullable(),
  author_name: z.string().optional().nullable(),
  cover_image_url: z.string().url("URL inválida").optional().or(z.literal("")).nullable(),
});

type FormValues = z.infer<typeof schema>;

const AdminBlog = () => {
  const { data: posts = [], isLoading } = useBlogPosts();
  const updatePost = useUpdateBlogPost();
  const { toast } = useToast();

  const firstPost = useMemo(() => posts[0], [posts]);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: firstPost
      ? {
          id: firstPost.id,
          title: firstPost.title,
          summary: firstPost.summary ?? "",
          category: firstPost.category ?? "",
          read_time: firstPost.read_time ?? "",
          author_name: firstPost.author_name ?? "",
          cover_image_url: firstPost.cover_image_url ?? "",
        }
      : undefined,
  });

  useEffect(() => {
    if (!firstPost) return;

    form.reset({
      id: firstPost.id,
      title: firstPost.title,
      summary: firstPost.summary ?? "",
      category: firstPost.category ?? "",
      read_time: firstPost.read_time ?? "",
      author_name: firstPost.author_name ?? "",
      cover_image_url: firstPost.cover_image_url ?? "",
    });
  }, [firstPost, form]);

  const onSubmit = async (values: FormValues) => {
    try {
      await updatePost.mutateAsync({ ...values, id: values.id });
      toast({
        title: "Post atualizado",
        description: "O primeiro artigo da lista foi atualizado.",
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
        <h1 className="text-2xl font-semibold mb-2">Blog</h1>
        <p className="text-sm text-muted-foreground">
          Clique em áreas do preview para focar o formulário e edite o primeiro artigo publicado.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="border border-border rounded-lg overflow-hidden bg-muted/30">
          <div className="relative aspect-[3/4] lg:aspect-auto max-h-[80vh] overflow-y-auto">
            <BlogPage />

            {/* Hotspot no título Artigos */}
            <button
              type="button"
              className="absolute left-8 right-8 top-24 h-20 rounded-md border border-transparent hover:border-primary/60 hover:bg-background/5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              onClick={() => form.setFocus("title")}
            />

            {/* Hotspot no card principal */}
            <button
              type="button"
              className="absolute left-12 right-12 top-64 h-48 rounded-md border border-transparent hover:border-primary/60 hover:bg-background/5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              onClick={() => form.setFocus("summary")}
            />
          </div>
        </section>

        <section className="border border-border rounded-lg p-6">
          {firstPost ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título do primeiro artigo</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isLoading || updatePost.isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="summary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Resumo</FormLabel>
                      <FormControl>
                        <Textarea rows={4} {...field} disabled={isLoading || updatePost.isPending} />
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
                        <Input {...field} disabled={isLoading || updatePost.isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="read_time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tempo de leitura</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isLoading || updatePost.isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="author_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Autor</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isLoading || updatePost.isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cover_image_url"
                  render={({ field }) => (
                    <FormItem>
                      <ImageField
                        label="Imagem de capa do artigo"
                        description="Esta imagem aparece como capa na listagem do blog."
                        value={field.value || null}
                        onChange={(url) => field.onChange(url ?? "")}
                        bucketPathPrefix={firstPost ? `blog/${firstPost.id}` : "blog"}
                        disabled={isLoading || updatePost.isPending}
                      />
                    </FormItem>
                  )}
                />

                <div className="pt-2">
                  <Button type="submit" disabled={isLoading || updatePost.isPending}>
                    {updatePost.isPending ? "Salvando..." : "Salvar alterações"}
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <p className="text-sm text-muted-foreground">Nenhum artigo publicado ainda.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminBlog;
