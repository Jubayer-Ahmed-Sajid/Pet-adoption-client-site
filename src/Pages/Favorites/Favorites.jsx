import { Link } from "react-router-dom";
import useFavorites from "../../Components/Hooks/useFavorites";
import { MdLocationPin, MdDeleteOutline, MdFavorite } from "react-icons/md";
import { FaPaw, FaArrowRight } from "react-icons/fa";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Favorites = () => {
  const [favorites, refetch] = useFavorites();
  const axiosPublic = useAxiosPublic();

  const handleRemove = async (id, name) => {
    try {
      const deleteFav = await axiosPublic.delete(`/pets/favorites/${id}`);
      if (deleteFav.data?.deletedCount) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${name || "Pet"} removed from saved favorites`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Removal failed",
        text: err.message,
      });
    }
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-accent-3/15 text-accent-3 text-xs font-semibold mb-3">
          <MdFavorite className="text-sm" />
          <span>Your Shortlisted Companions</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-ink tracking-tight">
          Saved favorites
        </h1>
        <p className="text-sm sm:text-base text-ink-2 mt-2 leading-relaxed">
          Companions you have saved for adoption consideration. Review their profiles or submit an application.
        </p>
      </div>

      {(!favorites || favorites.length === 0) ? (
        <div className="bg-card rounded-card border border-rule p-12 text-center max-w-md mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-full bg-paper-2 text-muted text-2xl flex items-center justify-center mx-auto mb-4">
            <FaPaw />
          </div>
          <h3 className="text-xl font-display font-semibold text-ink">
            No saved favorites yet
          </h3>
          <p className="text-xs sm:text-sm text-ink-2 mt-2 leading-relaxed">
            Browse our directory of adoptable rescue pets and click the heart icon on any profile to save them here.
          </p>
          <Link
            to="/pet-listing"
            className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-pill bg-accent text-accent-ink font-semibold text-xs hover:bg-accent-deep transition-colors shadow-xs press-down"
          >
            <span>Browse adoptable pets</span>
            <FaArrowRight className="text-[10px]" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((pet) => (
            <div
              key={pet._id}
              className="bg-card rounded-card border border-rule overflow-hidden shadow-sm hover-lift flex flex-col justify-between group transition-all hover:border-accent-deep/50 hover:shadow-card"
            >
              <div>
                {/* Photo Stage */}
                <div className="relative h-56 w-full overflow-hidden bg-paper-2">
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Species Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-paper/95 backdrop-blur-md px-2.5 py-1 rounded-pill border border-rule text-[11px] font-semibold text-ink capitalize shadow-xs">
                      {pet.category || "Companion"}
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(pet._id, pet.name)}
                    title="Remove from favorites"
                    className="absolute top-3 right-3 p-2 rounded-full bg-paper/95 backdrop-blur-md text-ink hover:text-accent-3 border border-rule shadow-xs transition-colors"
                  >
                    <MdDeleteOutline className="text-base" />
                  </button>

                  {/* Age pill on image */}
                  <div className="absolute bottom-3 left-3">
                    <span className="text-white text-[11px] font-semibold bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-pill border border-white/20">
                      Age {pet.age} {pet.age === 1 ? "yr" : "yrs"}
                    </span>
                  </div>
                </div>

                {/* Narrative Details */}
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

              {/* Action Button */}
              <div className="p-5 pt-0">
                <Link
                  to={`/pet-listing/${pet._id}`}
                  className="w-full py-2.5 rounded-pill font-semibold text-xs text-accent-ink bg-accent hover:bg-accent-deep hover-lift press-down shadow-xs transition-colors flex items-center justify-center gap-2 group/btn"
                >
                  <span>View Profile & Apply</span>
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

export default Favorites;
