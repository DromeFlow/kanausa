import { useAboutSections } from "@/hooks/useAboutSections";

const About = () => {
  const { data: sections = [] } = useAboutSections();

  const getSection = (key: string) => sections.find((s) => s.section_key === key);

  const philosophyMain = getSection("philosophy_main");
  const philosophySecondary = getSection("philosophy_secondary");
  const approachResearch = getSection("approach_research");
  const approachCollaboration = getSection("approach_collaboration");
  const approachInnovation = getSection("approach_innovation");
  const statFounded = getSection("stat_founded");
  const statProjects = getSection("stat_projects");

  return (
    <section id="about" className="py-32 bg-muted/20">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-minimal text-muted-foreground mb-4">SOBRE</h2>
              <h3 className="text-4xl md:text-6xl font-light text-architectural mb-12">
                {philosophyMain?.title ?? "Filosofia de Projeto"}
              </h3>

              <div className="space-y-8">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {philosophyMain?.body ??
                    "Acreditamos que a arquitetura deve ampliar a experiência humana, ao mesmo tempo em que respeita o ambiente natural. Nosso escritório foca em criar espaços que sejam ao mesmo tempo funcionais e poéticos."}
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  {philosophySecondary?.body ??
                    "Fundado em 2015, nosso estúdio já concluiu mais de 200 projetos nos setores residencial, comercial e cultural. Cada projeto começa com uma escuta atenta e termina com uma execução cuidadosa."}
                </p>
              </div>
            </div>

            <div className="space-y-12">
              <div>
                <h4 className="text-minimal text-muted-foreground mb-6">ABORDAGEM</h4>
                <div className="space-y-6">
                  <div className="border-l-2 border-architectural pl-6">
                    <h5 className="text-lg font-medium mb-2">
                      {approachResearch?.title ?? "Pesquisa"}
                    </h5>
                    <p className="text-muted-foreground">
                      {approachResearch?.body ?? "Compreensão profunda de contexto, cultura e clima"}
                    </p>
                  </div>
                  <div className="border-l-2 border-architectural pl-6">
                    <h5 className="text-lg font-medium mb-2">
                      {approachCollaboration?.title ?? "Colaboração"}
                    </h5>
                    <p className="text-muted-foreground">
                      {approachCollaboration?.body ??
                        "Parceria próxima com clientes, engenheiros e artesãos"}
                    </p>
                  </div>
                  <div className="border-l-2 border-architectural pl-6">
                    <h5 className="text-lg font-medium mb-2">
                      {approachInnovation?.title ?? "Inovação"}
                    </h5>
                    <p className="text-muted-foreground">
                      {approachInnovation?.body ??
                        "Materiais sustentáveis e soluções de design contemporâneas"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-border">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-minimal text-muted-foreground mb-2">FUNDADO</h4>
                    <p className="text-xl">{statFounded?.body ?? "2015"}</p>
                  </div>
                  <div>
                    <h4 className="text-minimal text-muted-foreground mb-2">PROJETOS</h4>
                    <p className="text-xl">{statProjects?.body ?? "200+"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
