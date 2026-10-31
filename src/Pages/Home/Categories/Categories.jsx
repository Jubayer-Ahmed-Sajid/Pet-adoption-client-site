import { FaCat, FaDog, FaFish, FaKiwiBird, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import goldenPuppy from "../../../assets/photos/golden-puppy.jpg";
import tabbyCat from "../../../assets/photos/tabby-cat.jpg";
import vibrantBird from "../../../assets/photos/vibrant-bird.jpg";
import aquaticBetta from "../../../assets/photos/aquatic-betta.jpg";

const categories = [
  {
    name: "Dogs",
    slug: "dog",
    icon: FaDog,
    count: "34 adoptable",
    description: "Loyal companions for daily walks, family games, and outdoor adventures.",
    image: goldenPuppy,
  },
  {
    name: "Cats",
    slug: "cat",
    icon: FaCat,
    count: "26 adoptable",
    description: "Gentle, independent purring companions perfect for cozy indoor living.",
    image: tabbyCat,
  },
  {
    name: "Birds",
    slug: "bird",
    icon: FaKiwiBird,
    count: "12 adoptable",
    description: "Vibrant songbirds and cheerful feathered friends with endless curiosity.",
    image: vibrantBird,
  },
  {
    name: "Aquatic",
    slug: "fish",
    icon: FaFish,
    count: "18 adoptable",
    description: "Tranquil freshwater and marine fish that bring peace to any room.",
    image: aquaticBetta,
  },
];

const Categories = () => {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header with Title & Action */}
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

      {/* 4-Species Visual Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.slug}
              to={`/categoryPets/${cat.slug}`}
              className="group relative rounded-card overflow-hidden bg-card border border-rule hover-lift press-down flex flex-col shadow-sm transition-all hover:border-accent-deep/50 hover:shadow-card"
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

                {/* Top Badge: Count */}
                <div className="absolute top-3 right-3">
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-pill bg-paper/95 backdrop-blur-md text-ink shadow-xs">
                    {cat.count}
                  </span>
                </div>

                {/* Bottom Overlay Title & Icon */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white text-xs">
                      <Icon />
                    </span>
                    <h3 className="text-xl font-display font-semibold text-white">
                      {cat.name}
                    </h3>
                  </div>
                  <span className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
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
          );
        })}
      </div>
    </section>
  );
};

export default Categories;
