import { BrowserRouter, Route, Routes } from "react-router-dom";
//Componentes
import { Header, Footer } from './components/index';
//Pages
import { Home, Contact, Login, Register, Reset } from './pages/index';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/reset" element={<Reset />}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;