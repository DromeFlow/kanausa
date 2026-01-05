import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import ContactPage from "@/pages/Contact";
import { useContactInfo } from "@/hooks/useContactInfo";
import { useUpdateContactInfo } from "@/hooks/useUpdateContactInfo";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  id: z.string(),
  intro_title: z.string().optional().nullable(),
  intro_description: z.string().optional().nullable(),
  studio_address: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().email("E-mail inválido").optional().nullable(),
  follow_text: z.string().optional().nullable(),
});

type FormValues = z.infer<typeof schema>;

const AdminContact = () => {
  const { data, isLoading } = useContactInfo();
  const updateContact = useUpdateContactInfo();
  const { toast } = useToast();

  const contact = data?.data;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: contact
      ? {
          id: contact.id,
          intro_title: contact.intro_title ?? "",
          intro_description: contact.intro_description ?? "",
          studio_address: contact.studio_address ?? "",
          phone: contact.phone ?? "",
          email: contact.email ?? "",
          follow_text: contact.follow_text ?? "",
        }
      : undefined,
  });

  useEffect(() => {
    if (!contact) return;

    form.reset({
      id: contact.id,
      intro_title: contact.intro_title ?? "",
      intro_description: contact.intro_description ?? "",
      studio_address: contact.studio_address ?? "",
      phone: contact.phone ?? "",
      email: contact.email ?? "",
      follow_text: contact.follow_text ?? "",
    });
  }, [contact, form]);

  const onSubmit = async (values: FormValues) => {
    try {
      await updateContact.mutateAsync(values);
      toast({
        title: "Contato atualizado",
        description: "Os dados de contato e texto do estúdio foram salvos.",
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
        <h1 className="text-2xl font-semibold mb-2">Contato / Estúdio</h1>
        <p className="text-sm text-muted-foreground">
          Veja a pré-visualização da página de contato e edite os textos principais do estúdio.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="border border-border rounded-lg overflow-hidden bg-muted/30">
          <div className="relative aspect-[3/4] lg:aspect-auto max-h-[80vh] overflow-y-auto">
            <ContactPage />

            {/* Hotspot título principal */}
            <button
              type="button"
              className="absolute left-8 right-8 top-24 h-24 rounded-md border border-transparent hover:border-primary/60 hover:bg-background/5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              onClick={() => form.setFocus("intro_title")}
            />

            {/* Hotspot bloco de endereço/contato */}
            <button
              type="button"
              className="absolute left-8 right-8 top-64 h-40 rounded-md border border-transparent hover:border-primary/60 hover:bg-background/5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              onClick={() => form.setFocus("studio_address")}
            />

            {/* Hotspot texto descritivo */}
            <button
              type="button"
              className="absolute left-10 right-10 bottom-16 h-32 rounded-md border border-transparent hover:border-primary/60 hover:bg-background/5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              onClick={() => form.setFocus("intro_description")}
            />
          </div>
        </section>

        <section className="border border-border rounded-lg p-6">
          {contact ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="intro_title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título principal</FormLabel>
                      <FormControl>
                        <Textarea rows={3} {...field} disabled={isLoading || updateContact.isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="intro_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Texto descritivo</FormLabel>
                      <FormControl>
                        <Textarea rows={4} {...field} disabled={isLoading || updateContact.isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="studio_address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Endereço do estúdio</FormLabel>
                      <FormControl>
                        <Textarea rows={3} {...field} disabled={isLoading || updateContact.isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isLoading || updateContact.isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isLoading || updateContact.isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="follow_text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Texto de chamada para redes sociais</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isLoading || updateContact.isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-2">
                  <Button type="submit" disabled={isLoading || updateContact.isPending}>
                    {updateContact.isPending ? "Salvando..." : "Salvar alterações"}
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <p className="text-sm text-muted-foreground">
              Nenhum registro de contato encontrado. Crie um registro na tabela contact_info para começar.
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminContact;
