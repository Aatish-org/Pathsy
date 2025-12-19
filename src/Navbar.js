import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        // Add search functionality later
        console.log("Searching for:", searchQuery);
    };

    return (
        <nav className="navbar">
            <div className="navbar__container">
                {/* Logo */}
                <div className="navbar__logo" onClick={() => navigate("/")}>
                    PATHSY.
                </div>

                {/* Search Bar */}
                <form className="navbar__search" onSubmit={handleSearch}>
                    <svg className="navbar__searchIcon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                    </svg>
                    <input
                        type="text"
                        className="navbar__searchInput"
                        placeholder="Find places and things to do"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="navbar__searchBtn">
                        Search
                    </button>
                </form>

                {/* Right Side Icons */}
                <div className="navbar__actions">
                    <button className="navbar__iconBtn" title="Wishlist">
                        <svg className="navbar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                        <span className="navbar__iconLabel">Wishlist</span>
                    </button>

                    <button className="navbar__iconBtn" title="Cart">
                        <svg className="navbar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="9" cy="21" r="1"/>
                            <circle cx="20" cy="21" r="1"/>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                        </svg>
                        <span className="navbar__iconLabel">Cart</span>
                    </button>

                    <button className="navbar__iconBtn navbar__iconBtn--currency" title="Language & Currency">
                        <svg className="navbar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="2" y1="12" x2="22" y2="12"/>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                        </svg>
                        <span className="navbar__iconLabel">EN/INR ₹</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
