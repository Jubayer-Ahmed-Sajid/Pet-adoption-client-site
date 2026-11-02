import { FaCat, FaDog, FaFish, FaKiwiBird, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import MotionReveal from "../../../Components/MotionReveal";
import usePlatformStats from "../../../Components/Hooks/usePlatformStats";

import goldenPuppy from "../../../assets/photos/golden-puppy.jpg";
import tabbyCat from "../../../assets/photos/tabby-cat.jpg";
import vibrantBird from "../../../assets/photos/vibrant-bird.jpg";
import aquaticBetta from "../../../assets/photos/aquatic-betta.jpg";

const categoryConfigs = [
  {
    name: "Dogs",
    slug: "dog",
    icon: FaDog,
    description: "Loyal companions for daily walks, family games, and outdoor adventures.",
    image: goldenPuppy,
  },
  {
    name: "Cats",
    slug: "cat",
    icon: FaCat,
    description: "Gentle, independent purring companions perfect for cozy indoor living.",
    image: tabbyCat,
  },
  {
    name: "Birds",
    slug: "bird",
    icon: FaKiwiBird,
    description: "Vibrant songbirds and cheerful feathered friends with endless curiosity.",
    image: vibrantBird,
  },
  {
    name: "Aquatic",
    slug: "fish",
    icon: FaFish,
    description: "Tranquil freshwater and marine fish that bring peace to any room.",
    image: aquaticBetta,
  },
];

const Categories = () => {
  const { stats } = usePlatformStats();

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header with Motion Reveal */}
      <MotionReveal direction="up" distance={16}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold text-accent-deep tracking-wide uppercase">
              Species Directory
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-ink mt-1">
              Browse adoptable companions by species
            </h2>
          </div>
          <Link
            to="/pet-listing"
            className="text-sm font-semibold text-ink hover:text-accent-deep inline-flex items-center gap-1.5 group transition-colors self-start sm:self-auto"
          >
            <span>View all listings</span>
            <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </MotionReveal>

      {/* 4-Species Visual Cards with Staggered Motion Reveal */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categoryConfigs.map((cat, idx) => {
          const Icon = cat.icon;
          const count = stats?.categories?.[cat.slug] ?? 0;

          return (
            <MotionReveal key={cat.slug} direction="up" delay={idx * 80} distance={24}>
              <Link
                to={`/categoryPets/${cat.slug}`}
                className="group relative rounded-card overflow-hidden bg-card border border-rule hover-lift press-down flex flex-col shadow-sm transition-all hover:border-accent-deep/50 hover:shadow-card h-full"
              >
                {/* Photo Stage */}
                <div className="relative h-56 w-full overflow-hidden bg-paper-2">
                  <img
                    src={cat.image}
                    alt={`${cat.name} companions`}
                    className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  
                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  {/* Top Badge: Dynamic Computed Count */}
                  <div className="absolute top-3 right-3">
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-pill bg-paper/95 backdrop-blur-md text-ink shadow-xs transition-transform group-hover:-translate-y-0.5">
                      {count} adoptable
                    </span>
                  </div>

                  {/* Bottom Overlay Title & Icon */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <span className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white text-xs transition-transform group-hover:scale-110">
                        <Icon />
                      </span>
                      <h3 className="text-xl font-display font-semibold text-white">
                        {cat.name}
                      </h3>
                    </div>
                    <span className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-xs text-white opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5">
                      →
                    </span>
                  </div>
                </div>

                {/* Description Body */}
                <div className="p-4 bg-card flex-1 flex flex-col justify-between">
                  <p className="text-xs text-ink-2 leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="pt-3 mt-2 border-t border-rule/60 flex items-center justify-between text-[11px] font-medium text-accent-deep">
                    <span>Explore {cat.name.toLowerCase()}</span>
                    <FaArrowRight className="text-[10px] transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </MotionReveal>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;
