// import { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing.jsx";
import Movies from "./Components/Movies/Movies.jsx";
import SingleMovieDetails from "./Components/Movies/SingleMovieDetails.jsx";
import "./App.css";

const App = () => {
  // const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<SingleMovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
