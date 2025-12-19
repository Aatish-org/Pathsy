import React, { useState } from "react";
import "./BookingModal.css";

function BookingModal({ tour, isOpen, onClose, formatPrice }) {
    const [selectedDate, setSelectedDate] = useState("");
    const [participants, setParticipants] = useState(1);

    if (!isOpen || !tour) return null;

    const handleBooking = () => {
        alert(`Booking confirmed for ${participants} participant(s) on ${selectedDate}`);
        onClose();
    };

    const totalPrice = (tour.price || 0) * participants;

    return (
        <div className="bookingModal" onClick={onClose}>
            <div className="bookingModal__content" onClick={(e) => e.stopPropagation()}>
                <button className="bookingModal__close" onClick={onClose}>
                    ×
                </button>

                <h2 className="bookingModal__title">Complete your booking</h2>

                <div className="bookingModal__body">
                    {/* Tour Info */}
                    <div className="bookingModal__tourInfo">
                        {tour.imageurl && (
                            <img 
                                src={tour.imageurl} 
                                alt={tour.tourtype}
                                className="bookingModal__tourImage"
                            />
                        )}
                        <div className="bookingModal__tourDetails">
                            <h3 className="bookingModal__tourTitle">
                                {tour.description || tour.tourtype}
                            </h3>
                            <div className="bookingModal__tourMeta">
                                <div className="bookingModal__rating">
                                    ★★★★★ <span>4.9 (2,431)</span>
                                </div>
                                <div className="bookingModal__badge">Top rated</div>
                            </div>
                        </div>
                    </div>

                    {/* Booking Details */}
                    <div className="bookingModal__section">
                        <h4 className="bookingModal__sectionTitle">Select date & time</h4>
                        <input
                            type="date"
                            className="bookingModal__input"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                        />
                        {tour.duration && (
                            <div className="bookingModal__info">
                                <svg className="bookingModal__icon" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/>
                                </svg>
                                <span>Duration: {tour.duration}</span>
                            </div>
                        )}
                    </div>

                    <div className="bookingModal__section">
                        <h4 className="bookingModal__sectionTitle">Number of participants</h4>
                        <div className="bookingModal__counter">
                            <button 
                                className="bookingModal__counterBtn"
                                onClick={() => setParticipants(Math.max(1, participants - 1))}
                                disabled={participants <= 1}
                            >
                                −
                            </button>
                            <span className="bookingModal__counterValue">{participants} adult</span>
                            <button 
                                className="bookingModal__counterBtn"
                                onClick={() => setParticipants(participants + 1)}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {tour.grouptype && (
                        <div className="bookingModal__info">
                            <svg className="bookingModal__icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                            </svg>
                            <span>{tour.grouptype}</span>
                        </div>
                    )}

                    <div className="bookingModal__info">
                        <svg className="bookingModal__icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        <span>Language: English</span>
                    </div>

                    {/* Pricing Summary */}
                    <div className="bookingModal__summary">
                        <div className="bookingModal__summaryRow">
                            <span>Subtotal ({participants} item{participants > 1 ? 's' : ''})</span>
                            <span className="bookingModal__price">
                                {formatPrice(totalPrice)}
                            </span>
                        </div>
                        <div className="bookingModal__summaryNote">
                            All taxes and fees included
                        </div>
                        <div className="bookingModal__summaryTotal">
                            <span>Total</span>
                            <span className="bookingModal__totalPrice">
                                {formatPrice(totalPrice)}
                            </span>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="bookingModal__features">
                        <div className="bookingModal__feature">
                            <svg className="bookingModal__featureIcon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                            <span>Free cancellation up to 24 hours</span>
                        </div>
                        <div className="bookingModal__feature">
                            <svg className="bookingModal__featureIcon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                            <span>Reserve now & pay later</span>
                        </div>
                    </div>

                    {/* Checkout Button */}
                    <button 
                        className="bookingModal__checkoutBtn"
                        onClick={handleBooking}
                        disabled={!selectedDate}
                    >
                        Go to checkout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BookingModal;
