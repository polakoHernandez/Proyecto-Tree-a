// Importa useState y useEffect de React
import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import "../../Estilos/Login/login.css";
import pool1 from "../../assets/pool1.jpg";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Logo from "../../../public/Logo-Tree-a.ico";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FormularioLogin from "../../Componentes/Inicio de sesion/FormularioLogin";

function Login() {
  const [btnWhatsApp, setBtnWhatsApp] = useState("container-boton");
  const [btnSesion, setBtnSesion] = useState("container-boton-inicio-sesion");
  const [letrero1, setLetrero1] = useState("container-letrero1");
  const [letrero2, setLetrero2] = useState("container-letrero2");
  const [mensaje, setMensaje] = useState("container-mensaje");
  const [conjunto, setConjunto] = useState("container-logos");
  const [tree, setTree] = useState("container-imagen-tree");
  const [mvWhat, setMvWhat] = useState("icon-whatsApp");
  const [formulario, setFormulario] = useState("container-formulario");

  const cambioClase = () => {
    setBtnWhatsApp("container-boton-efecto");
    setMensaje("container-mensaje-efecto");
    setConjunto("container-logos-efecto");
    setLetrero1("container-letrero1-efecto");
    setLetrero2("container-letrero2-efecto");
    setBtnSesion("container-boton-inicio-sesion-efecto");
    setTree("container-imagen-tree-efecto");
    setFormulario("container-formulario-efecto");
    setMvWhat("icon-whatsApp-efecto");
  };

  return (
    <Box>
      <Grid container className="container-contenido">
        {/* Contenedor de la imagen */}
        <Grid item xs={12} className="container-imagen">
          <img src={pool1} alt="pool1" className="imagen-pool1" />
          <Box className={mensaje}>
            <p>Conoce más acerca de nosotros</p>
          </Box>
          <Box className={conjunto}>
            <a className="logos">
              <FacebookIcon></FacebookIcon>
            </a>
            <a className="logos">
              <InstagramIcon></InstagramIcon>
            </a>
            <a className="logos">
              <LinkedInIcon></LinkedInIcon>
            </a>
            <a className="logos">
              <WhatsAppIcon></WhatsAppIcon>
            </a>
          </Box>
        </Grid>

        {/* Contenedor de las secciones */}
        <Grid
          item
          xs={12}
          className="container-secciones"
          sx={{ flexDirection: { xs: "column", sm: "row" } }}
        >
          {/* seccion de la izquierda */}

          <Box className="container-seccion-izquierda">
            <Box className={letrero1}>
              <p className="letrero1">¿No tienes Cuenta?</p>
            </Box>
            <Box className={letrero2}>
              <p className="letrero2">Comunicate con nosotros</p>
            </Box>
            <Box className={btnWhatsApp}>
              <a
                // className={btnWhatsApp}
                className="boton-whatsApp"
                href="https://api.whatsapp.com/send?phone=573158094833&text=Hola%2C%20¿cómo%20estás%3F"
              >
                WhatsApp
              </a>
              <WhatsAppIcon className={mvWhat}></WhatsAppIcon>
            </Box>
          </Box>

          {/* Seccion Derecha */}
          <Box className="container-seccion-derecha">
            <Box className={tree}>
              <img src={Logo} alt="" className="imagen-tree" />
            </Box>
            <Box className={btnSesion}>
              <a
                className="boton-whatsApp boton-inicio-sesion"
                onClick={() => cambioClase()}
              >
                Iniciar Sesión
              </a>
              <AccountCircleIcon className="icon-user"></AccountCircleIcon>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <FormularioLogin container={formulario}></FormularioLogin>
    </Box>
  );
}

export default Login;
