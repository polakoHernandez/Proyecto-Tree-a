import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import SearchAppBar from "../../Componentes/General/NavBar";
import styles from "./Estllos/agegarInventarioUI";
import {
  KeyboardDoubleArrowRight,
  KeyboardDoubleArrowLeft,
  Pool,
} from "@mui/icons-material";
import InputSelect from "../../Componentes/General/InputSelect";
import InputGeneral from "../../Componentes/General/InputGeneral";

function AgregarInventario() {
  const [mover, setMover] = useState(false); //MOvercon Piscina
  const [moverUsuario, setMoverUsuarios] = useState(false);
  const [moverParametros, setMoverParametros] = useState(false);
  const [moverQuimicos, setMoverQuimicos] = useState(false);
  const [moverPerfil, setMoverPerfil] = useState(false);

  //*Estado para el display de las vistas
  const [contador, setContador] = useState(1);

  //*Funcion para manejar el contador
  const incrementar = () => {
    if (contador === 3) {
      return;
    }

    setContador(contador + 1);
  };

  const decrementar = () => {
    if (contador === 1) {
      return;
    }
    setContador(contador - 1);
  };
  //Funciones para mover la caja contenedora
  const moverTabla = () => {
    setMover(!mover);
    setMoverUsuarios(false);
    setMoverParametros(false);
    setMoverQuimicos(false);
    setMoverPerfil(false);
  };

  const moverTablaUsuarios = () => {
    setMover(false);
    setMoverUsuarios(!moverUsuario);
    setMoverParametros(false);
    setMoverQuimicos(false);
    setMoverPerfil(false);
  };

  const moverTablaParametros = () => {
    setMover(false);
    setMoverUsuarios(false);
    setMoverParametros(!moverParametros); //
    setMoverQuimicos(false);
    setMoverPerfil(false);
  };

  const moverTablaQuimicos = () => {
    setMover(false);
    setMoverUsuarios(false);
    setMoverParametros(false);
    setMoverQuimicos(!moverQuimicos);
    setMoverPerfil(false);
  };

  const moverTablaPerfil = () => {
    setMover(false);
    setMoverUsuarios(false);
    setMoverParametros(false);
    setMoverQuimicos(false);
    setMoverPerfil(!moverPerfil);
  };
  const stylesAnimation = {
    mainBox: {
      //   backgroundColor: "red",
      height: "87%",
      transition: "ease 0.3s",
      transform:
        mover || moverUsuario || moverParametros || moverQuimicos || moverPerfil
          ? "translateY( 190px)"
          : "translateY(0px)",
    },

    agregar: {
      backgroundColor: "rgb(0,164,228)",
      color: "white",
      fontFamily: "'Nunito Sans', sans-serif",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "35%",
      borderRadius: "10px 0px 0px 0px",
      borderRight: "1px solid white",
      cursor: "pointer",
    },

    inventario: {
      backgroundColor: "rgb(0,164,228)",
      color: "white",
      fontFamily: "'Nunito Sans', sans-serif",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "35%",
      borderRight: "1px solid white",
      cursor: "pointer",
    },

    lote: {
      backgroundColor: "rgb(0,164,228)",
      color: "white",
      fontFamily: "'Nunito Sans', sans-serif",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "30%",
      borderRadius: "0px 10px 0px 0px",
      cursor: "pointer",
    },

    uno: {
      //   backgroundColor: "red",
      height: "100%",
      display: contador === 1 ? "flex" : "none",
      flexDirection: { xs: "column", sm: "column", md: "row" },
      overflowY: "scroll",
    },

    dos: {
      backgroundColor: "blue",
      height: "100%",
      display: contador === 2 ? "flex" : "none",
    },

    tres: {
      backgroundColor: "gray",
      height: "100%",
      display: contador === 3 ? "flex" : "none",
    },
  };

  return (
    <Box sx={{ ...styles.generalContainer }}>
      <SearchAppBar
        onClick={() => moverTabla()}
        moverUsuario={moverTablaUsuarios}
        moverParametros={moverTablaParametros}
        moverQuimicos={moverTablaQuimicos} //
        moverPerfil={moverTablaPerfil}
      ></SearchAppBar>
      <Box sx={{ ...stylesAnimation.mainBox }}>
        <Box sx={{ ...styles.container }}>
          <Box sx={{ ...styles.encabezado }}>
            <Box sx={{ ...styles.tabs }}>
              <Typography sx={{ ...stylesAnimation.agregar }}>
                Agregar
              </Typography>
              <Typography sx={{ ...stylesAnimation.inventario }}>
                Inventario
              </Typography>
              <Typography sx={{ ...stylesAnimation.lote }}>Lote</Typography>
            </Box>
            <Typography sx={{ ...styles.actual }}>Inventario</Typography>
          </Box>
          <Box sx={{ ...styles.formulario }}>
            <Box sx={{ ...styles.containerDatos }}>
              {/* Vista agergar */}
              <Box sx={{ ...stylesAnimation.uno }}>
                <Box sx={{ ...styles.formularioUno }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <InputSelect
                        label="Lista de quimicos"
                        icon={<Pool></Pool>}
                      ></InputSelect>
                    </Grid>

                    <Grid item xs={6}>
                      <InputGeneral
                        label="Cantidad"
                        icon={<Pool></Pool>}
                      ></InputGeneral>
                    </Grid>
                    <Grid item xs={6}>
                      <InputGeneral
                        label="Unidades"
                        icon={<Pool></Pool>}
                      ></InputGeneral>
                    </Grid>

                    <Grid item xs={6}>
                      <InputGeneral
                        label="Lote"
                        icon={<Pool></Pool>}
                      ></InputGeneral>
                    </Grid>

                    <Grid item xs={6}>
                      <InputGeneral
                        label="Fecha"
                        type="date"
                        icon={<Pool></Pool>}
                      ></InputGeneral>
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="contained" sx={{ ...styles.button }}>
                        Guardar
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
                <Box sx={{ ...styles.data }}>
                  <Box sx={{ ...styles.azul }}>
                    <Typography sx={{ ...styles.tittle }} y>
                      Nombre del químico{" "}
                    </Typography>
                    <Typography>xxxxxxx</Typography>
                    <Typography sx={{ ...styles.tittle }}>
                      Cantidad disponible{" "}
                    </Typography>
                    <Typography>xxxxx</Typography>
                  </Box>
                  <Box sx={{ ...styles.dibujo }}>dibujo</Box>
                </Box>
              </Box>
              {/* Vista Inventario */}
              <Box sx={{ ...stylesAnimation.dos }}>2</Box>
              {/* Vista Lote */}
              <Box sx={{ ...stylesAnimation.tres }}>3</Box>
            </Box>

            <Box sx={{ ...styles.containerFlechas }}>
              <IconButton onClick={() => decrementar()}>
                <KeyboardDoubleArrowLeft></KeyboardDoubleArrowLeft>
              </IconButton>
              <IconButton onClick={() => incrementar()}>
                <KeyboardDoubleArrowRight></KeyboardDoubleArrowRight>
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AgregarInventario;
