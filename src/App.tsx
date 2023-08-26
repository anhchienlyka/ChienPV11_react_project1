import ListBooks from "./components/ListBooks";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SearchBook from "./components/SearchBook";
import GetDetailBook from "./components/GetDetailBook";


const App = (): JSX.Element => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListBooks/>} />
          <Route path="/search" element={<SearchBook />} />
          <Route path="/detail/:bookId" element={<GetDetailBook/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
