import React, { useState } from "react";
import "./easy.css"; // importing easy.css file

const Easy = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //   Here we are  fetching data from given api
  const fetchCatData = async () => {
    setLoading(true);
    setError(null); // reset error before new fetch
    try {
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search?limit=5&page=10&order=Desc"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      if (data.length === 0) {
        setError("No data found");
      } else {
        setCats(data);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container-easy">
      <h1>Easy</h1>
      <button onClick={fetchCatData} className="fetch-button-easy">
        Click
      </button>

      {/* Handing Loading state */}
      {loading && <p>Loading...</p>}

      {/* Handing Error state */}
      {error && <p className="error-message">{error}</p>}

      {/* Handing Empty state */}
      {!loading && !error && cats.length === 0 && <p>No cats found.</p>}

      {/* Grid of cards which contains images */}
      <div className="card-grid-easy">
        {/* iterating on image using map */}
        {cats.map((cat, index) => (
          <div key={index} className="card-easy">
            <img src={cat.url} alt="Cat" className="cat-image-easy" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Easy;
