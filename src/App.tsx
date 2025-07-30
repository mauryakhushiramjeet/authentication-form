import Form from "./component/Form";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./component/Dashboard";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/dash" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer autoClose={3000} position="top-right" />
    </>
  );
};

export default App;
