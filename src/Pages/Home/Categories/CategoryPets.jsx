import { MdLocationPin, MdSearch, MdClose } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaPaw, FaCat, FaDog, FaFish, FaKiwiBird, FaArrowRight } from "react-icons/fa";
import useAxiosPublic from "../../../Components/Hooks/useAxiosPublic";

const speciesMeta = {
  cat: { title: "Adoptable Cats", icon: FaCat, singular: "cat" },
  dog: { title: "Adoptable Dogs", icon: FaDog, singular: "dog" },
  bird: { title: "Adoptable Birds", icon: FaKiwiBird, singular: "bird" },
  fish: { title: "Adoptable Aquatic Companions", icon: FaFish, singular: "aquatic pet" },
};

const CategoryPets = () => {
  const { category = "cat" } = useParams();
  const normalizedCategory = category.toLowerCase();
  const meta = speciesMeta[normalizedCategory] || {
    title: `Adoptable ${category}`,
    icon: FaPaw,
    singular: category,
  };
  const Icon = meta.icon;

  const axiosPublic = useAxiosPublic();
  const [query, setQuery] = useState("");
  const [pets, setPets] = useState([]);
  const [displayPets, setDisplayPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosPublic
      .get(`/pets/${normalizedCategory}`)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        const available = data.filter((pet) => !pet.adopted);
        setPets(available);
        setDisplayPets(available);
      })
      .catch((err) => {
        console.error("Failed to load category pets:", err);
        setPets([]);
        setDisplayPets([]);
      })
      .finally(() => setLoading(false));
  }, [normalizedCategory, axiosPublic]);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) {
      setDisplayPets(pets);
      return;
    }
    const filtered = pets.filter((pet) =>
      pet.name?.toLowerCase().includes(query.toLowerCase())
    );
    setDisplayPets(filtered);
  };

  const handleClear = () => {
    setQuery("");
    setDisplayPets(pets);
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <div className="mb-6 flex items-center gap-2 text-xs text-muted">
        <Link to="/" className="hover:text-ink transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link to="/pet-listing" className="hover:text-ink transition-colors">
          Companions
        </Link>
        <span>/</span>
        <span className="text-ink font-semibold capitalize">{category}</span>
      </div>

      {/* Category Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-rule">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-paper-2 border border-rule text-xs font-semibold text-ink mb-3 shadow-xs">
            <Icon className="text-accent-deep text-xs" />
            <span className="capitalize">{category} Category Showcase</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-ink tracking-tight">
            {meta.title}
          </h1>
          <p className="text-xs sm:text-sm text-ink-2 mt-2 max-w-xl leading-relaxed">
            Every {meta.singular} listed here has passed veterinary health checks and is ready to join a loving home.
          </p>
        </div>

        {/* Quick Search */}
        <form onSubmit={handleSearch} className="flex items-center gap-2 w-full md:w-80">
          <div className="relative flex-1">
            <MdSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted text-base" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${category} by name...`}
              className="w-full pl-9 pr-8 py-2 rounded-pill bg-paper-2 border border-rule text-xs text-ink placeholder:text-muted focus:outline-none focus:border-ink transition-colors"
            />
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
              >
                <MdClose className="text-sm" />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-pill bg-accent hover:bg-accent-deep text-accent-ink font-semibold text-xs transition-colors shrink-0 shadow-xs press-down"
          >
            Filter
          </button>
        </form>
      </div>

      {/* Content Grid */}
      {loading ? (
        <div className="p-12 text-center text-muted text-sm bg-card rounded-card border border-rule animate-pulse">
          Loading {category} companion profiles…
        </div>
      ) : displayPets.length === 0 ? (
        <div className="bg-card rounded-card border border-rule p-12 text-center max-w-md mx-auto shadow-sm">
          <div className="w-14 h-14 rounded-full bg-paper-2 text-muted text-xl flex items-center justify-center mx-auto mb-4">
            <Icon />
          </div>
          <h3 className="text-lg font-display font-semibold text-ink">
            No {category} companions currently available
          </h3>
          <p className="text-xs text-ink-2 mt-2 leading-relaxed">
            All companions in this species group have either been adopted or are awaiting veterinary clearances.
          </p>
          <Link
            to="/pet-listing"
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-pill bg-accent text-accent-ink font-semibold text-xs hover:bg-accent-deep transition-colors shadow-xs"
          >
            <span>Explore all species</span>
            <FaArrowRight className="text-[10px]" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPets.map((pet) => (
            <div
              key={pet._id}
              className="bg-card rounded-card border border-rule overflow-hidden shadow-sm hover-lift flex flex-col justify-between group transition-all hover:border-accent-deep/50 hover:shadow-card"
            >
              <div>
                <div className="relative h-60 w-full overflow-hidden bg-paper-2">
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  <div className="absolute top-3 left-3">
                    <span className="bg-paper/95 backdrop-blur-md px-2.5 py-1 rounded-pill border border-rule text-[11px] font-semibold text-ink capitalize shadow-xs">
                      {pet.category || category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3">
                    <span className="text-white text-[11px] font-semibold bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-pill border border-white/20">
                      Age {pet.age} {pet.age === 1 ? "yr" : "yrs"}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-display font-semibold text-ink mb-1 group-hover:text-accent-deep transition-colors">
                    {pet.name}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-muted mb-3">
                    <MdLocationPin className="text-accent-3 text-sm shrink-0" />
                    <span className="truncate">{pet.pet_location}</span>
                  </div>

                  {pet.short_description && (
                    <p className="text-xs text-ink-2 line-clamp-2 leading-relaxed">
                      {pet.short_description}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  to={`/pet-listing/${pet._id}`}
                  className="w-full py-2.5 rounded-pill font-semibold text-xs text-accent-ink bg-accent hover:bg-accent-deep hover-lift press-down shadow-xs transition-colors flex items-center justify-center gap-2 group/btn"
                >
                  <span>Meet {pet.name}</span>
                  <FaArrowRight className="text-[10px] transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPets;
