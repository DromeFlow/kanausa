import { useHighlightedProjects } from "@/hooks/useProjects";

const Portfolio = () => {
  const { data: projects = [] } = useHighlightedProjects();

  return (
    <section id="work" className="py-32 bg-muted">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-minimal text-muted-foreground mb-4">PROJETOS EM DESTAQUE</h2>
            <h3 className="text-4xl md:text-6xl font-light text-architectural">Nossos projetos</h3>
          </div>

          <div className="space-y-32">
            {projects.map((project) => (
              <div key={project.id} className="group">
                <div className="relative overflow-hidden">
                  {project.thumbnail_url && (
                    <img
                      src={project.thumbnail_url}
                      alt={project.title}
                      className="w-full h-[70vh] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="mt-8 grid md:grid-cols-3 gap-8">
                  <div>
                    <h4 className="text-2xl font-light text-architectural mb-2">{project.title}</h4>
                    <p className="text-minimal text-muted-foreground">
                      {project.location ?? project.year ?? ""}
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
