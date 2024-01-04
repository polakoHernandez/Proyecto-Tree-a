import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Button,
  TextField,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import SearchAppBar from "../../Componentes/General/NavBar";
import "../../Estilos/Piscina/misPiscinas.css";
import SearchIcon from "@mui/icons-material/Search";
import Carrusel from "../../Componentes/General/Carrusel";
import ImageSlider from "../../Componentes/General/ImageSlider";
import Backdrop from "../../Componentes/General/BackDrop";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InputGeneal from "../../Componentes/General/InputGeneral";
import PoolIcon from "@mui/icons-material/Pool";
import Alertas from "../../Componentes/General/Alertas";
import Tabla from "../../Componentes/GestionarPisicnas/Tabla";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import EditIcon from "@mui/icons-material/Edit";

function GestionarPiscinas() {
  const [data, setData] = useState("");
  const [pool, setPool] = useState("");
  const [cargando, setCargando] = useState(false);
  //   Estados para mover el fromualrio
  const [mover, setMover] = useState(false); //MOvercon Piscina
  const [moverUsuario, setMoverUsuarios] = useState(false);
  const [moverParametros, setMoverParametros] = useState(false);
  const [moverQuimicos, setMoverQuimicos] = useState(false);
  const [moverPerfil, setMoverPerfil] = useState(false);

  const [contador, setContador] = useState(0);

  // Estados para capturar datos de parametros y aforro
  const [dataParametro, setDataParametro] = useState({
    fecha: "",
    PPMactualCloro: "",
    PPMdeseadoMaximo: "",
    PPMactualPh: "",
    PPMdeseado: "",
    PPMdeseado2: "",
  });
  const [dataAforo, setDataAforo] = useState({
    fechaInicio: "",
    fechaFinal: "",
    cantidadPersonas: "",
    horasDeUso: "",
  });

  const [respuestaAforo, setRespuestaAforo] = useState("");

  // Estado para controlar las alertas
  const [peticion, setPeticion] = useState(false);

  //Estados para las notificaciones
  const [notificacion, setNotificacion] = useState(false);
  const [mensaje, setmensaje] = useState("");
  const [color, setColor] = useState("");

  // Funciones para capturara datos de parametros ya foror
  const capTurarDatosAforo = (event) => {
    const { name, value } = event.target;
    setDataAforo((prevDatos) => ({
      ...prevDatos,
      [name]: value,
    }));
    console.log(dataAforo);
  };

  const capTurarDatosParametros = (event) => {
    const { name, value } = event.target;
    setDataParametro((prevDatos) => ({
      ...prevDatos,
      [name]: value,
    }));
    console.log(dataParametro);
  };

  //Funciones para crear Parametros y aforo
  const crearAforo = async () => {
    if (
      pool._id === "" ||
      dataAforo.cantidadPersonas === "" ||
      dataAforo.fechaFinal === "" ||
      dataAforo.fechaInicio === "" ||
      dataAforo.horasDeUso === ""
    ) {
      setNotificacion(true);
      setmensaje("Todos los campos son obligatorios");
      setColor("warning");
      return;
    }

    setPeticion(true);

    const response = await fetch("https://pool-api-treea.vercel.app/v1/aforo", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json", // Especificar el tipo de contenido como JSON
        "x-token": localStorage.getItem("clave"),
      },
      body: JSON.stringify({
        poolId: pool._id,
        startDate: dataAforo.fechaInicio,
        endDate: dataAforo.fechaFinal,
        timeUse: dataAforo.horasDeUso,
        quantityPerson: dataAforo.cantidadPersonas,
      }),
    });

    switch (response.status) {
      case 200:
        const respuesta = response.json();
        console.log(respuesta);
        setNotificacion(true);
        setmensaje("Aforo creado correctamente");
        setColor("success");
        setPeticion(false);
        break;

      case 404:
        setNotificacion(true);
        setmensaje("No ha ingresdo campos obligatorios");
        setColor("success");
        break;

      case 401:
        setNotificacion(true);
        setmensaje("Token no valido");
        setColor("success");
        setPeticion(false);

        break;

      case 500:
        setNotificacion(true);
        setmensaje("Error en el servidor");
        setColor("success");
        setPeticion(false);
    }
    setPeticion(false);
  };

  //Funcion pra listar el aforo
  const listarAforo = async (idPool) => {
    const response = await fetch(
      // `https://pool-api-treea.vercel.app/v1/aforo/${idPool}`,
      `https://treea-piscinas-api.vercel.app/v1/aforo/${idPool}`,
      {
        method: "GET",
        headers: {
          Accpet: "Application/json",
          "x-token": localStorage.getItem("clave"),
        },
      }
    );

    switch (response.status) {
      case 200:
        const respuesta = await response.json();
        // console.log(respuesta.aforoId);
        setRespuestaAforo(respuesta.aforoId);
        console.log("Estado actualizado:", respuestaAforo); // Añadir este console.log
        break;

      case 404:
        alert("Token no valido");
        break;

      case 404:
        alert("No encontraodr");
        break;

      case 500:
        alert("Error en e servidor");
        break;
    }
  };

  const incrementar = () => {
    if (contador === 3) {
      return;
    }

    setContador(contador + 1);
  };

  const decrementar = () => {
    if (contador === 0) {
      return;
    }
    setContador(contador - 1);
  };

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

  useEffect(() => {
    if (pool === "") {
      return; //
    }

    listarAforo(pool._id);
  }, [pool._id]);

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
                      marginTop: { xs: "20px", sm: "0px" },
                      marginRight: { xs: "2%", sm: "3%", md: "7%" },
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
                        marginTop: { xs: "-0.5%" },
                        // marginLeft: "-2px",
                        borderRadius: "0px 5px 5px 0px",
                        height: "41.5px",
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
                    width: "90%",
                    marginLeft: "2.5%",
                    //backgroundColor: "antiquewhite",
                    height: "45px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      //   backgroundColor: "cyan",
                      marginLeft: "1%",
                      width: "300px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      onClick={() => setContador(1)}
                      sx={{
                        width: "150px",
                        backgroundColor:
                          contador === 1 ? "white" : "rgb(0,164,228)",
                        fontFamily: "'Nunito Sans', sans-serif",
                        color: contador === 1 ? "black" : "white",
                        border: contador == 1 ? "1px solid rgb(0,164,228)" : "",
                        borderRight: "1px solid white",
                        borderRadius: "5px 0px 0px 0px",
                        cursor: "pointer",
                        display: { xs: "none", sm: "none", md: "flex" },
                        justifyContent: "center",
                        alignItems: "center",
                        "&:hover": {
                          color: "black",
                          backgroundColor: "white",
                          border: "1px solid rgb(0,164,228)",
                        },
                      }}
                    >
                      Parámetro
                    </Typography>
                    <Typography
                      onClick={() => setContador(2)}
                      sx={{
                        backgroundColor:
                          contador === 2 ? "white" : "rgb(0,164,228)",
                        fontFamily: "'Nunito Sans', sans-serif",
                        color: contador === 2 ? "black" : "white",
                        border: contador == 2 ? "1px solid rgb(0,164,228)" : "",
                        width: "150px",

                        borderRight: "1px solid white",

                        cursor: "pointer",
                        display: { xs: "none", sm: "none", md: "flex" },
                        justifyContent: "center",
                        alignItems: "center",
                        "&:hover": {
                          color: "black",
                          backgroundColor: "white",
                          border: "1px solid rgb(0,164,228)",
                        },
                      }}
                    >
                      Crear Aforo
                    </Typography>
                    <Typography
                      onClick={() => {
                        setContador(3);
                        console.log(contador);
                      }}
                      sx={{
                        backgroundColor:
                          contador === 3 ? "white" : "rgb(0,164,228)",
                        fontFamily: "'Nunito Sans', sans-serif",
                        color: contador === 3 ? "black" : "white",
                        width: "120px",
                        border: contador == 3 ? "1px solid rgb(0,164,228)" : "",
                        borderRadius: "0px 5px 0px 0px",
                        cursor: "pointer",
                        display: { xs: "none", sm: "none", md: "flex" },
                        justifyContent: "center",
                        alignItems: "center",
                        "&:hover": {
                          color: "black",
                          backgroundColor: "white",
                          border: "1px solid rgb(0,164,228)",
                        },
                      }}
                    >
                      Ver aforo
                    </Typography>
                  </Box>

                  <Typography
                    onClick={() => setContador(0)}
                    sx={{
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
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "white",
                        color: "black",
                        border: "1px solid rgb(0,164,228)",
                      },
                    }}
                  >
                    Mis piscinas
                  </Typography>
                </Box>
                <Box
                  sx={{
                    overflowY: "scroll",
                    // backgroundColor: "red",
                    height: { xs: "62vh", sm: "70vh", md: "63vh" },
                    width: { xs: "95%", sm: "95%", md: "90%" },
                    marginLeft: "2.5%",
                    borderRadius: "5px",

                    boxShadow: "0px 5px 5px 0px black",
                    border: "1px solid black",
                  }}
                >
                  <Box sx={{ height: "85%", overflowY: "scroll" }}>
                    <Box
                      sx={{
                        display: contador === 0 ? "block" : "none",
                      }}
                    >
                      {/* Seccion de informacion general */}
                      <Box>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Box
                              sx={{
                                width: "90%",
                                marginLeft: "5%",
                                height: "10px",
                                paddingTop: "10px",
                              }}
                            >
                              <Tooltip title="Editar">
                                <IconButton
                                  sx={{
                                    color: "green",
                                    borderRadius: "0px",
                                    border: "1px solid green",
                                  }}
                                >
                                  <EditIcon></EditIcon>
                                </IconButton>
                              </Tooltip>
                            </Box>
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
                              <img
                                src={pool.photo}
                                className="img-piscina"
                              ></img>
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
                              Largo (m)
                            </Typography>
                            <Typography>{pool.height}</Typography>
                          </Grid>
                          <Grid item xs={4} sx={{ textAlign: "center" }}>
                            <Typography
                              sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                            >
                              Ancho (m)
                            </Typography>
                            <Typography>{pool.width}</Typography>
                          </Grid>

                          <Grid item xs={4} sx={{ textAlign: "center" }}>
                            <Typography
                              sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                            >
                              Proundidad (m)
                            </Typography>
                            <Typography>{pool.maxDepth}</Typography>
                          </Grid>

                          <Grid item xs={4} sx={{ textAlign: "center" }}>
                            <Typography
                              sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                            >
                              Profundidad B (m)
                            </Typography>
                            <Typography>{pool.meanDepth}</Typography>
                          </Grid>

                          <Grid item xs={4} sx={{ textAlign: "center" }}>
                            <Typography
                              sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                            >
                              Profundidad C (m)
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

                    {/* Seccion e parametros */}

                    <Box sx={{ display: contador == 1 ? "block" : "none" }}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <InputGeneal
                            name="fecha"
                            onChange={capTurarDatosParametros}
                            type="date"
                            label="Fecha"
                            icon={<PoolIcon></PoolIcon>}
                          ></InputGeneal>
                        </Grid>
                        <Grid item xs={6}>
                          <InputGeneal
                            name="PPMactuaCloro"
                            onChange={capTurarDatosParametros}
                            label="PPM actual | cloro"
                            type="number"
                            icon={<PoolIcon></PoolIcon>}
                          ></InputGeneal>
                        </Grid>
                        <Grid item xs={6}>
                          <InputGeneal
                            name="PPMdeseadoMaximo"
                            onChange={capTurarDatosParametros}
                            label="PPM deseado máximo | cloro"
                            type="number"
                            icon={<PoolIcon></PoolIcon>}
                          ></InputGeneal>
                        </Grid>
                        <Grid item xs={6}>
                          <InputGeneal
                            name="PPMactualPh"
                            onChange={capTurarDatosParametros}
                            label="PPM actual |ph"
                            type="number"
                            icon={<PoolIcon></PoolIcon>}
                          ></InputGeneal>
                        </Grid>
                        <Grid item xs={6}>
                          <InputGeneal
                            name="PPMdeseado"
                            onChange={capTurarDatosParametros}
                            label="PPM deseado | ph"
                            type="number"
                            icon={<PoolIcon></PoolIcon>}
                          ></InputGeneal>
                        </Grid>
                        <Grid item xs={6}>
                          <InputGeneal
                            name="PPMdeseado2"
                            onChange={capTurarDatosParametros}
                            label="PPM deseado |ph"
                            type="number"
                            icon={<PoolIcon></PoolIcon>}
                          ></InputGeneal>
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            variant="contained"
                            sx={{
                              width: "95%",
                              marginLeft: "2.5%",
                              marginTop: "10px",
                              backgroundColor: "rgb(0,164,228)",
                              "&:hover": {
                                backgroundColor: "rgb(0,164,228)",
                              },
                            }}
                          >
                            Guardar
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>

                    {/* Seccion de cerar Aforo */}
                    <Box
                      sx={{
                        display: contador == 2 ? "flex" : "none",
                        // display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        // backgroundColor: "red",
                        height: "100%",
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <InputGeneal
                            name="fechaInicio"
                            onChange={capTurarDatosAforo}
                            label="Fecha inicio"
                            type="date"
                            icon={<PoolIcon></PoolIcon>}
                          ></InputGeneal>
                        </Grid>

                        <Grid item xs={6}>
                          <InputGeneal
                            name="fechaFinal"
                            onChange={capTurarDatosAforo}
                            label="Fecha final"
                            type="date"
                            icon={<PoolIcon></PoolIcon>}
                          ></InputGeneal>
                        </Grid>

                        <Grid item xs={6}>
                          <InputGeneal
                            name="cantidadPersonas"
                            onChange={capTurarDatosAforo}
                            label="Cantidad de personas"
                            type="number"
                            icon={<PoolIcon></PoolIcon>}
                          ></InputGeneal>
                        </Grid>

                        <Grid item xs={6}>
                          <InputGeneal
                            name="horasDeUso"
                            onChange={capTurarDatosAforo}
                            label="Horas de uso"
                            type="number"
                            icon={<PoolIcon></PoolIcon>}
                          ></InputGeneal>
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            onClick={() => crearAforo()}
                            variant="contained"
                            disabled={peticion}
                            sx={{
                              width: "95%",
                              marginLeft: "2.5%",
                              backgroundColor: "rgb(0,164,228)",
                              "&:hover": {
                                backgroundColor: "rgb(0,164,228)",
                              },
                            }}
                          >
                            {peticion ? (
                              <CircularProgress
                                color="inherit"
                                size={24}
                              ></CircularProgress>
                            ) : (
                              "Guardar"
                            )}
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>

                    {/* Seccion de crear Aforo */}
                    <Box
                      sx={{ display: contador == 3 ? "block" : "none" }}
                    ></Box>
                    {respuestaAforo === "" ? (
                      ""
                    ) : (
                      <Tabla
                        data={respuestaAforo}
                        contador={contador}
                        nombrePiscina={pool.name}
                      ></Tabla>
                    )}
                  </Box>
                  <Box
                    sx={{
                      // backgroundColor: "cyan",
                      height: "10%",
                      display: "flex",
                      justifyContent: contador === 0 ? "end" : "space-between",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      onClick={() => decrementar()}
                      sx={{
                        "&:hover": {
                          color: "rgb(0,164,228)",
                        },

                        display: contador == 0 ? "none" : "block",
                      }}
                    >
                      <KeyboardDoubleArrowLeftIcon></KeyboardDoubleArrowLeftIcon>
                    </IconButton>
                    <IconButton
                      onClick={() => incrementar()}
                      sx={{
                        "&:hover": {
                          color: "rgb(0,164,228)",
                        },
                      }}
                    >
                      <KeyboardDoubleArrowRightIcon></KeyboardDoubleArrowRightIcon>
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      )}
      <Alertas
        open={notificacion}
        cerrar={() => setNotificacion(false)}
        mensaje={mensaje}
        severity={color}
      ></Alertas>
    </Box>
  );
}

export default GestionarPiscinas;

const styles = {
  generalContainer: {
    overflowX: "hidden",
    height: "100vh",
    // backgroundColor: "red",
  },
};
