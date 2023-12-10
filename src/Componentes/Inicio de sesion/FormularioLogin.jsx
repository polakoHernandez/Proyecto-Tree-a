import React from "react";
import { Box } from "@mui/material";
import Logo from "../../../public/Logo-Tree-a.ico";
import "../../Estilos/Login/formularioLogin.css";
import User from "../../assets/avatar-user.svg";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

function FormularioLogin({ container }) {
  return (
    <Box>
      <Box className={container}>
        <Box className="container-cabecera">
          <Box>
            <img src={Logo} alt="" className="logo-tree-formulario" />
          </Box>
          <Box className="cerrar">X</Box>
        </Box>
        <Box className="container-mensaje-bienvenido">
          <Box className="mensaje-bienvenido">Bienvenido</Box>
          <Box className="container-avatar-user">
            <img src={User} alt="" className="avatar-user" />
          </Box>
        </Box>
        <Box className="container-inputs">
          <Box className="container-inputs-form">
            <Box className="container-input-icon">
              <AlternateEmailIcon className="icon-email"></AlternateEmailIcon>
              <input type="text" placeholder="Email" className="input-form" />
            </Box>
            <Box className="container-input-pass">
              <VisibilityOffIcon className="icon-password"></VisibilityOffIcon>
              <input
                type="text"
                placeholder="Contraseña"
                className="input-form"
              />
            </Box>
          </Box>
        </Box>
        <Box className="container-boton-msg">
          <Box>
            <Box>
              <button className="button-sesion">Iniciar Sesión</button>
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <a href="" className="msg-olvido">
              Olvide mi contraseña
            </a>
          </Box>
        </Box>
        <Box className="container-logos-msg">
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <p className="msg-conoce-mas">Conoce más acerca de nosotros</p>
          </Box>
          <Box>
            <Box className="contenedor-logos">
              <a href="" className="icon-social">
                <FacebookIcon></FacebookIcon>
              </a>
              <a href="" className="icon-social">
                <InstagramIcon></InstagramIcon>
              </a>
              <a href="" className="icon-social">
                <LinkedInIcon></LinkedInIcon>
              </a>
              <a href="" className="icon-social">
                <WhatsAppIcon></WhatsAppIcon>
              </a>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default FormularioLogin;
