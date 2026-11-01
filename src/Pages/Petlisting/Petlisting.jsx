import React, { useEffect, useState } from "react";
import usePets from "../../Components/Hooks/usePets";
import { Link, useNavigate } from "react-router-dom";
import { MdLocationPin, MdSearch, MdClose, MdFavorite, MdCheckCircle } from "react-icons/md";
import { FaPaw, FaCat, FaDog, FaFish, FaKiwiBird, FaShieldAlt, FaArrowRight, FaHeart } from "react-icons/fa";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";
import useAuth from "../../Components/Hooks/useAuth";
import useFavorites from "../../Components/Hooks/useFavorites";
import MotionReveal from "../../Components/MotionReveal";
import Swal from "sweetalert2";

const petCategories = [
  { value: "all", label: "All Companions", icon: FaPaw },
  { value: "dog", label: "Dogs", icon: FaDog },
  { value: "cat", label: "Cats", icon: FaCat },
  { value: "bird", label: "Birds", icon: FaKiwiBird },
  { value: "fish", label: "Aquatic", icon: FaFish },
];

const Petlisting = () => {
  const [pets] = usePets();
  const { user } = useAuth();
  const [favorites, refetchFavorites] = useFavorites();
  const axiosPublic = useAxiosPublic();
  const [displayCategory, setDisplayCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [displayPets, setDisplayPets] = useState([]);
  const [searching, setSearching] = useState(false);

  const handleFavoriteToggle = async (pet, e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      Swal.fire({
        icon: "info",
        title: "Sign in required",
        text: "Please sign in to save companions to your favorites.",
        showConfirmButton: true,
      });
      return;
    }

    const isFav = (favorites || []).some(
      (fav) => fav._id === pet._id || fav.name === pet.name
    );

    if (isFav) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "info",
        title: `${pet.name} is already saved`,
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    try {
      const { _id, ...rest } = pet;
      const favPet = { ...rest, email: user.email };
      const res = await axiosPublic.post("/pets/favorites", favPet);
      if (res.data.insertedId) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: `Saved ${pet.name}!`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetchFavorites();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const petToDisplay = (pets || []).filter(
      (pet) =>
        !pet.adopted &&
        (displayCategory === "all" ||
          pet.category?.toLowerCase() === displayCategory.toLowerCase())
    );
    setDisplayPets(petToDisplay);
  }, [pets, displayCategory]);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) {
      const petToDisplay = (pets || []).filter(
        (pet) =>
          !pet.adopted &&
          (displayCategory === "all" ||
            pet.category?.toLowerCase() === displayCategory.toLowerCase())
      );
      setDisplayPets(petToDisplay);
      return;
    }
    setSearching(true);
    try {
      const response = await axiosPublic.get(
        `/pets/search?name=${encodeURIComponent(query)}`
      );
      setDisplayPets(response.data || []);
    } catch {
      const filtered = (pets || []).filter((pet) =>
        pet.name?.toLowerCase().includes(query.toLowerCase())
      );
      setDisplayPets(filtered);
    } finally {
      setSearching(false);
    }
  };

  const handleClearSearch = () => {
    setQuery("");
    const petToDisplay = (pets || []).filter(
      (pet) =>
        !pet.adopted &&
        (displayCategory === "all" ||
          pet.category?.toLowerCase() === displayCategory.toLowerCase())
    );
    setDisplayPets(petToDisplay);
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Editorial Page Header */}
      <MotionReveal direction="up" distance={16}>
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pill bg-paper-2 border border-rule text-xs font-semibold text-ink mb-4 shadow-xs">
            <FaShieldAlt className="text-mint-deep text-xs" />
            <span>Verified Shelter Network · Health Guarantee Included</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-semibold text-ink tracking-tight">
            Find your companion
          </h1>
          
          <p className="text-base text-ink-2 mt-3 leading-relaxed">
            Every companion animal below has completed clinical health clearances, behavior evaluations, and foster socialization. Filter by species or search by name.
          </p>
        </div>
      </MotionReveal>

      {/* Filter Chips & Interactive Search Toolbar */}
      <MotionReveal direction="up" delay={80} distance={16}>
        <div className="bg-card p-4 sm:p-5 rounded-card border border-rule shadow-sm mb-10 flex flex-col lg:flex-row items-center justify-between gap-5">
          
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {petCategories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = displayCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => {
                    setDisplayCategory(cat.value);
                    setQuery("");
                  }}
                  className={`px-4 py-2 rounded-pill text-xs font-semibold transition-all duration-150 flex items-center gap-2 border ${
                    isSelected
                      ? "bg-ink text-paper border-ink shadow-xs"
                      : "bg-paper-2 border-rule text-ink hover:bg-paper-3 hover:text-ink"
                  }`}
                >
                  <Icon className={`text-xs ${isSelected ? "text-accent" : "text-muted"}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input Form */}
          <form onSubmit={handleSearch} className="flex items-center gap-2 w-full lg:w-88">
            <div className="relative flex-1">
              <MdSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted text-lg" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search companion by name..."
                className="w-full pl-10 pr-9 py-2.5 rounded-pill bg-paper-2 border border-rule text-xs sm:text-sm text-ink placeholder:text-muted focus:outline-none focus:border-ink transition-colors"
              />
              {query && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
                  aria-label="Clear search"
                >
                  <MdClose className="text-base" />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-pill bg-accent hover:bg-accent-deep text-accent-ink font-semibold text-xs transition-colors shrink-0 press-down shadow-xs"
            >
              {searching ? "..." : "Search"}
            </button>
          </form>

        </div>
      </MotionReveal>

      {/* Live Results Counter Bar */}
      <div className="flex items-center justify-between mb-8 pb-3 border-b border-rule/70 text-xs text-muted">
        <span>
          Showing <strong className="text-ink font-semibold">{displayPets.length}</strong> adoptable {displayPets.length === 1 ? "companion" : "companions"}
        </span>
        <span className="hidden sm:inline">All listings vetted by 501(c)(3) sanctuaries</span>
      </div>

      {/* Pet Cards Grid */}
      {displayPets.length <= 0 ? (
        <div className="bg-card rounded-card border border-rule p-12 text-center max-w-lg mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-full bg-paper-2 text-muted text-2xl flex items-center justify-center mx-auto mb-4">
            <FaPaw />
          </div>
          <h3 className="text-xl font-display font-semibold text-ink">
            No companions found
          </h3>
          <p className="text-xs sm:text-sm text-ink-2 mt-2 leading-relaxed">
            No companions match your current search or filter criteria. Try clearing the filter or search term to see all available pets.
          </p>
          <button
            onClick={() => {
              setDisplayCategory("all");
              setQuery("");
            }}
            className="mt-6 px-6 py-2.5 rounded-pill bg-accent text-accent-ink font-semibold text-xs hover:bg-accent-deep transition-colors press-down shadow-xs"
          >
            View all companions
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPets.map((pet, idx) => {
            const isFav = (favorites || []).some(
              (fav) => fav._id === pet._id || fav.name === pet.name
            );

            return (
              <MotionReveal
                key={pet._id}
                delay={(idx % 6) * 60}
                distance={20}
                direction="up"
              >
                <div
                  className="bg-card rounded-card border border-rule overflow-hidden shadow-sm hover-lift flex flex-col justify-between group transition-all hover:border-accent-2/40 hover:shadow-card h-full"
                >
                  <div>
                    {/* Image Stage with Gradient Scrim and Badges */}
                    <div className="relative h-64 w-full overflow-hidden bg-paper-2">
                      <img
                        src={pet.image}
                        alt={pet.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/20 opacity-90 group-hover:opacity-75 transition-opacity"></div>
                      
                      {/* Top Species, Status & Favorite Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="bg-paper/95 backdrop-blur-md px-3 py-1 rounded-pill border border-rule text-[11px] font-semibold text-ink capitalize shadow-xs">
                            {pet.category || "Companion"}
                          </span>
                          <span className="bg-paper/95 backdrop-blur-md px-2.5 py-1 rounded-pill border border-rule text-[11px] font-semibold text-mint-deep shadow-xs flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-mint-deep animate-radar"></span>
                            <span>Ready</span>
                          </span>
                        </div>

                        {/* Interactive Favorite Bookmark Button */}
                        <button
                          onClick={(e) => handleFavoriteToggle(pet, e)}
                          className={`p-2 rounded-full backdrop-blur-md border transition-transform duration-200 press-down shadow-xs ${
                            isFav
                              ? "bg-accent-3 text-white border-accent-3 scale-110"
                              : "bg-paper/90 text-ink hover:text-accent-3 border-rule hover:scale-105"
                          }`}
                          aria-label={`Favorite ${pet.name}`}
                        >
                          <MdFavorite className="text-sm" />
                        </button>
                      </div>

                      {/* Bottom Image Overlay: Age & Shelter Guarantee */}
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                        <span className="text-white text-xs font-semibold bg-black/45 backdrop-blur-sm px-2.5 py-0.5 rounded-pill border border-white/20">
                          Age {pet.age} {pet.age === 1 ? "yr" : "yrs"}
                        </span>
                        <span className="text-[11px] text-white/90 font-medium bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-pill border border-white/10 flex items-center gap-1">
                          <FaShieldAlt className="text-mint text-[10px]" />
                          <span>Health Verified</span>
                        </span>
                      </div>
                    </div>

                    {/* Companion Narrative & Trait Chips */}
                    <div className="p-6">
                      <h3 className="text-2xl font-display font-semibold text-ink group-hover:text-accent-deep transition-colors mb-2">
                        {pet.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-ink-2 line-clamp-2 leading-relaxed mb-4">
                        {pet.short_description ||
                          "Affectionate companion waiting for a kind and loving forever home."}
                      </p>

                      {/* Quick Trait Badges */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        <span className="px-2.5 py-0.5 rounded-pill bg-paper-2 border border-rule text-[11px] text-ink-2 font-medium flex items-center gap-1">
                          <MdCheckCircle className="text-mint-deep text-xs" />
                          <span>Vaccinated</span>
                        </span>
                        <span className="px-2.5 py-0.5 rounded-pill bg-paper-2 border border-rule text-[11px] text-ink-2 font-medium">
                          Foster Socialized
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted pt-3 border-t border-rule/70">
                        <span className="inline-flex items-center gap-1 font-medium text-ink-2 truncate max-w-[170px]">
                          <MdLocationPin className="text-accent-3 text-sm shrink-0" />
                          <span className="truncate">{pet.pet_location}</span>
                        </span>
                        <span className="shrink-0 text-[11px]">
                          {pet.AddedDate ? `Added ${pet.AddedDate}` : "Available today"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="p-6 pt-0">
                    <Link
                      to={`/pet-listing/${pet._id}`}
                      className="w-full py-3 rounded-pill font-semibold text-xs text-accent-ink bg-accent hover:bg-accent-deep hover-lift press-down shadow-xs transition-colors flex items-center justify-center gap-2 group/btn"
                    >
                      <span>Meet {pet.name}</span>
                      <FaArrowRight className="text-[10px] transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </MotionReveal>
            );
          })}
        </div>
      )}

    </div>
  );
};

export default Petlisting;
