import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SortedNumbersComponent from "./components/numbers/SortedNumbersComponent";
import Layout from "./components/layout/Layout";

const App = () => {
  return (
      <Router>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                  <SortedNumbersComponent />
              }
            />
          </Routes>
        </Layout>
      </Router>
  );
};

export default App;
