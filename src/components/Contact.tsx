import { Lock } from "lucide-react";
import { useContactInfo } from "@/hooks/useContactInfo";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const Contact = () => {
  const { data: contactData } = useContactInfo();
  const { data: siteSettings } = useSiteSettings();

  const contact = contactData?.data;
  const settings = siteSettings?.data;

  return (
    <section id="contact" className="py-32 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid md:grid-cols-2 gap-20">
            <div>
              <h2 className="text-minimal text-muted-foreground mb-4">FALE CONOSCO</h2>
              <h3 className="text-4xl md:text-6xl font-light text-architectural mb-12">
                {contact?.intro_title ?? (
                  <>
                    Vamos criar algo
                    <br />
                    extraordinário
                  </>
                )}
              </h3>

              <div className="space-y-8">
                <div>
                  <h4 className="text-minimal text-muted-foreground mb-2">E-MAIL</h4>
                  <a
                    href={`mailto:${contact?.email ?? "hello@archstudio.com"}`}
                    className="text-xl hover:text-muted-foreground transition-colors duration-300"
                  >
                    {contact?.email ?? "hello@archstudio.com"}
                  </a>
                </div>

                <div>
                  <h4 className="text-minimal text-muted-foreground mb-2">TELEFONE</h4>
                  <a
                    href={`tel:${contact?.phone ?? "+1234567890"}`}
                    className="text-xl hover:text-muted-foreground transition-colors duration-300"
                  >
                    {contact?.phone ?? "+1 (234) 567-8900"}
                  </a>
                </div>

                <div>
                  <h4 className="text-minimal text-muted-foreground mb-2">ESCRITÓRIO</h4>
                  <address className="text-xl not-italic">
                    {contact?.studio_address ?? (
                      <>
                        123 Design Avenue
                        <br />
                        New York, NY 10001
                      </>
                    )}
                  </address>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h4 className="text-minimal text-muted-foreground mb-6">SIGA-NOS</h4>
                <div className="space-y-4">
                  <a
                    href="#"
                    className="block text-xl hover:text-muted-foreground transition-colors duration-300"
                  >
                    Instagram
                  </a>
                  <a
                    href="#"
                    className="block text-xl hover:text-muted-foreground transition-colors duration-300"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="#"
                    className="block text-xl hover:text-muted-foreground transition-colors duration-300"
                  >
                    Behance
                  </a>
                </div>
              </div>

              <div className="pt-12 border-t border-border">
                <p className="text-muted-foreground">
                  {contact?.intro_description ??
                    "Encaramos cada projeto com curiosidade, rigor e compromisso com a excelência. Nosso processo começa ouvindo, entendendo a sua visão e transformando-a em espaços que superam as expectativas."}
                </p>
              </div>
            </div>
          </div>

          {settings?.show_admin_link !== false && (
            <div className="flex items-center justify-end pt-4 border-t border-dashed border-border text-xs text-muted-foreground gap-2">
              <a
                href="/auth"
                className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
                aria-label="Acessar painel administrativo"
              >
                <span>{settings?.admin_link_label ?? "Área restrita"}</span>
                <Lock className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
