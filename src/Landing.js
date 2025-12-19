import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

function Landing(){
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiBaseUrl = useMemo(
        () => (process.env.REACT_APP_API_BASE_URL || "http://localhost:8091").replace(/\/$/, ""),
        []
    );

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        setError(null);

        fetch(`${apiBaseUrl}/landing/`, { signal: controller.signal })
            .then(async (res) => {
                if (!res.ok) {
                    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
                }
                return res.json();
            })
            .then((rows) => setData(Array.isArray(rows) ? rows : []))
            .catch((e) => {
                if (e?.name === "AbortError") return;
                setError(e);
            })
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, [apiBaseUrl]);

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

    return(
        <div className="landing">
            {/* Hero Section */}
            <div className="landing__hero">
                <div className="landing__heroOverlay">
                    <h2 className="landing__heroTitle">Book Your Next Trip</h2>
                </div>
            </div>

            <div className="landing__container">

                {loading ? (
                    <div className="landing__state">Loading tours…</div>
                ) : error ? (
                    <div className="landing__state landing__state--error">
                        Couldn’t load tours. {String(error.message || error)}
                    </div>
                ) : data.length === 0 ? (
                    <div className="landing__state">No tours available.</div>
                ) : (
                    <section className="landing__grid" aria-label="Tour packages">
                        {data.map((obj, index) => {
                            const key = obj?.price ?? `${obj?.tourtype ?? "tour"}-${index}`;
                            const title = obj?.description || obj?.tourtype || "Tour";
                            const badge = String(obj?.tourtype || "Tour").toUpperCase();
                            const price = formatPrice(obj?.price);

                            return (
                                <article className="tourCard" key={key}>
                                    <div className="tourCard__media">
                                        {obj?.imageurl ? (
                                            <img
                                                className="tourCard__img"
                                                src={obj.imageurl}
                                                alt={obj?.tourtype ? `${obj.tourtype} tour` : "Tour"}
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="tourCard__img tourCard__img--placeholder" aria-hidden="true" />
                                        )}
                                    </div>

                                    <div className="tourCard__body">
                                        <div className="tourCard__badge">{badge}</div>
                                        <h2 
                                            className="tourCard__title tourCard__title--clickable" 
                                            title={title}
                                            onClick={() => navigate(`/tour/${obj.price}`)}
                                        >
                                            {title}
                                        </h2>

                                        <div className="tourCard__meta">
                                            {obj?.duration ? <span>{obj.duration}</span> : null}
                                            {obj?.availability ? <span>{obj.availability}</span> : null}
                                            {obj?.grouptype ? <span>{obj.grouptype}</span> : null}
                                        </div>

                                        <div className="tourCard__footer">
                                            <span className="tourCard__priceLabel">From</span>
                                            <span className="tourCard__price">{price || "—"}</span>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </section>
                )}
            </div>
        </div>
    )
}
export default Landing;