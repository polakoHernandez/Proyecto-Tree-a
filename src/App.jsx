import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Vistas/Inicio de sesion/Login";
import Principal from "./Vistas/Principal/Principal";
import TemporaryDrawer from "./Componentes/General/SideBar";
import CrearUsuario from "./Vistas/Usuarios/CrearUsuario";
import ListaDeUsuarios from "./Vistas/Usuarios/ListaDeUsuarios";
import MyComponent from "./Componentes/General/Paginatio";
import CrearPiscina from "./Vistas/Piscina/CrearPiscina";
import EditarUsuario from "./Vistas/Usuarios/EditarUsuario";
import MisPiscinas from "./Vistas/Piscina/MisPiscinas";
import Carrusel from "./Componentes/General/Carrusel";
import ImageSlider from "./Componentes/General/ImageSlider";
import GestionarPiscinas from "./Vistas/Piscina/GestionarPiscinas";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login></Login>} />
          <Route path="/principal" element={<Principal></Principal>} />
          <Route
            path="/sidebar"
            element={<TemporaryDrawer></TemporaryDrawer>}
          />
          <Route path="/crearUsuario" element={<CrearUsuario></CrearUsuario>} />
          <Route
            path="/listaDeUsuarios"
            element={<ListaDeUsuarios></ListaDeUsuarios>}
          />
          <Route path="/Pagination" element={<MyComponent></MyComponent>} />
          <Route path="/CrearPiscina" element={<CrearPiscina></CrearPiscina>} />
          <Route
            path="/EditarUsuario"
            element={<EditarUsuario></EditarUsuario>}
          ></Route>
          <Route
            path="/misPiscinas"
            element={<MisPiscinas></MisPiscinas>}
          ></Route>

          <Route
            path="/gestionarPiscinas"
            element={<GestionarPiscinas></GestionarPiscinas>}
          ></Route>

          <Route path="/carrousel" element={<Carrusel></Carrusel>}></Route>
          <Route path="/imageSlider" element={<Carrusel></Carrusel>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
