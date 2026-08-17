import Image from "next/image";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Computer Science Major",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    comment:
      "The acoustic soundproof pod on Floor 3 saved my finals week. Fast gigabit Wi-Fi and zero background noise!",
    date: "2 days ago",
  },
  {
    id: 2,
    name: "Samantha Chen",
    role: "Medical Student",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    comment:
      "Booking a study nook is effortless. The real-time availability and comfortable ergonomic seating are unmatched.",
    date: "1 week ago",
  },
  {
    id: 3,
    name: "Marcus Vance",
    role: "Research Fellow",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 4,
    comment:
      "Great atmosphere for team hackathons and project collaboration. Power outlets at every desk make all the difference.",
    date: "2 weeks ago",
  },
];

const RatingPage = () => {
  return (
    <section className="bg-base-200/40 py-7 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
     
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold mb-3">
            <FaStar className="text-white h-3 w-3" /> Community Feedback
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-base-content sm:text-4xl">
            Loved by{" "}
            <span className="text-primary">Students & Researchers</span>
          </h2>
          <p className="mt-3 text-sm text-base-content/70">
            See what learners have to say about their focus sessions and private
            study pods.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="card border border-base-300 bg-base-100 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1 text-warning">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? "text-warning" : "text-base-300"
                        }`}
                      />
                    ))}
                  </div>
                  <FaQuoteLeft className="text-base-content/20 text-lg" />
                </div>

                <p className="text-sm text-base-content/80 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3 border-t border-base-300/60 pt-4">
                <div className="relative h-10 w-10 overflow-hidden rounded-full border border-primary/20">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-base-content truncate">
                    {review.name}
                  </h4>
                  <p className="text-xs text-base-content/60 truncate">
                    {review.role}
                  </p>
                </div>
                <span className="text-[11px] text-base-content/50 whitespace-nowrap">
                  {review.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RatingPage;
