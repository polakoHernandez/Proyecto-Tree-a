import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import SearchAppBar from "../../Componentes/General/NavBar";
import "../../Estilos/Piscina/misPiscinas.css";
import SearchIcon from "@mui/icons-material/Search";
import Carrusel from "../../Componentes/General/Carrusel";
import ImageSlider from "../../Componentes/General/ImageSlider";
import { NoEncryption } from "@mui/icons-material";
import Backdrop from "../../Componentes/General/BackDrop";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageSliderHorizontal from "../../Componentes/General/ImageSliderHorizontal";

function MisPiscinas() {
  // Estado ara guardar los datos del formulario
  // const [data, setData] = useState({
  //   nombre: "",
  //   departamento: "",
  //   municipio: "",
  //   direccion: "",
  //   uso: "",
  //   caracteristica: "",
  //   temperatura: "",
  //   temperaturaExterna: "",
  //   estructura: "",
  //   instalacion: "",
  //   fotoPiscina: "",
  //   forma: "",
  //   largo: "",
  //   ancho: "",
  //   profundidad: "",
  //   profundidadB: "",
  //   profundidadC: "",
  //   operacion: "",
  //   caudal: "",
  //   climatizado: "",
  //   recirculacionMinimo: "",
  //   recirculacionMaximo: "",
  //   dosificacion: "",
  //   filtro: "",
  //   alturaFiltro: "",
  //   cantidadFiltro: "",
  //   caudalBomba: "",
  //   cantidadBomba: "",
  //   marcaBomba: "",
  //   referenciaBomba: "",
  //   cantidadCalentador: "",
  //   referenciaCalentador: "",
  //   marcaCalentador: "",
  //   fotoPiscina: "",
  //   fotoBomba: "",
  //   fichaTecnica: "",
  //   fichaTecnicaCalentador: "",
  // });

  const [data, setData] = useState("");
  const [pool, setPool] = useState("");
  const [cargando, setCargando] = useState(false);
  //   Estados para mover el fromualrio
  const [mover, setMover] = useState(false); //MOvercon Piscina
  const [moverUsuario, setMoverUsuarios] = useState(false);
  const [moverParametros, setMoverParametros] = useState(false);
  const [moverQuimicos, setMoverQuimicos] = useState(false);
  const [moverPerfil, setMoverPerfil] = useState(false);

  //   Fnciones para mover el romulario
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

  const animationStyles = {
    mainBox: {
      // backgroundColor: "pink",
      height: "87%",
      transition: "ease 0.3s",
      transform:
        mover || moverUsuario || moverParametros || moverQuimicos || moverPerfil
          ? "translateY( 190px)"
          : "translateY(0px)",
    },
  };

  const listaDeMisPiscinas = async () => {
    setCargando(true);
    try {
      const tokenSend = localStorage.getItem("clave");
      const response = await fetch(
        "https://pool-api-treea.vercel.app/v1/pool-by-user/656e4d4ffc0a8a2e68e1bc7e",
        {
          method: "GET",
          headers: {
            Accpet: "Application/json",
            "x-token": tokenSend,
          },
        }
      );

      switch (response.status) {
        case 401:
          //setCargando(false);
          // setOpenModal(true);
          break;

        case 200:
          // alert("OK");
          const responeData = await response.json();

          console.log(responeData);
          setData(responeData);
          setCargando(false);
          break;
      }
    } catch (error) {
      setCargando(false);
      alert("error");
      // setOpenModal(true);
    }
    setCargando(false);
  };

  const obetnerId = (idPool) => {
    const respuesta = data.poolCreatedByUser.find(
      (element) => element._id === idPool
    );
    setPool(respuesta);
  };

  useEffect(() => {
    listaDeMisPiscinas();
    // setReload(false); // Reset reload flag
  }, []);

  return (
    <Box sx={{ ...styles.generalContainer }}>
      <SearchAppBar
        onClick={() => moverTabla()}
        moverUsuario={moverTablaUsuarios}
        moverParametros={moverTablaParametros}
        moverQuimicos={moverTablaQuimicos} //
        moverPerfil={moverTablaPerfil}
      ></SearchAppBar>

      {cargando ? (
        <Backdrop open={cargando}></Backdrop>
      ) : (
        <Box sx={animationStyles.mainBox}>
          <Grid container sx={{ height: "100%" }}>
            <Grid
              item
              xs={0}
              sm={0}
              md={4}
              sx={{
                // backgroundColor: "red",
                height: "100%",
                display: { xs: "none", sm: "none", md: "block" },
              }}
            >
              {data && (
                <ImageSlider data={data} obtenerId={obetnerId}></ImageSlider>
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Grid
                xs={12}
                sx={{
                  width: "100%",
                  // backgroundColor: "red",
                  height: { xs: "25vh", sm: "10vh" },
                  display: { xs: "flex", sm: "flex", md: "none" },
                }}
              >
                {data && (
                  <Carrusel data={data} obtenerId={obetnerId}></Carrusel>
                )}
              </Grid>
              <Grid xs={12} sx={{ height: "15%" }}>
                <Box
                  sx={{
                    // backgroundColor: "cyan",
                    height: "80px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                    marginTop: { xs: "30px", sm: "200px", md: "0px" },
                  }}
                >
                  <Box
                    sx={{
                      marginRight: "73px",
                    }}
                  >
                    <input
                      className="input-buscar"
                      placeholder="Buscar..."
                    ></input>
                    <IconButton
                      sx={{
                        color: "white",
                        backgroundColor: "rgb(0,164,228)",
                        borderRadius: "0px",
                        marginTop: "-1px",
                        marginLeft: "-2px",
                        borderRadius: "0px 5px 5px 0px",
                        height: "42px",
                        "&:hover": {
                          backgroundColor: "rgb(0,164,228)",
                        },
                      }}
                    >
                      <SearchIcon></SearchIcon>
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
              <Grid xs={12} sx={{ height: "85%" }}>
                <Box
                  sx={{
                    width: "95%",
                    marginLeft: "2.5%",
                    // backgroundColor: "antiquewhite",
                    height: "45px",
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <Typography
                    sx={{
                      marginRight: "70px",
                      backgroundColor: "rgb(0,164,228)",
                      height: "100%",
                      width: "150px",
                      borderRadius: "5px 0px 0px 0px",
                      color: "white",
                      display: "flex",
                      textAlign: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Nunito Sans', sans-serif",
                    }}
                  >
                    Mis piscinas
                  </Typography>
                </Box>
                <Box
                  sx={{
                    overflowY: "scroll",
                    backgroundColor: "white",
                    height: { xs: "62vh", sm: "70vh", md: "63vh" },
                    width: { xs: "95%", sm: "95%", md: "90%" },
                    marginLeft: "2.5%",
                    borderRadius: "5px",

                    boxShadow: "0px 5px 5px 0px black",
                    border: "1px solid black",
                  }}
                >
                  {/* Seccion de informacion general */}
                  <Box>
                    {/* foto
                    Nombre
                    departamento
                    ciudad/Muicipio
                    Direccion
                    Uso
                    Caracterisicas
                    Temperatura
                    Tempertaura Externa
                    Estructura
                    Clase de instalacion */}

                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            width: "90%",
                            marginLeft: "5%",
                            fontFamily: "'Nunito Sans', sans-serif",
                            fontSize: "22px",
                            borderBottom: "3px solid black",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingTop: "30px",
                          }}
                        >
                          Información General
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Box
                          sx={{
                            width: "100%",
                            height: "200px",
                          }}
                        >
                          <img src={pool.photo} className="img-piscina"></img>
                        </Box>
                      </Grid>
                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Nombre
                        </Typography>
                        <Typography>{pool.name}</Typography>
                      </Grid>
                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Departamento
                        </Typography>
                        <Typography>{pool.department}</Typography>
                      </Grid>
                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Ciudad/Municipio
                        </Typography>
                        <Typography>{pool.city}</Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Uso
                        </Typography>
                        <Typography>{pool.use}</Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Características
                        </Typography>
                        <Typography>{pool.typePool}</Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Temperatura
                        </Typography>
                        <Typography>{pool.temperature}</Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Temperatura externa
                        </Typography>
                        <Typography>{pool.externalTemperature}</Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Estructura
                        </Typography>
                        <Typography>{pool.category}</Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Clase de istalación
                        </Typography>
                        <Typography>{pool.typeInstallation}</Typography>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Secion de medidas */}
                  <Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            width: "90%",
                            marginLeft: "5%",
                            fontFamily: "'Nunito Sans', sans-serif",
                            fontSize: "22px",
                            borderBottom: "3px solid black",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingTop: "30px",
                          }}
                        >
                          Medidas
                        </Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Forma
                        </Typography>
                        <Typography>{pool.form}</Typography>
                      </Grid>
                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Largo
                        </Typography>
                        <Typography>{pool.height}</Typography>
                      </Grid>
                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Ancho
                        </Typography>
                        <Typography>{pool.width}</Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Proundidad
                        </Typography>
                        <Typography>{pool.maxDepth}</Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Profundidad B
                        </Typography>
                        <Typography>{pool.meanDepth}</Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Profundidad C
                        </Typography>
                        <Typography>{pool.minDepth}</Typography>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Seccion de detalles de operacion */}
                  <Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            width: "90%",
                            marginLeft: "5%",
                            fontFamily: "'Nunito Sans', sans-serif",
                            fontSize: "22px",
                            borderBottom: "3px solid black",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingTop: "30px",
                          }}
                        >
                          Detalles de operación
                        </Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Sistema de operación
                        </Typography>
                        <Typography>{pool.systemOperation}</Typography>
                      </Grid>
                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Caudal
                        </Typography>
                        <Typography>{pool.caudal}</Typography>
                      </Grid>
                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Climatizado
                        </Typography>
                        <Typography>{pool.airConditioned}</Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          P. Recirculació mínimo
                        </Typography>
                        <Typography>{pool.maxDepth}</Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          P. Recirculació máximo
                        </Typography>
                        <Typography>{pool.meanDepth}</Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Dosificación automática
                        </Typography>
                        <Typography>{pool.autoDosing}</Typography>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Seccion de equipos */}
                  <Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            width: "90%",
                            marginLeft: "5%",
                            fontFamily: "'Nunito Sans', sans-serif",
                            fontSize: "22px",
                            borderBottom: "3px solid black",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingTop: "30px",
                          }}
                        >
                          Sección de filtros
                        </Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Filtro
                        </Typography>
                        <Typography>{pool.systemOperation}</Typography>
                      </Grid>
                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Altura del filtro
                        </Typography>
                        <Typography>{pool.caudal}</Typography>
                      </Grid>
                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Cantidad del filtro
                        </Typography>
                        <Typography>{pool.airConditioned}</Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            width: "90%",
                            marginLeft: "5%",
                            fontFamily: "'Nunito Sans', sans-serif",
                            fontSize: "22px",
                            borderBottom: "3px solid black",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingTop: "30px",
                          }}
                        >
                          Sección de bombas
                        </Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Caudal de bomba
                        </Typography>
                        <Typography>{pool.pumpFlow}</Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Cantidad de bombas
                        </Typography>
                        <Typography>{pool.nPumps}</Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Marca de bomba
                        </Typography>
                        <Typography>{pool.pumpBrand}</Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Referencia de bomba
                        </Typography>
                        <Typography>{pool.referencePump}</Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Foto placa de bomba
                        </Typography>
                        <a href={pool.platePhoto} target="_blank">
                          <IconButton>
                            <PictureAsPdfIcon
                              sx={{
                                color: "red",
                              }}
                            ></PictureAsPdfIcon>
                          </IconButton>
                        </a>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Ficha tecnica
                        </Typography>
                        <a href={pool.dataSheetPump} target="_blank">
                          <IconButton>
                            <PictureAsPdfIcon
                              sx={{
                                color: "red",
                              }}
                            ></PictureAsPdfIcon>
                          </IconButton>
                        </a>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            width: "90%",
                            marginLeft: "5%",
                            fontFamily: "'Nunito Sans', sans-serif",
                            fontSize: "22px",
                            borderBottom: "3px solid black",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingTop: "30px",
                          }}
                        >
                          Sección de Calentador
                        </Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Cantidad de calentador
                        </Typography>
                        <Typography>{pool.heaterQuantity}</Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Referencia del calentador
                        </Typography>
                        <Typography>{pool.heaterReference}</Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Marca del calentador
                        </Typography>
                        <Typography>{pool.heaterBrand}</Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Ficha técnica del calentador
                        </Typography>
                        <a href={pool.dataSheetHeater} target="_blank">
                          <IconButton>
                            <PictureAsPdfIcon
                              sx={{
                                color: "red",
                              }}
                            ></PictureAsPdfIcon>
                          </IconButton>
                        </a>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}

export default MisPiscinas;

const styles = {
  generalContainer: {
    overflowX: "hidden",
    height: "100vh",
    // backgroundColor: "red",
  },
};
