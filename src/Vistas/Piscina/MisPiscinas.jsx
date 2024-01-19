import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import SearchAppBar from "../../Componentes/General/NavBar";
import SearchIcon from "@mui/icons-material/Search";
import Backdrop from "../../Componentes/General/BackDrop";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import SliderHorizontal from "../../Componentes/General/SliderHorizontal";
import SliderVertical from "../../Componentes/General/SliderVertical";
import { Girl } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

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

  const location = useLocation();
  const idProp = new URLSearchParams(location.search).get("idProp");
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
        "https://treea-piscinas-api.vercel.app/v1/pool-by-user/656e4d4ffc0a8a2e68e1bc7e",
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
      console.error("Error during data fetching:", error);
      // setOpenModal(true);
    }
    setCargando(false);
  };

  const obetnerId = async (idPool) => {
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
                height: "100%",
                display: { xs: "none", sm: "none", md: "flex" },
              }}
            >
              {data && (
                <SliderVertical
                  data={data}
                  obtenerId={obetnerId}
                ></SliderVertical>
                // <ImageSlider data={data} obtenerId={obetnerId}></ImageSlider>
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Grid
                xs={12}
                sx={{
                  width: "100%",
                  // backgroundColor: "red",
                  paddingTop: "10px",
                  height: { xs: "300px", sm: "40vh" },
                  display: { xs: "flex", sm: "flex", md: "none" },
                }}
              >
                {/* <SliderHorizontal
                  data={data}
                  obtenerId={obetnerId}
                ></SliderHorizontal> */}
                {data && (
                  <SliderHorizontal
                    data={data}
                    obtenerId={obetnerId}
                  ></SliderHorizontal>
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
                            // backgroundColor: "red",
                            width: "100%",
                            height: "200px",
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "100px",
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
                          Temperatura °C
                        </Typography>
                        <Typography>{pool.temperature}°C</Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Temperatura externa °C
                        </Typography>
                        <Typography>{pool.externalTemperature}°C</Typography>
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
                          Profundidad A (m)
                        </Typography>
                        <Typography>
                          {pool.depth && pool.depth.depthA !== undefined
                            ? pool.depth.depthA
                            : ""}
                        </Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Profundidad B (m)
                        </Typography>
                        <Typography>
                          {pool.depth && pool.depth.depthB !== undefined
                            ? pool.depth.depthB
                            : ""}
                        </Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Profundidad C (m)
                        </Typography>
                        <Typography>
                          {pool.depth && pool.depth.depthC !== undefined
                            ? pool.depth.depthC
                            : ""}
                        </Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Proundidad máxima (m)
                        </Typography>
                        <Typography>
                          {pool.maxDepth === undefined ? "" : pool.maxDepth}
                        </Typography>
                      </Grid>
                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Profundidad minima (m)
                        </Typography>
                        <Typography>
                          {pool.minDepth === undefined ? "" : pool.minDepth}
                        </Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Profundidad media (m)
                        </Typography>
                        <Typography>
                          {pool.meanDepth === undefined ? "" : pool.meanDepth}
                        </Typography>
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

                      <Box
                        sx={{
                          ...styles.boxListadoFiltros,
                        }}
                      >
                        {pool === "" ? (
                          <Typography>No data</Typography>
                        ) : (
                          pool.filters.map((elemento, index) => (
                            <Grid
                              container
                              xs={12}
                              marginTop={1}
                              marginBottom={1}
                            >
                              <Grid xs={12}>
                                <Typography
                                  sx={{
                                    ...styles.fontTypografy,
                                    width: "20%",
                                    marginLeft: "40%",
                                    borderBottom: "2px solid black",
                                    marginBottom: "5px",
                                  }}
                                >
                                  Filtro {index + 1}
                                </Typography>
                              </Grid>
                              <Grid item xs={4}>
                                <Typography sx={{ ...styles.fontTypografy }}>
                                  Filtro
                                </Typography>
                                <Typography sx={{ ...styles.fontTexto }}>
                                  {elemento.filter}
                                </Typography>
                              </Grid>

                              <Grid item xs={4}>
                                <Typography sx={{ ...styles.fontTypografy }}>
                                  Altua del filtro
                                </Typography>
                                <Typography sx={{ ...styles.fontTexto }}>
                                  {elemento.filterBedHeight}
                                </Typography>
                              </Grid>

                              <Grid item xs={4}>
                                <Typography sx={{ ...styles.fontTypografy }}>
                                  Capacidad del filtro
                                </Typography>
                                <Typography sx={{ ...styles.fontTexto }}>
                                  {elemento.filterCapacity}
                                </Typography>
                              </Grid>

                              <Grid item xs={4}>
                                <Typography sx={{ ...styles.fontTypografy }}>
                                  Diametro del filtro
                                </Typography>
                                <Typography sx={{ ...styles.fontTexto }}>
                                  {elemento.filterDiameter}
                                </Typography>
                              </Grid>

                              <Grid item xs={4}>
                                <Typography sx={{ ...styles.fontTypografy }}>
                                  Filter Height
                                </Typography>
                                <Typography sx={{ ...styles.fontTexto }}>
                                  {elemento.filterHeight}
                                </Typography>
                              </Grid>
                            </Grid>
                          ))
                        )}
                      </Box>

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

                      <Box
                        sx={{
                          ...styles.boxListadoFiltros,
                          // backgroundColor: "red",
                        }}
                      >
                        {pool === "" ? (
                          <Typography></Typography>
                        ) : (
                          pool.pumps.map((elemento, index) => (
                            <Grid
                              key={index}
                              container
                              xs={12}
                              // sx={{ backgroundColor: "blue" }}
                            >
                              <Grid item xs={12}>
                                <Typography
                                  sx={{
                                    ...styles.fontTypografy,
                                    width: "20%",
                                    marginLeft: "40%",
                                    borderBottom: "2px solid black",
                                    marginBottom: "5px",
                                  }}
                                >
                                  Bomba {index + 1}
                                </Typography>
                              </Grid>
                              <Grid
                                xs={12}
                                sx={{
                                  // backgroundColor: "pink",
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={elemento.platePhoto}
                                  style={{
                                    width: "300px",
                                    height: "300px",
                                    borderRadius: "5px",
                                  }}
                                ></img>
                              </Grid>
                              <Grid xs={4}>
                                <Typography sx={{ ...styles.fontTypografy }}>
                                  Marca
                                </Typography>
                                <Typography sx={{ ...styles.fontTexto }}>
                                  {elemento.pumpBrand}
                                </Typography>
                              </Grid>

                              <Grid xs={4}>
                                <Typography sx={{ ...styles.fontTypografy }}>
                                  Flujo
                                </Typography>
                                <Typography sx={{ ...styles.fontTexto }}>
                                  {elemento.pumpFlow}
                                </Typography>
                              </Grid>

                              <Grid xs={4}>
                                <Typography sx={{ ...styles.fontTypografy }}>
                                  Referencia
                                </Typography>
                                <Typography sx={{ ...styles.fontTexto }}>
                                  {elemento.referencePump}
                                </Typography>
                              </Grid>
                              <Grid xs={4}>
                                <Typography sx={{ ...styles.fontTypografy }}>
                                  DataSheet
                                </Typography>
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <a
                                    href={elemento.dataSheetPump}
                                    target="_blank"
                                  >
                                    <IconButton>
                                      <PictureAsPdfIcon
                                        sx={{
                                          color: "red",
                                        }}
                                      ></PictureAsPdfIcon>
                                    </IconButton>
                                  </a>
                                </Box>
                              </Grid>
                            </Grid>
                          ))
                        )}
                      </Box>

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
                      {pool === "" ? (
                        <></>
                      ) : (
                        <>
                          {pool.heaters.map((elemento, index) => (
                            <Grid container key={index}>
                              <Grid item xs={12}>
                                <Typography
                                  sx={{
                                    ...styles.fontTypografy,
                                    width: "20%",
                                    marginLeft: "40%",
                                    borderBottom: "2px solid black",
                                    marginBottom: "5px",
                                  }}
                                >
                                  Calentador {index + 1}
                                </Typography>
                              </Grid>
                              <Grid xs={4}>
                                <Typography sx={{ ...styles.fontTypografy }}>
                                  Referencia
                                </Typography>
                                <Typography sx={{ ...styles.fontTexto }}>
                                  {elemento.heaterReference}
                                </Typography>
                              </Grid>
                              <Grid xs={4}>
                                <Typography sx={{ ...styles.fontTypografy }}>
                                  Marca
                                </Typography>
                                <Typography sx={{ ...styles.fontTexto }}>
                                  {elemento.heaterBrand}
                                </Typography>
                              </Grid>
                              <Grid xs={4}>
                                <Typography sx={{ ...styles.fontTypografy }}>
                                  DataSheet
                                </Typography>
                                <Typography>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <a
                                      href={elemento.dataSheetHeater}
                                      target="_blank"
                                    >
                                      <IconButton>
                                        <PictureAsPdfIcon
                                          sx={{
                                            color: "red",
                                          }}
                                        ></PictureAsPdfIcon>
                                      </IconButton>
                                    </a>
                                  </Box>
                                </Typography>
                              </Grid>
                            </Grid>
                          ))}
                        </>
                      )}
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

  fontTypografy: {
    fontFamily: "'Nunito Sans', sans-serif",
    display: "flex",
    justifyContent: "center",
  },

  fontTexto: {
    display: "flex",
    justifyContent: "center",
  },

  boxListadoFiltros: {
    width: "100%",
    marginTop: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
};
