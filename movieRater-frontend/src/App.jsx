//----------WORK IN PROGRESS-------------

// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing.jsx";
import Movies from "./Components/Movies/Movies.jsx";
import Footer from "./Components/Footer.jsx";
import SingleMovieDetails from "./Components/Movies/SingleMovieDetails.jsx";
import "./App.css";

const App = () => {

  return (
    <Router>
      <main>
        <div className="App">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/movies" element={<Movies />}s />
            <Route path="/movies/:id" element={<SingleMovieDetails />} />
          </Routes>
        </div>
        <Footer />
      </main>
    </Router>
  );
};

export default App;
