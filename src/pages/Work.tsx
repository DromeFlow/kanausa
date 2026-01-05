import { useState } from "react";
import Navigation from "@/components/Navigation";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const Work = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const projects = [
    {
      image: project1,
      title: "RESIDÊNCIA MINIMALISTA",
      location: "NOVA YORK, 2024",
      category: "RESIDENCIAL",
      description: "Casa contemporânea focada em luz, espaço e sinceridade dos materiais. O projeto enfatiza linhas limpas e materiais naturais.",
      area: "450 m²",
      year: "2024"
    },
    {
      image: project2,
      title: "SEDE CORPORATIVA",
      location: "LONDRES, 2023",
      category: "COMERCIAL",
      description: "Escritório moderno que valoriza colaboração e elementos naturais. Espaços flexíveis e princípios de design sustentável.",
      area: "1.200 m²",
      year: "2023"
    },
    {
      image: project3,
      title: "CENTRO CULTURAL",
      location: "TÓQUIO, 2023",
      category: "CULTURAL",
      description: "Arquitetura pública que conecta tradição e design contemporâneo. Um espaço para encontro comunitário e troca cultural.",
      area: "800 m²",
      year: "2023"
    },
    {
      image: project1,
      title: "LOFT URBANO",
      location: "BERLIM, 2024",
      category: "RESIDENCIAL",
      description: "Patrimônio industrial encontra moradia contemporânea. Materiais brutos equilibrados com detalhes refinados.",
      area: "180 m²",
      year: "2024"
    },
    {
      image: project2,
      title: "ESPAÇO DE GALERIA",
      location: "PARIS, 2022",
      category: "CULTURAL",
      description: "Galeria minimalista projetada para valorizar a arte sem distrações. Espaços brancos puros com iluminação cuidadosamente controlada.",
      area: "600 m²",
      year: "2022"
    },
    {
      image: project3,
      title: "HOTEL BOUTIQUE",
      location: "MILÃO, 2023",
      category: "HOSPEDAGEM",
      description: "Hospitalidade de luxo redefinida por meio de contenção arquitetônica. Cada detalhe é pensado para a experiência do hóspede.",
      area: "2.400 m²",
      year: "2023"
    }
  ];

  const categories = ["TODOS", "RESIDENCIAL", "COMERCIAL", "CULTURAL", "HOSPEDAGEM"];

  const filteredProjects = activeCategory === "TODOS" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h1 className="text-6xl md:text-8xl font-light text-architectural mb-8">
                NOSSOS PROJETOS
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl">
                Uma seleção dos nossos projetos de arquitetura, cada um contando uma história única
                por meio de um design cuidadoso e atenção meticulosa aos detalhes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-8 justify-center md:justify-start">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`text-minimal transition-colors duration-300 relative group ${
                    activeCategory === category 
                      ? "text-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {category}
                  <span className={`absolute bottom-0 left-0 w-full h-px bg-foreground transition-transform duration-300 origin-left ${
                    activeCategory === category 
                      ? "scale-x-100" 
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}></span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 lg:gap-20">
              {filteredProjects.map((project, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="relative overflow-hidden mb-8">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-[60vh] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Project Category Badge */}
                    <div className="absolute top-6 left-6 bg-background/90 backdrop-blur-sm px-4 py-2">
                      <span className="text-minimal text-foreground">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-light text-architectural mb-2 group-hover:text-muted-foreground transition-colors duration-500">
                        {project.title}
                      </h3>
                      <p className="text-minimal text-muted-foreground">
                        {project.location}
                      </p>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex gap-8 pt-4 border-t border-border">
                      <div>
                        <p className="text-minimal text-muted-foreground mb-1">ÁREA</p>
                        <p className="text-foreground">{project.area}</p>
                      </div>
                      <div>
                        <p className="text-minimal text-muted-foreground mb-1">ANO</p>
                        <p className="text-foreground">{project.year}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-light text-architectural mb-8">
              Pronto para iniciar
              <br />
              o seu projeto?
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Vamos conversar sobre como podemos transformar a sua visão arquitetônica em realidade.
            </p>
            <a 
              href="#contact" 
              className="inline-block text-minimal text-foreground hover:text-muted-foreground transition-colors duration-300 relative group"
            >
              FALE CONOSCO
              <span className="absolute bottom-0 left-0 w-full h-px bg-foreground group-hover:bg-muted-foreground transition-colors duration-300"></span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Work;