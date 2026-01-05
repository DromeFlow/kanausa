import Navigation from "@/components/Navigation";
import { useContactInfo } from "@/hooks/useContactInfo";

const Contact = () => {
  const { data: contactData } = useContactInfo();
  const contact = contactData?.data;

  return (
    <div className="min-h-screen">
      <Navigation />
      <section className="pt-32 pb-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-20">
              <div>
                <h1 className="text-minimal text-muted-foreground mb-4">FALE CONOSCO</h1>
                <h2 className="text-4xl md:text-6xl font-light text-architectural mb-12">
                  {contact?.intro_title ?? (
                    <>
                      Vamos criar algo
                      <br />
                      extraordinário
                    </>
                  )}
                </h2>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-minimal text-muted-foreground mb-2">E-MAIL</h3>
                    <a
                      href={`mailto:${contact?.email ?? "hello@archstudio.com"}`}
                      className="text-xl hover:text-muted-foreground transition-colors duration-300"
                    >
                      {contact?.email ?? "hello@archstudio.com"}
                    </a>
                  </div>

                  <div>
                    <h3 className="text-minimal text-muted-foreground mb-2">TELEFONE</h3>
                    <a
                      href={`tel:${contact?.phone ?? "+1234567890"}`}
                      className="text-xl hover:text-muted-foreground transition-colors duration-300"
                    >
                      {contact?.phone ?? "+1 (234) 567-8900"}
                    </a>
                  </div>

                  <div>
                    <h3 className="text-minimal text-muted-foreground mb-2">ESCRITÓRIO</h3>
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
                  <h3 className="text-minimal text-muted-foreground mb-6">SIGA-NOS</h3>
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
