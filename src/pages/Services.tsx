import Navigation from "@/components/Navigation";

const Services = () => {
  const services = [
    {
      number: "01",
      title: "RESIDENCIAL",
      description: "Projetamos casas que refletem estilos de vida únicos, mantendo a integridade arquitetônica"
    },
    {
      number: "02", 
      title: "COMERCIAL",
      description: "Criamos espaços funcionais que potencializam ambientes de trabalho e experiências do usuário"
    },
    {
      number: "03",
      title: "RENOVAÇÃO",
      description: "Transformamos estruturas existentes com olhar contemporâneo e práticas sustentáveis"
    },
    {
      number: "04",
      title: "CONSULTORIA",
      description: "Oferecemos orientação especializada em diretrizes de projeto, planejamento e soluções arquitetônicas"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <section className="pt-32 pb-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20">
              <h1 className="text-minimal text-muted-foreground mb-4">SERVIÇOS</h1>
              <h2 className="text-4xl md:text-6xl font-light text-architectural">
                O que fazemos
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-x-20 gap-y-16">
              {services.map((service, index) => (
                <div key={index} className="group">
                  <div className="flex items-start space-x-6">
                    <span className="text-minimal text-muted-foreground font-medium">
                      {service.number}
                    </span>
                    <div>
                      <h3 className="text-2xl font-light mb-4 text-architectural group-hover:text-muted-foreground transition-colors duration-500">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;