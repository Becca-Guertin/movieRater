//----------WORK IN PROGRESS-------------

// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing.jsx";
import Movies from "./Components/Movies/Movies.jsx";
import Footer from "./Components/Footer.jsx";
import LogitEpMovies from "./Components/Logit/LogitEpMovies.jsx"
import SingleMovieDetails from "./Components/Movies/SingleMovieDetails.jsx";
import LogitEpMovieDetails from "./Components/Logit/LogitEpMovieDetails.jsx";
import "./App.css";

const App = () => {

  return (
    <Router>
      <main>
        <div className="App">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/movies" element={<Movies />}/>
            <Route path="/logit-movies" element={<LogitEpMovies/>} />
            <Route path="/logit-movies/:id" element={<LogitEpMovieDetails/>} />
            <Route path="/movies/:id" element={<SingleMovieDetails />} />
          </Routes>
        </div>
        <Footer />
      </main>
    </Router>
  );
};

export default App;
