import React, { useEffect, useState } from "react";
import SearchAppBar from "../../Componentes/General/NavBar";
import { Box, Typography, Grid, TextField, IconButton } from "@mui/material";
import InputGeneral from "../../Componentes/General/InputGeneral";
import InputSelect from "../../Componentes/General/InputSelect";
import Tabla from "../../Componentes/Parametros/Tabla";
import { Pool, Add } from "@mui/icons-material";

function CrearParametro() {
  //* Estado para guardar la data de info general
  const [data, setData] = useState({
    nombreNorma: "",
    descripcion: "",
    tipoAgua: "",
    parametros: [{ parametro: "", especificacion: "" }],
  });

  //*Funciones ara capturar la data de inforGeneral
  const catchData = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    console.log(data);
  };

  const catchDataSelect = (value) => {
    setData((prevData) => ({
      ...prevData,
      tipoAgua: value,
    }));
  };

  //*funcion  para aregar mas inputs
  const agregar = () => {
    setData((prevData) => ({
      ...prevData,
      parametros: [...prevData.parametros, { parametro: "", nombre: "" }],
    }));
  };

  //* Estado ara guradar lo parametros
  const [listaParametros, setLisaParametros] = useState([]);

  //*funcion para listar los parametros
  const listarParametros = async () => {
    const respuesta = await fetch(
      "https://treea-piscinas-api.vercel.app/v1/normativities",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "x-token": localStorage.getItem("clave"),
        },
      }
    );

    switch (respuesta.status) {
      case 200:
        const response = await respuesta.json();
        setLisaParametros(response);
        console.log(response);
        break;

      case 401:
        console.log(await respuesta.json());
        break;

      case 500:
        console.log(await respuesta.json());
        break;
    }
  };

  //*ontaodor para mostrar las vistas
  const [contador, setContador] = useState(1);

  const [mover, setMover] = useState(false); //MOvercon Piscina
  const [moverUsuario, setMoverUsuarios] = useState(false);
  const [moverParametros, setMoverParametros] = useState(false);
  const [moverQuimicos, setMoverQuimicos] = useState(false);
  const [moverPerfil, setMoverPerfil] = useState(false);

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

  const styles = {
    generalContainer: {
      overflowX: "hidden",
      height: "100vh",
    },

    mainBox: {
      //! para cambiar el color backgroundColor: "pink",
      height: "87%",
      width: "90%",
      marginTop: "10px",
      marginLeft: "5%",
      transition: "ease 0.3s",
      transform:
        mover || moverUsuario || moverParametros || moverQuimicos || moverPerfil
          ? "translateY( 190px)"
          : "translateY(0px)",
    },

    containerEncabezado: {
      //! para cambiar el color backgroundColor: "red",
      height: "10%",
      display: "flex",
      justifyContent: "space-between",
    },

    containerFormulario: {
      height: "82%",
      boxShadow: "0px 5px 5px 0px black",
      backgroundColor: "white",
      border: "1px solid black",
      borderRadius: "5px",
    },

    listaNormas: {
      backgroundColor: "rgb(0,164,228)",
      color: "white",
      width: "150px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'Nunito Sans', sans-serif",
      borderRadius: "5px 5px 0px 0px",
      cursor: "pointer",
    },

    crearNorma: {
      backgroundColor: "rgb(0,164,228)",
      color: "white",
      width: "150px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'Nunito Sans', sans-serif",
      borderRadius: "5px 0px 0px 0px",
      cursor: "pointer",
    },

    containerGrid: {
      // backgroundColor: "red",
      width: "90%",
      marginLeft: "5%",
    },

    titulo: {
      width: "50%",
      marginLeft: "25%",
      fontFamily: "'Nunito Sans', sans-serif",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: "20px",
      borderBottom: "3px solid black",
    },

    vistaFormulario: {
      display: contador === 1 ? "block" : "none",
    },

    vistaNormas: {
      display: contador === 2 ? "flex" : "none",
      height: "100%",
    },
  };

  const InfoGeneral = [
    {
      nombre: "Nombre de la norma",
      typo: "text",
      name: "nombreNorma",
      value: data.nombreNorma,
    },

    {
      nombre: "Descripcion",
      typo: "text",
      name: "descripcion",
      value: data.descripcion,
    },

    {
      nombre: "Tip de agua",
      typo: "select",
      name: "tipoAgu",
      value: data.tipoAgua,
    },
  ];

  const listaOpciones = [
    {
      label: "Agua Residual",
    },

    {
      label: "Agua Potale",
    },

    {
      label: "Piscina",
    },
  ];

  useEffect(() => {
    listarParametros();
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
      <Box sx={{ ...styles.mainBox }}>
        <Box sx={{ ...styles.containerEncabezado }}>
          <Typography
            sx={{ ...styles.listaNormas }}
            onClick={() => setContador(2)}
          >
            lista de normas
          </Typography>
          <Typography
            sx={{ ...styles.crearNorma }}
            onClick={() => setContador(1)}
          >
            Crear norma
          </Typography>
        </Box>
        <Box sx={{ ...styles.containerFormulario }}>
          <Box sx={{ ...styles.containerGrid }}>
            <Box sx={{ ...styles.vistaFormulario }}>
              <Box sx={{ ...styles.titulo }}>Informacion geenral</Box>
              <Grid container>
                {InfoGeneral.map((elemento) =>
                  elemento.typo === "text" ? (
                    <Grid item xs={12} sm={12} md={4} key={elemento.nombre}>
                      <InputGeneral
                        name={elemento.name}
                        onChange={catchData}
                        label={elemento.nombre}
                        icon={<Pool></Pool>}
                      ></InputGeneral>
                    </Grid>
                  ) : (
                    <Grid item xs={12} sm={12} md={4} key={elemento.nombre}>
                      <InputSelect
                        onChange={(e) => catchDataSelect(e.target.textContent)}
                        options={listaOpciones}
                        label={elemento.nombre}
                        icon={<Pool></Pool>}
                      ></InputSelect>
                    </Grid>
                  )
                )}
                <Typography sx={{ ...styles.titulo }}>Parámetros</Typography>
                <Box
                  sx={{
                    width: "100%",
                    marginLeft: "0px",
                  }}
                >
                  {data.parametros.map((elemento) => (
                    <Grid container>
                      <Grid item xs={12} sm={12} md={4}>
                        <InputGeneral
                          icon={<Pool></Pool>}
                          label="Parámetro"
                        ></InputGeneral>
                      </Grid>
                      <Grid item xs={12} sm={12} md={4}>
                        <InputSelect
                          icon={<Pool></Pool>}
                          label="Especificación"
                          options={[{ label: "no data" }]}
                        ></InputSelect>
                      </Grid>
                      <Grid item xs={12} sm={12} md={4}>
                        <IconButton onClick={agregar}>
                          <Add></Add>
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                </Box>
              </Grid>
            </Box>
          </Box>
          <Box sx={{ ...styles.vistaNormas }}>
            <Tabla
              data={
                listaParametros.length === 0
                  ? ""
                  : listaParametros.normativities
              }
            ></Tabla>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default CrearParametro;
