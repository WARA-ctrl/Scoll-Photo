import "./App.css";
import PhotoComponent from "./component/PhotoComponent";
import { useEffect, useState } from "react";

function App() {
  const apiKey = `nDvhny3TY6t_AOtcK45N1SEXRfmf5pFv5Doayjlr09E`;

  const [page, setPage] = useState(1);
  const [isLoeding, setIsLoeding] = useState(false);
  const [photos, setPhotos] = useState([]);

  const fetchImage = async () => {
    setIsLoeding(true);
    try {
      const apiUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&page=${page}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setPhotos((oldData) => {
        return [...oldData, ...data];
      });
    } catch (error) {}
    setIsLoeding(false);
  };
  useEffect(() => {
    fetchImage();
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        window.innerHeight + window.scrollY >
          document.body.offsetHeight - 1800 &&
        !isLoeding
      ) {
        setPage((oldPage) => {
          return oldPage + 1;
        });
      }
    });
    return () => window.removeEventListener("scroll", event);
    // eslint-disable-next-line
  }, []);
  return (
    <main>
      <h1> Infinite Scoll Photo | Unsplash API </h1>
      <section className="photos">
        <div className="display-photo">
          {photos.map((data, index) => {
            return <PhotoComponent key={index} {...data} />;
          })}
        </div>
      </section>
    </main>
  );
}

export default App;
