import React, { useState, useEffect } from "react";
import "./medium.css";// importing medium.css file

const Medium = () => {
  const [allCats, setAllCats] = useState([]); // Store all fetched cats images
  const [catsToShow, setCatsToShow] = useState([]); // Store current page
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Page state for pagination

  //   Here we are  fetching data from given api
  const fetchCatData = async () => {
    setLoading(true);
    setError(null); // Reset error before new fetch
    try {
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search?limit=10&page=1&order=Desc"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      if (data.length === 0) {
        setError("No data found");
      } else {
        setAllCats(data); // store all fetched cats
        setPage(1); // reset to page 1
        paginateData(data, 1); // display first page data
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // function to paginate data (3 cats per page, last page can have remaining)
  const paginateData = (data, page) => {
    const itemsPerPage = 4;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page === 3 ? data.length : startIndex + itemsPerPage; // last page can have remaining images
    setCatsToShow(data.slice(startIndex, endIndex));
  };

  const handleNextPage = () => {
    if (page < 3) {
      // Maximum 3 pages
      setPage(page + 1);
      paginateData(allCats, page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      paginateData(allCats, page - 1);
    }
  };

  return (
    <div className="app-container-medium">
      <h1>Medium</h1>
      <button onClick={fetchCatData} className="fetch-button">
        Click
      </button>

      {/* Handing Loading state */}
      {loading && <p>Loading...</p>}

      {/* Handing Error state */}
      {error && <p className="error-message">{error}</p>}

      {/* Handing Empty state */}
      {!loading && !error && allCats.length === 0 && <p>No cats found.</p>}

      {/* Grid of cards */}
      <div className="card-grid-m">
        {catsToShow.map((cat, index) => (
          <div key={index} className="card-m">
            <img src={cat.url} alt="Cat" className="cat-image-m" />
          </div>
        ))}
      </div>

      {/* Pagination buttons */}
      {allCats.length > 0 && (
        <div className="pagination">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className="pagination-button"
          >
            Previous
          </button>
          {/* here page shows the current page no. */}
          <div>Page {page}</div>
          <button
            onClick={handleNextPage}
            disabled={page === 3} // Maximum page is 3
            className="pagination-button"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Medium;
