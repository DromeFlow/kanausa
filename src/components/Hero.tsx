import heroImage from "@/assets/hero-architecture.jpg";
import { useHomeHero } from "@/hooks/useHomeHero";

const Hero = () => {
  const { data } = useHomeHero();

  const hero = data?.data;

  const title = hero?.title ?? "ARQUITETURA\nMINIMALISTA";
  const subtitle =
    hero?.subtitle ??
    "Criando espaços que inspiram por meio de um design cuidadoso e qualidade inegociável";
  const scrollLabel = hero?.scroll_label ?? "ROLAR";
  const backgroundImage = hero?.background_image_url ?? heroImage;

  const [firstLine, secondLine] = title.split("\n");

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-light text-white text-architectural mb-8 reveal">
          {firstLine}
          <br />
          {secondLine}
        </h1>
        <p className="text-xl md:text-2xl text-white/80 font-light tracking-wide max-w-2xl mx-auto reveal-delayed">
          {subtitle}
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 reveal-delayed">
        <div className="w-px h-16 bg-white/40" />
        <div className="text-minimal text-white/60 mt-4 rotate-90 origin-center">
          {scrollLabel}
        </div>
      </div>
    </section>
  );
};

export default Hero;
