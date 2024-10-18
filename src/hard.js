import React, { useState, useEffect } from "react";
import "./hard.css"; // importing hard.css file

const Hard = () => {
    // using useState react hook to manage state 
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchPhotos();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

//   Here we are  fetching data from given api
  const fetchPhotos = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=5`
      );
      const data = await response.json();
      if (data.length === 0) {
        setHasMore(false);
      }
      setPhotos((prevPhotos) => [...prevPhotos, ...data]);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
    setLoading(false);
  };
 
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      !loading
    ) {
      fetchPhotos();
    }
  };

  return (
    <div className="app-container">
      <h1>Hard</h1>
      <p className="scroll-text">You can scroll it.</p>

      <div className="scroll-container">
        <div className="card-container">
          {/* iterating over the images using map */}
          {photos.map((photo, index) => (
            <div className="card" key={index}>
              <img src={photo.url} alt={`Cat ${index}`} className="cat-image" />
            </div>
          ))}
        </div>

        {!hasMore && !loading && (
          <div className="error-message">No more photos to load.</div>
        )}
      </div>
      {/* when we reach at the bottom then it load more images to provide infinte scroll 
that helps in optimization and reduce the website loading time  */}
      {loading && <div className="loading">Loading more photos...</div>}
    </div>
  );
};

export default Hard;
