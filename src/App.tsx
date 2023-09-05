import ListBooks from "./components/ListBooks";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SearchBook from "./components/SearchBook";
import GetDetailBook from "./components/GetDetailBook";
import NotFound from "./components/NotFound";


const App = (): JSX.Element => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListBooks/>} />
          <Route path="/search" element={<SearchBook />} />
          <Route path="/detail/:bookId" element={<GetDetailBook/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
