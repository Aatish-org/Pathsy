import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookingModal from "./BookingModal";
import "./TourDetail.css";

function TourDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tour, setTour] = React.useState(null);
    const [reviews, setReviews] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [reviewsLoading, setReviewsLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const apiBaseUrl = React.useMemo(
        () => (process.env.REACT_APP_API_BASE_URL || "http://localhost:8091").replace(/\/$/, ""),
        []
    );

    React.useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        setError(null);

        fetch(`${apiBaseUrl}/landing/${id}`, { signal: controller.signal })
            .then(async (res) => {
                if (!res.ok) {
                    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
                }
                return res.json();
            })
            .then((data) => setTour(data))
            .catch((e) => {
                if (e?.name === "AbortError") return;
                setError(e);
            })
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, [apiBaseUrl, id]);

    React.useEffect(() => {
        if (!id) return;
        
        const controller = new AbortController();
        setReviewsLoading(true);

        fetch(`${apiBaseUrl}/reviews/tour/${id}`, { signal: controller.signal })
            .then(async (res) => {
                if (!res.ok) {
                    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
                }
                return res.json();
            })
            .then((data) => setReviews(Array.isArray(data) ? data : []))
            .catch((e) => {
                if (e?.name === "AbortError") return;
                console.error("Failed to fetch reviews:", e);
                setReviews([]);
            })
            .finally(() => setReviewsLoading(false));

        return () => controller.abort();
    }, [apiBaseUrl, id]);

    const formatPrice = (value) => {
        if (value === null || value === undefined || value === "") return "";
        const numeric = typeof value === "number" ? value : Number(String(value).replace(/[^0-9.]/g, ""));
        if (!Number.isFinite(numeric)) return String(value);
        try {
            return new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
            }).format(numeric);
        } catch {
            return `₹${numeric.toLocaleString("en-IN")}`;
        }
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={i <= rating ? "star star--filled" : "star"}>
                    ★
                </span>
            );
        }
        return stars;
    };

    if (loading) {
        return (
            <div className="tourDetail">
                <div className="tourDetail__loading">Loading tour details...</div>
            </div>
        );
    }

    if (error || !tour) {
        return (
            <div className="tourDetail">
                <div className="tourDetail__error">
                    <h2>Couldn't load tour details</h2>
                    <p>{error ? String(error.message || error) : "Tour not found"}</p>
                    <button onClick={() => navigate("/")} className="tourDetail__backBtn">
                        ← Back to tours
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="tourDetail">
            <div className="tourDetail__container">
                {/* Header with back button */}
                <div className="tourDetail__header">
                    <button onClick={() => navigate("/")} className="tourDetail__backBtn">
                        ← Back to tours
                    </button>
                </div>

                {/* Hero Image */}
                <div className="tourDetail__hero">
                    {tour.imageurl ? (
                        <img
                            src={tour.imageurl}
                            alt={tour.tourtype || "Tour"}
                            className="tourDetail__heroImg"
                        />
                    ) : (
                        <div className="tourDetail__heroImg tourDetail__heroImg--placeholder" />
                    )}
                </div>

                {/* Content Section */}
                <div className="tourDetail__content">
                    {/* Main Info */}
                    <div className="tourDetail__main">
                        <div className="tourDetail__badge">
                            {String(tour.tourtype || "Tour").toUpperCase()}
                        </div>
                        
                        <h1 className="tourDetail__title">
                            {tour.description || tour.tourtype || "Tour Package"}
                        </h1>

                        {/* Rating placeholder - you can add real ratings later */}
                        <div className="tourDetail__rating">
                            <span className="tourDetail__stars">★★★★★</span>
                            <span className="tourDetail__ratingText">4.9 • 2,431 reviews</span>
                            <span className="tourDetail__provider">Activity provider: Pathsy Travels</span>
                        </div>

                        {/* Quick Info */}
                        <div className="tourDetail__quickInfo">
                            {tour.duration && (
                                <div className="tourDetail__infoItem">
                                    <svg className="tourDetail__icon" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/>
                                    </svg>
                                    <div>
                                        <div className="tourDetail__infoLabel">Duration</div>
                                        <div className="tourDetail__infoValue">{tour.duration}</div>
                                    </div>
                                </div>
                            )}

                            {tour.grouptype && (
                                <div className="tourDetail__infoItem">
                                    <svg className="tourDetail__icon" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                                    </svg>
                                    <div>
                                        <div className="tourDetail__infoLabel">Group type</div>
                                        <div className="tourDetail__infoValue">{tour.grouptype}</div>
                                    </div>
                                </div>
                            )}

                            {tour.availability && (
                                <div className="tourDetail__infoItem">
                                    <svg className="tourDetail__icon" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                                    </svg>
                                    <div>
                                        <div className="tourDetail__infoLabel">Availability</div>
                                        <div className="tourDetail__infoValue">{tour.availability}</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* About this activity */}
                        <div className="tourDetail__section">
                            <h2 className="tourDetail__sectionTitle">About this activity</h2>
                            
                            <div className="tourDetail__features">
                                <div className="tourDetail__feature">
                                    <svg className="tourDetail__featureIcon" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                                    </svg>
                                    <div>
                                        <div className="tourDetail__featureTitle">Free cancellation</div>
                                        <div className="tourDetail__featureDesc">Cancel up to 24 hours in advance for a full refund</div>
                                    </div>
                                </div>

                                <div className="tourDetail__feature">
                                    <svg className="tourDetail__featureIcon" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                    </svg>
                                    <div>
                                        <div className="tourDetail__featureTitle">Reserve now & pay later</div>
                                        <div className="tourDetail__featureDesc">Keep your travel plans flexible — book your spot and pay nothing today</div>
                                    </div>
                                </div>
                            </div>

                            <div className="tourDetail__description">
                                <p>{tour.description || "Experience an unforgettable journey with our curated tour package."}</p>
                            </div>

                            {/* Reviews Section */}
                            <div className="tourDetail__section">
                                <h2 className="tourDetail__sectionTitle">
                                    Reviews {reviews.length > 0 && `(${reviews.length})`}
                                </h2>
                                
                                {reviewsLoading ? (
                                    <div className="tourDetail__reviewsLoading">Loading reviews...</div>
                                ) : reviews.length === 0 ? (
                                    <div className="tourDetail__noReviews">No reviews yet. Be the first to review!</div>
                                ) : (
                                    <div className="tourDetail__reviews">
                                        {reviews.map((review) => (
                                            <div key={review.id} className="reviewCard">
                                                <div className="reviewCard__header">
                                                    <div className="reviewCard__avatar">
                                                        {review.reviewerName ? review.reviewerName.charAt(0).toUpperCase() : "?"}
                                                    </div>
                                                    <div className="reviewCard__info">
                                                        <div className="reviewCard__name">
                                                            {review.reviewerName || "Anonymous"}
                                                        </div>
                                                        <div className="reviewCard__date">
                                                            {review.reviewDate || "No date"}
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="reviewCard__rating">
                                                    {renderStars(review.rating || 0)}
                                                    <span className="reviewCard__ratingValue">
                                                        {review.rating || 0}/5
                                                    </span>
                                                </div>
                                                
                                                <div className="reviewCard__comment">
                                                    {review.comment || "No comment provided."}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Booking Sidebar */}
                    <aside className="tourDetail__sidebar">
                        <div className="tourDetail__bookingCard">
                            <div className="tourDetail__priceSection">
                                <span className="tourDetail__priceLabel">From</span>
                                <span className="tourDetail__priceAmount">
                                    {formatPrice(tour.price) || "Contact for price"}
                                </span>
                                <span className="tourDetail__pricePer">per person</span>
                            </div>

                            <button 
                                className="tourDetail__bookBtn"
                                onClick={() => setIsModalOpen(true)}
                            >
                                Check availability
                            </button>

                            <div className="tourDetail__bookingFeatures">
                                <div className="tourDetail__bookingFeature">
                                    <svg className="tourDetail__bookingIcon" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                    </svg>
                                    <span>Free cancellation</span>
                                </div>
                                <div className="tourDetail__bookingFeature">
                                    <svg className="tourDetail__bookingIcon" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                    </svg>
                                    <span>Reserve now & pay later</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Booking Modal */}
            <BookingModal 
                tour={tour}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                formatPrice={formatPrice}
            />
        </div>
    );
}

export default TourDetail;
