import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  CircularProgress,
  IconButton,
  Input,
} from "@mui/material";
import SearchAppBar from "../../Componentes/General/NavBar";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import PoolIcon from "@mui/icons-material/Pool";
import InputGeneral from "../../Componentes/General/InputGeneral";
import InputSelect from "../../Componentes/General/InputSelect";
import InputBuscar from "../../Componentes/General/InputBuscar";
import Alertas from "../../Componentes/General/Alertas";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ClearIcon from "@mui/icons-material/Clear";

function CrearPiscina() {
  //Referencia a inputs

  // const filtroRef = useRef();

  const refGeneral = useRef("");

  // *Estado ara guardar los datos del formulario
  const [data, setData] = useState({
    nombre: "Nueva Pisicna",
    departamento: "",
    municipio: "",
    direccion: "Mi casa",
    uso: "PRIVADA",
    caracteristica: "CUBIERTA",
    temperatura: 23,
    temperaturaExterna: 24,
    estructura: "Adultos",
    instalacion: "Especial termales",
    fotoPiscina: "",
    forma: "RECTANGULAR",
    largo: 5,
    ancho: 6,
    profundidad: 1.2,
    profundidadB: 1.6,
    profundidadC: 1.5,
    operacion: "Recirculacion",
    caudal: 19,
    climatizado: "Si",
    recirculacionMinimo: 29,
    recirculacionMaximo: 19,
    dosificacion: "Si",
    filtro: "",
    bomba: "",
    calentador: "",
    alturaFiltro: 19,
    caudalBomba: 23,
    marcaBomba: "Otra cosa",
    referenciaBomba: "Nuveo",
    referenciaCalentador: "jhkjhj",
    marcaCalentador: "kh",
    fotoPiscina: "",
    fotoBomba: "",
    fichaTecnica: "",
    fichaTecnicaCalentador: "",
    diametroFiltro: 23,
    AlturaLechoFiltro: 90,
    capacidadDelFiltro: 54,
  });

  //*Estados para agergar los texfield de filtros
  const [texfiedlList, setTexfiedlList] = useState([
    {
      filter: "",
      filterHeight: "",
      filterDiameter: "",
      filterCapacity: "",
      filterBedHeight: "",
    },
  ]);

  const addTexfiedl = () => {
    setTexfiedlList((prevList) => [
      ...prevList,
      {
        filter: "",
        filterHeight: "",
        filterDiameter: "",
        filterCapacity: "",
        filterBedHeight: "",
      },
    ]);
  };

  const handleInputChange = (index, name, value) => {
    setTexfiedlList((prevList) => {
      const newList = [...prevList];
      newList[index][name] = value;
      return newList;
    });
  };

  const handleDelete = (index) => {
    setTexfiedlList((prevList) => {
      const newList = [...prevList];
      newList.splice(index, 1); // Elimina el elemento en el índice especificado
      return newList;
    });
  };

  const handleSubmit = () => {
    setData((prevData) => ({
      ...prevData,
      filtro: [
        ...prevData.filtro,
        ...texfiedlList.map((element) => ({ ...element })),
      ],
    }));
  };

  //*Estados para agregar los texfield de Bomba
  const [textFiedsBomba, setTextFieldsBomba] = useState([
    {
      pumpFlow: "",
      referencePump: "",
      pumpBrand: "",
      dataSheetPump: "",
      platePhoto: "",
    },
  ]);

  const addTexfieldBomba = () => {
    setTextFieldsBomba((prevList) => [
      ...prevList,
      {
        pumpFlow: "",
        referencePump: "",
        filterHeight: "",
        pumpBrand: "",
        platePhoto: "",
      },
    ]);
  };

  const handleInputChangeBomba = (index, name, value) => {
    setTextFieldsBomba((prevList) => {
      const newList = [...prevList];
      newList[index][name] = value;
      return newList;
    });
  };

  const handleDeleteBomba = (index) => {
    setTextFieldsBomba((prevList) => {
      const newList = [...prevList];
      newList.splice(index, 1); // Elimina el elemento en el índice especificado
      return newList;
    });
  };

  const handleSubmitBomba = () => {
    setData((prevData) => ({
      ...prevData,
      bomba: [
        ...prevData.bomba,
        ...textFiedsBomba.map((element) => ({ ...element })),
      ],
    }));
    console.log(data.bomba);
  };

  //*Estados para agregar texfiled para calentadores

  const [textfiledCalentador, setTextFieldsClentaodr] = useState([
    {
      heaterReference: "",
      heaterBrand: "",
      dataSheetHeater: "",
    },
  ]);

  const addTexfieldCalentaodr = () => {
    setTextFieldsClentaodr((prevList) => [
      ...prevList,
      {
        heaterReference: "",
        heaterBrand: "",
        dataSheetHeater: "",
      },
    ]);
  };

  const handleInputChangeCalentaodr = (index, name, value) => {
    setTextFieldsClentaodr((prevList) => {
      const newList = [...prevList];
      newList[index][name] = value;
      return newList;
    });
  };

  const handleDeleteCalentador = (index) => {
    setTextFieldsClentaodr((prevList) => {
      const newList = [...prevList];
      newList.splice(index, 1); // Elimina el elemento en el índice especificado
      return newList;
    });
  };

  //*Estado para guardar el id del departamento
  const [idDepartamento, setIdDepartamento] = useState("");

  //Estado para deshabilidar el boton guardar
  const [deshabilitar, setDeshabilitar] = useState(false);

  // *Funcion para obetener los datos de los inputs
  const seleccionarData = (name, value) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(data);
  };

  //*Funcion para limpiar a data

  const imprimir = () => {
    // console.log(refGeneral.current.querySelector("input").value);
    // refGeneral.current.querySelector("input").value = "";
    console.log(refGeneral.current);
  };

  const limpiar = (event) => {
    setData({
      nombre: "",
      direccion: "",
      uso: "",
      caracteristica: "",
      temperatura: "",
      temperaturaExterna: "",
      estructura: "",
      instalacion: "",
      fotoPiscina: "",
      forma: "",
      largo: "",
      ancho: "",
      profundidad: "",
      profundidadB: "",
      profundidadC: "",
      operacion: "",
      caudal: "",
      climatizado: "",
      recirculacionMinimo: "",
      recirculacionMaximo: "",
      dosificacion: "",
      filtro: "",
      alturaFiltro: "",
      cantidadFiltro: "",
      caudalBomba: "",
      cantidadBomba: "",
      marcaBomba: "",
      referenciaBomba: "",
      cantidadCalentador: "",
      referenciaCalentador: "",
      marcaCalentador: "",
    });
  };

  //Estado abrir alerta
  const [open, setOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [color, setColor] = useState("");

  //   Estados para mover el fromualrio
  const [mover, setMover] = useState(false); //MOvercon Piscina
  const [moverUsuario, setMoverUsuarios] = useState(false);
  const [moverParametros, setMoverParametros] = useState(false);
  const [moverQuimicos, setMoverQuimicos] = useState(false);
  const [moverPerfil, setMoverPerfil] = useState(false);

  //Estaod para gauradr los nombres de los departamentos y muicipios
  const [nombreDepartamento, setNombreDepartamento] = useState([]);
  const [nombreMunicipio, setNombreMunicipio] = useState([]);
  const [respuestaGeneral, setRespuestaGeneral] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  //   Estados para controlar el dispaly de las secciones
  const [contador, setContador] = useState(1);

  //Funciones para incrementar y disinuir contador

  const incrementar = () => {
    if (contador === 4) {
      return;
    } else {
      setContador(contador + 1);
    }
  };

  const decrementar = () => {
    if (contador === 1) {
      return;
    } else {
      setContador(contador - 1);
    }
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

  //   Estlos de componentes animados
  const styleAnimation = {
    mainBox: {
      //   backgroundColor: "red",
      width: "90%",
      marginLeft: "5%",
      marginTop: "10px",
      transition: "ease 0.2s",
      height: "480px",
      transform:
        mover || moverUsuario || moverParametros || moverQuimicos || moverPerfil
          ? "translateY( 180px)"
          : "translateY(10px)",
    },

    ventanas: {
      fontFamily: "'Nunito Sans', sans-serif",
      color: "white",
      width: "190px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // borderRight: "1px solid white",
      fontSize: { xs: "15px", sm: "15px", md: "12.5px", lg: "15px" },
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "white",
        color: "black",
        border: "1px solid rgb(0,164,228)",
      },
    },

    containerVentanas: {
      // backgroundColor: "gray",
      width: "90%",
      marginLeft: "5%",
      display: "flex",
      justifyContent: {
        xs: "flex-end",
        md: "space-between",
        lg: "space-between",
      },
      flexDirection: "row",
    },

    infoGeneral: {
      backgroundColor: contador == 1 ? "white" : "rgb(0,164,228)",
      color: contador == 1 ? "black" : "white",
      border: contador === 1 ? "1px solid rgb(0,162,228)" : "1px solid white",
      borderRadius: "5px 0px 0px 0px",
    },

    medidas: {
      backgroundColor: contador == 2 ? "white" : "rgb(0,164,228)",
      color: contador == 2 ? "black" : "white",
      border: contador === 2 ? "1px solid rgb(0,162,228)" : "1px solid white",
      borderRadius: "0px 0px 0px 0px",
    },

    operacion: {
      backgroundColor: contador == 3 ? "white" : "rgb(0,164,228)",
      color: contador == 3 ? "black" : "white",
      border: contador === 3 ? "1px solid rgb(0,162,228)" : "1px solid white",
      borderRadius: "0px 0px 0px 0px",
    },

    equipos: {
      borderRight: "none",
      backgroundColor: contador == 4 ? "white" : "rgb(0,164,228)",
      color: contador == 4 ? "black" : "white",
      border: contador === 4 ? "1px solid rgb(0,162,228)" : "1px solid white",
      borderRadius: "0px 5px 0px 0px",
    },

    InformacionGenera: {
      width: "100%",
      height: "100%",
      display: contador === 1 ? "content" : "none",
    },
  };

  // Listaod de opciones para los inputs
  const usos = [
    {
      label: "PRIVADA",
    },
    {
      label: "PÚBLICA",
    },
  ];

  const caracteristicas = [
    {
      label: "CUBIERTA",
    },
    {
      label: "DESCUBIERTA",
    },
  ];

  const estructura = [
    {
      label: "Adultos",
    },
    {
      label: "Niños",
    },
  ];

  const instalacion = [
    {
      label: "Piscina de nado",
    },

    {
      label: "Piscina de recreo",
    },
    {
      label: "Piscina de aprendizaje",
    },
    {
      label: "Piscina de olas",
    },
    {
      label: "Atracción acuatica interactiva",
    },
    {
      label: "Especial terapéutica",
    },
    {
      label: "Especial termales",
    },
  ];

  const forma = [
    {
      label: "RECTANGULAR",
    },

    {
      label: "CIRCULAR",
    },
    {
      label: "OVALADA",
    },
  ];

  const operacion = [
    {
      label: "Recirculacion",
    },
    {
      label: "Renovacion continua",
    },
    {
      label: "desalojo completo e intermintente",
    },
  ];

  const si_no = [
    {
      label: "Si",
    },
    {
      label: "No",
    },
  ];

  const filtros = [
    {
      label: "Arena",
    },
    {
      label: "Carbon",
    },
    {
      label: "Arena carbon",
    },
    {
      label: "ARENA ANTRECITA",
    },
  ];

  const listarDepartamentos = async () => {
    try {
      const response = await fetch(
        "https://api-colombia.com/api/v1/Department",
        {}
      );
      const data = await response.json();

      setRespuestaGeneral(data); //

      setNombreDepartamento(
        data.map((departamento) => ({ label: departamento.name }))
      );
    } catch (error) {
      console.error("Error al obtener la lista de departamentos", error);
    }
  };

  const obtenerIdDepartamento = (departamento) => {
    const departamentoEncontrado = respuestaGeneral.find(
      (item) => item.name === departamento
    );

    setIdDepartamento(departamentoEncontrado.id);
  };

  const listarMunicipios = async (idDepartamento) => {
    try {
      if (!idDepartamento) {
        return;
      }

      const respuesta = await fetch(
        `https://api-colombia.com/api/v1/Department/${idDepartamento}/cities`
      );

      const datos = await respuesta.json();
      setNombreMunicipio(datos.map((municipio) => ({ label: municipio.name })));
    } catch (error) {
      console.error("Error al obtener la lista de municipios", error);
    }
  };

  const crearPiscina = async () => {
    // for (const key in data) {
    //   if (data.hasOwnProperty(key) && data[key] === "") {
    //     setOpen(true);
    //     setColor("error");
    //     setMensaje("Todos los campos son obligatorios!");
    //     return; // At least one attribute is empty
    //   }
    // }

    setData((prevData) => ({
      ...prevData,
      filtro: [
        ...prevData.filtro,
        ...texfiedlList.map((element) => ({ ...element })),
      ],

      bomba: [
        ...prevData.bomba,
        ...textFiedsBomba.map((element) => ({ ...element })),
      ],

      calentador: [
        ...prevData.calentador,
        ...textfiledCalentador.map((element) => ({ ...element })),
      ],
    }));

    console.log(data);

    setDeshabilitar(true);

    const formData = new FormData();

    formData.append("name", data.nombre);
    formData.append("address", data.direccion);
    formData.append("height", data.largo);
    formData.append("width", data.ancho);
    formData.append("department", data.departamento);
    formData.append("city", data.municipio);
    formData.append("externalTemperature", data.temperaturaExterna);
    formData.append("category", data.estructura);

    // Depth
    formData.append("depth[0][depthA]", data.profundidad);
    formData.append("depth[0][depthB]", data.profundidadB);
    formData.append("depth[0][depthC]", data.profundidadC);

    formData.append("form", data.forma);

    // Recirculation Period
    formData.append("recirculationPeriod[0][min]", data.recirculacionMinimo);
    formData.append("recirculationPeriod[0][max]", data.recirculacionMaximo);

    formData.append("use", data.uso);
    formData.append("photo", data.fotoPiscina);
    formData.append("typePool", data.caracteristica);
    formData.append("temperature", data.temperatura);
    formData.append("minDepth", 1996);
    formData.append("maxDepth", 1996);
    formData.append("typeInstallation", data.instalacion);
    formData.append("systemOperation", data.operacion); // todo usar ChangeOperator data?.property
    formData.append("airConditioned", data.climatizado);
    formData.append("caudal", data.caudal);
    formData.append("autoDosing", data.dosificacion);

    data.filtro.forEach((elemento, index) => {
      formData.append(`filters[${index}][filter]`, elemento.filter);
      formData.append(`filters[${index}][filterHeight]`, elemento.filterHeight);
      formData.append(
        `filters[${index}][filterDiameter]`,
        elemento.filterDiameter
      );
      formData.append(
        `filters[${index}][filterCapacity]`,
        elemento.filterCapacity
      );
      formData.append(
        `filters[${index}][filterBedHeight]`,
        elemento.filterBedHeight
      );
    });

    data.bomba.forEach((elemento, index) => {
      formData.append(`pumps[${index}][pumpFlow]`, elemento.pumpFlow);
      formData.append(`pumps[${index}][referencePump]`, elemento.referencePump);
      formData.append(`pumps[${index}][pumpBrand]`, elemento.pumpBrand);
      formData.append(`pumps[${index}][dataSheetPump]`, elemento.dataSheetPump);
      formData.append(`pumps[${index}][platePhoto]`, elemento.platePhoto);
    });

    data.calentador.forEach((elemento, index) => {
      formData.append(
        `heaters[${index}][heaterReference]`,
        elemento.heaterReference
      );
      formData.append(`heaters[${index}][heaterBrand]`, elemento.heaterBrand);
      formData.append(
        `heaters[${index}][dataSheetHeater]`,
        elemento.dataSheetHeater
      );
    });

    // formData.append(
    //   "filters",
    //   data.filtro.forEach((element) => {
    //     element;
    //   })
    // ); // todo data.filters.filter
    // formData.append("filters[filterHeight]", data.filtro.filterHeight); // todo data.filters.filter
    // formData.append("filters[filterDiameter]", data.filtro.filterDiameter); // todo data.filters.filter
    // formData.append("filters[filterCapacity]", data.filtro.filterCapacity); // todo data.filters.filter

    try {
      const response = await fetch(
        "https://treea-piscinas-api.vercel.app/v1/pool",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "x-token": localStorage.getItem("clave"),
          },
          body: formData,
        }
      );

      console.log(response.status);

      switch (response.status) {
        case 200:
          const result = await response.json();
          console.log(result);
          setOpen(true);
          setMensaje("Piscina Creada exitosamente!");
          setColor("success");
          limpiar();
          setDeshabilitar(false);

          break;

        case 400:
          console.log(result);
          setOpen(true);
          setMensaje("Todos los campos son obligatorios");
          setColor("error");
          setDeshabilitar(false);

          break;

        default:
          setDeshabilitar(false);

          break;
      }
    } catch (error) {
      setOpen(true);
      setMensaje("Error en el servidor");
      setColor("error");
      console.log(error);
      setDeshabilitar(false);
    }
    setDeshabilitar(false);
  };
  useEffect(() => {
    listarDepartamentos();
    console.log(data.fotoPiscina);
  }, []);

  useEffect(() => {
    listarMunicipios(idDepartamento);
  }, [idDepartamento]);

  return (
    <Box sx={styles.generalContainer}>
      <SearchAppBar
        onClick={() => moverTabla()}
        moverUsuario={moverTablaUsuarios}
        moverParametros={moverTablaParametros}
        moverQuimicos={moverTablaQuimicos} //
        moverPerfil={moverTablaPerfil}
      ></SearchAppBar>
      <Box sx={styleAnimation.mainBox}>
        <Box sx={styleAnimation.containerVentanas}>
          <Box
            sx={{
              backgroundColor: "rgb(0,164,228)",
              width: { xs: "30%", sm: "30%", md: "75%", lg: "70%" },
              display: { xs: "none", sm: "none", md: "flex", lg: "flex" },
              fontFamily: "'Nunito Sans', sans-serif",
              borderRadius: "5px 5px 0px 0px",
              marginLeft: "5px",
            }}
          >
            <Typography
              sx={{
                ...styleAnimation.ventanas,
                ...styleAnimation.infoGeneral,
              }}
              onClick={() => setContador(1)}
            >
              Información general
            </Typography>
            <Typography
              sx={{
                ...styleAnimation.ventanas,
                ...styleAnimation.medidas,
              }}
              onClick={() => setContador(2)}
            >
              medidas
            </Typography>
            <Typography
              sx={{
                ...styleAnimation.ventanas,
                ...styleAnimation.operacion,
              }}
              onClick={() => setContador(3)}
            >
              Detalles de operación
            </Typography>
            <Typography
              sx={{
                ...styleAnimation.ventanas,
                ...styleAnimation.equipos,
              }}
              onClick={() => setContador(4)}
            >
              Equipos
            </Typography>
          </Box>
          <Typography sx={styles.crearPiscina}>Crear Piscina</Typography>
        </Box>
        <Box sx={styles.contenedorInputs}>
          <Box sx={{ width: "100%", height: "100%" }}>
            {/* Mensajes de cabeceras */}
            <Box
              sx={{
                width: "95%",
                marginLeft: "2.5%",
                color: "white",
                height: "10%",
                display: contador === 4 ? "none" : "flex",
                justifyContent: "center",
                textAlign: "center",
                alignItems: "center",
                fontFamily: "'Nunito Sans', sans-serif",
                color: "black",
                borderBottom: "3px solid black",
              }}
            >
              {contador === 1
                ? "Información general"
                : contador === 2
                ? "Medidas"
                : contador === 3
                ? "Detalles de operación"
                : contador === 4
                ? "Equipos"
                : ""}
            </Box>

            {/* Secciones de formularios */}
            <Box
              sx={{
                width: "95%",
                marginLeft: "2.5%",
                // backgroundColor: "red",
                height: "80%",
                overflowY: "scroll",
              }}
            >
              {/* Seccion de infromacion general */}
              <Box sx={styleAnimation.InformacionGenera}>
                <Grid container>
                  <Grid item xs={12} sm={12} md={4} sx={{ height: "90px" }}>
                    <InputGeneral
                      value={data.nombre}
                      label="Nombre"
                      placeholder="Ingrese el nombre"
                      icon={<PoolIcon></PoolIcon>}
                      name="nombre"
                      onChange={(e) =>
                        seleccionarData("nombre", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} sx={{ height: "90px" }}>
                    <InputSelect
                      inputRef={refGeneral}
                      options={nombreDepartamento}
                      label="Departamento"
                      placeholder="Seleccione"
                      name="departamento"
                      icon={<PoolIcon></PoolIcon>}
                      onChange={(e) => {
                        seleccionarData("departamento", e.target.textContent);
                        obtenerIdDepartamento(e.target.textContent);
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={4} sx={{ height: "90px" }}>
                    <InputSelect
                      options={nombreMunicipio}
                      label="Ciudad/Municipio"
                      placeholder="Seleccione"
                      name="municipio"
                      icon={<PoolIcon></PoolIcon>}
                      onChange={(e) => {
                        seleccionarData("municipio", e.target.textContent);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} sx={{ height: "90px" }}>
                    <InputGeneral
                      value={data.direccion}
                      label="Dirección"
                      placeholder="Ingrese la dirección"
                      icon={<PoolIcon></PoolIcon>}
                      name="direccion"
                      onChange={(e) =>
                        seleccionarData("direccion", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} sx={{ height: "90px" }}>
                    <InputSelect
                      options={usos}
                      label="Uso"
                      placeholder="Seleccione"
                      icon={<PoolIcon></PoolIcon>}
                      name="uso"
                      onChange={(e) =>
                        seleccionarData("uso", e.target.textContent)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} sx={{ height: "90px" }}>
                    <InputSelect
                      options={caracteristicas}
                      label="Características"
                      placeholder="Seleccione"
                      icon={<PoolIcon></PoolIcon>}
                      name="caracteristica"
                      onChange={(e) =>
                        seleccionarData("caracteristica", e.target.textContent)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} sx={{ height: "90px" }}>
                    <InputGeneral
                      value={data.temperatura}
                      label="Temperatura *C"
                      placeholder="*C"
                      icon={<PoolIcon></PoolIcon>}
                      name="temperatura"
                      onChange={(e) =>
                        seleccionarData("temperatura", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} sx={{ height: "90px" }}>
                    <InputGeneral
                      type="number"
                      value={data.temperaturaExterna}
                      label="Temperatura Extena"
                      placeholder="Seleccione"
                      icon={<PoolIcon></PoolIcon>}
                      name="temperaturaExterna"
                      onChange={(e) =>
                        seleccionarData("temperaturaExterna", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} sx={{ height: "90px" }}>
                    <InputSelect
                      options={estructura}
                      label="Estructura"
                      placeholder="Seleccione"
                      icon={<PoolIcon></PoolIcon>}
                      name="estructura"
                      onChange={(e) =>
                        seleccionarData("estructura", e.target.textContent)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} sx={{ height: "90px" }}>
                    <InputSelect
                      options={instalacion}
                      label="Clase de instalación"
                      placeholder="Seleccione"
                      icon={<PoolIcon></PoolIcon>}
                      name="instalacion"
                      onChange={(e) => {
                        seleccionarData("instalacion", e.target.textContent);
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    sx={{
                      height: "90px",
                      // backgroundColor: "red",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingLeft: "15px",
                    }}
                  >
                    <InputBuscar
                      onChange={(e) => {
                        seleccionarData("fotoPiscina", e.target.files[0]);
                      }}
                      label="Foto"
                    ></InputBuscar>
                  </Grid>
                </Grid>
              </Box>
              {/* Seccion de Medidas */}
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: contador === 2 ? "flex" : "none",
                }}
              >
                <Grid container>
                  <Grid item xs={12} sm={12} md={6}>
                    <InputSelect
                      label="Forma"
                      options={forma}
                      icon={<PoolIcon></PoolIcon>}
                      placeholder="Seleccione"
                      onChange={(e) =>
                        seleccionarData("forma", e.target.textContent)
                      }
                    ></InputSelect>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <InputGeneral
                      value={data.largo}
                      type="number"
                      label="Largo(m)"
                      icon={<PoolIcon></PoolIcon>}
                      placeholder="Ingrese el largo"
                      onChange={(e) => seleccionarData("largo", e.target.value)}
                    ></InputGeneral>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <InputGeneral
                      value={data.ancho}
                      type="number"
                      label="Ancho(m)"
                      icon={<PoolIcon></PoolIcon>}
                      placeholder="Ingrese el ancho"
                      onChange={(e) => seleccionarData("ancho", e.target.value)}
                    ></InputGeneral>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <InputGeneral
                      value={data.profundidad}
                      type="number"
                      label="Profundidad(m)"
                      icon={<PoolIcon></PoolIcon>}
                      placeholder="Ingrese la profundidad"
                      onChange={(e) =>
                        seleccionarData("profundidad", e.target.value)
                      }
                    ></InputGeneral>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <InputGeneral
                      value={data.profundidadB}
                      type="number"
                      label="Profundidad B (m)"
                      icon={<PoolIcon></PoolIcon>}
                      placeholder="Ingrese la profundidad B"
                      onChange={(e) =>
                        seleccionarData("profundidadB", e.target.value)
                      }
                    ></InputGeneral>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <InputGeneral
                      value={data.profundidadC}
                      type="number"
                      label="Profundidad C (m)"
                      icon={<PoolIcon></PoolIcon>}
                      placeholder="Ingrese la profundidad C"
                      onChange={(e) =>
                        seleccionarData("profundidadC", e.target.value)
                      }
                    ></InputGeneral>
                  </Grid>
                </Grid>
              </Box>
              {/* Seccion de detalles de operacion  */}
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: contador === 3 ? "flex" : "none",
                }}
              >
                <Grid container>
                  <Grid item xs={12} sm={12} md={6}>
                    <InputSelect
                      options={operacion}
                      label="Sistema de operación"
                      placeholder="Seleccione"
                      icon={<PoolIcon></PoolIcon>}
                      name="operacion"
                      onChange={(e) =>
                        seleccionarData("operacion", e.target.textContent)
                      }
                    ></InputSelect>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <InputGeneral
                      value={data.caudal}
                      type="number"
                      label="Caudal"
                      placeholder="Ingrese el caudal"
                      icon={<PoolIcon></PoolIcon>}
                      onChange={(e) =>
                        seleccionarData("caudal", e.target.value)
                      }
                    ></InputGeneral>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <InputSelect
                      options={si_no}
                      label="Climatizado"
                      placeholder="Selccione"
                      icon={<PoolIcon></PoolIcon>}
                      onChange={(e) =>
                        seleccionarData("climatizado", e.target.textContent)
                      }
                    ></InputSelect>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <InputGeneral
                      value={data.recirculacionMinimo}
                      type="number"
                      label="P. Recirculación mínimo (h)"
                      placeholder="Ingrese P. Recirculación mínimo "
                      icon={<PoolIcon></PoolIcon>}
                      onChange={(e) =>
                        seleccionarData("recirculacionMinimo", e.target.value)
                      }
                    ></InputGeneral>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <InputGeneral
                      value={data.recirculacionMaximo}
                      type="number"
                      label="P. Recirculación máximo (h)"
                      placeholder="Ingrese P. Recirculación máximo (h) "
                      icon={<PoolIcon></PoolIcon>}
                      onChange={(e) =>
                        seleccionarData("recirculacionMaximo", e.target.value)
                      }
                    ></InputGeneral>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <InputSelect
                      options={si_no}
                      label="Dosificación automática"
                      placeholder="Seleccione"
                      icon={<PoolIcon></PoolIcon>}
                      onChange={(e) =>
                        seleccionarData("dosificacion", e.target.textContent)
                      }
                    ></InputSelect>
                  </Grid>
                </Grid>
              </Box>
              {/* Seccion de Equipos */}
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: contador === 4 ? "flex" : "none",
                  flexDirection: "column",
                }}
              >
                {/* Seccion de filtros */}
                <Typography sx={styles.encabezadosEqupios}>
                  Sección de filtros
                </Typography>
                <Grid container>
                  <Grid container xs={12}>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        display: "flex",
                        justifyContent: "end",
                        // backgroundColor: "beige",
                      }}
                    >
                      <IconButton
                        className="button"
                        onClick={addTexfiedl}
                        sx={{
                          color: "green",
                          border: "1px solid green",
                          borderRadius: "0px",
                          marginRight: "2%",
                        }}
                      >
                        <AddCircleIcon></AddCircleIcon>
                      </IconButton>
                    </Grid>
                    {texfiedlList.map((element, index) => (
                      <Grid container key={index}>
                        <Grid xs={12}>
                          <IconButton
                            className="button-delete"
                            onClick={() => handleDelete(index)}
                            sx={{
                              color: "red",
                              border: "1px solid red",
                              borderRadius: "0px",
                              marginTop: "15px",
                            }}
                          >
                            <ClearIcon></ClearIcon>
                          </IconButton>
                        </Grid>
                        <Grid xs={4} sm={12} md={4}>
                          <InputGeneral
                            icon={<PoolIcon></PoolIcon>}
                            label="Filtro"
                            onChange={(e) =>
                              handleInputChange(index, "filter", e.target.value)
                            }
                            value={element.InputUno}
                          />
                        </Grid>
                        <Grid xs={4} sm={12} md={4}>
                          <InputGeneral
                            icon={<PoolIcon></PoolIcon>}
                            label="Altura dle filtro"
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "filterHeight",
                                e.target.value
                              )
                            }
                            value={element.InputDos}
                          />
                        </Grid>
                        <Grid xs={4} sm={12} md={4}>
                          <InputGeneral
                            icon={<PoolIcon></PoolIcon>}
                            label="Diametro del filtro"
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "filterDiameter",
                                e.target.value
                              )
                            }
                            value={element.InputTres}
                          />
                        </Grid>
                        <Grid xs={4} sm={12} md={4}>
                          <InputGeneral
                            icon={<PoolIcon></PoolIcon>}
                            label="Capacidad del filtro"
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "filterCapacity",
                                e.target.value
                              )
                            }
                            value={element.InputCuatro}
                          />
                        </Grid>
                        <Grid xs={4} sm={12} md={4}>
                          <InputGeneral
                            icon={<PoolIcon></PoolIcon>}
                            label="Altura de la cama del filtro"
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "filterBedHeight",
                                e.target.value
                              )
                            }
                            value={element.InputCinco}
                          />
                        </Grid>
                      </Grid>
                    ))}
                    <button className="button" onClick={handleSubmit}>
                      Mostrar
                    </button>
                  </Grid>
                </Grid>

                {/* Seccion de Bomas */}
                <Typography sx={styles.encabezadosEqupios}>
                  Sección de bombas
                </Typography>
                <Grid container>
                  <Grid container xs={12}>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        display: "flex",
                        justifyContent: "end",
                        // backgroundColor: "beige",
                      }}
                    >
                      <IconButton
                        className="button"
                        onClick={addTexfieldBomba}
                        sx={{
                          color: "green",
                          border: "1px solid green",
                          borderRadius: "0px",
                          marginRight: "2%",
                        }}
                      >
                        <AddCircleIcon></AddCircleIcon>
                      </IconButton>
                    </Grid>
                    {textFiedsBomba.map((element, index) => (
                      <Grid container key={index}>
                        <Grid xs={12}>
                          <IconButton
                            className="button-delete"
                            onClick={() => handleDeleteBomba(index)}
                            sx={{
                              color: "red",
                              border: "1px solid red",
                              borderRadius: "0px",
                              marginTop: "15px",
                            }}
                          >
                            <ClearIcon></ClearIcon>
                          </IconButton>
                        </Grid>
                        <Grid xs={4} sm={12} md={4}>
                          <InputGeneral
                            icon={<PoolIcon></PoolIcon>}
                            label="pumpFlow"
                            onChange={(e) =>
                              handleInputChangeBomba(
                                index,
                                "pumpFlow",
                                e.target.value
                              )
                            }
                            value={element.InputUno}
                          />
                        </Grid>
                        <Grid xs={4} sm={12} md={4}>
                          <InputGeneral
                            icon={<PoolIcon></PoolIcon>}
                            label="referencePump"
                            onChange={(e) =>
                              handleInputChangeBomba(
                                index,
                                "referencePump",
                                e.target.value
                              )
                            }
                            value={element.InputDos}
                          />
                        </Grid>
                        <Grid xs={4} sm={12} md={4}>
                          <InputGeneral
                            icon={<PoolIcon></PoolIcon>}
                            label="pumpBrand"
                            onChange={(e) =>
                              handleInputChangeBomba(
                                index,
                                "pumpBrand",
                                e.target.value
                              )
                            }
                            value={element.InputTres}
                          />
                        </Grid>
                        <Grid xs={4} sm={12} md={4}>
                          <InputBuscar
                            icon={<PoolIcon></PoolIcon>}
                            label="dataSheetPump"
                            onChange={(e) =>
                              handleInputChangeBomba(
                                index,
                                "dataSheetPump",
                                e.target.files[0]
                              )
                            }
                            value={element.InputCuatro}
                          />
                        </Grid>
                        <Grid xs={4} sm={12} md={4}>
                          <InputBuscar
                            type="file"
                            icon={<PoolIcon></PoolIcon>}
                            label="platePhoto"
                            onChange={(e) =>
                              handleInputChangeBomba(
                                index,
                                "platePhoto",
                                e.target.files[0]
                              )
                            }
                            value={element.InputCinco}
                          />
                        </Grid>
                      </Grid>
                    ))}
                    <button className="button" onClick={handleSubmitBomba}>
                      Mostrar
                    </button>
                  </Grid>

                  {/* polako */}
                  {/* <Grid item xs={12} sm={12} md={4}>
                    <InputGeneral
                      value={data.caudalBomba}
                      type="number"
                      label="Caudal de bomda"
                      placeholder="Ingrese el caudal de la bomba"
                      icon={<PoolIcon></PoolIcon>}
                      onChange={(e) =>
                        seleccionarData("caudalBomba", e.target.value)
                      }
                    ></InputGeneral>
                  </Grid>

                  <Grid item xs={12} sm={12} md={4}>
                    <InputGeneral
                      value={data.marcaBomba}
                      label="Marca de bomda"
                      placeholder="Ingrese la marca de la bomba"
                      icon={<PoolIcon></PoolIcon>}
                      onChange={(e) =>
                        seleccionarData("marcaBomba", e.target.value)
                      }
                    ></InputGeneral>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <InputGeneral
                      value={data.referenciaBomba}
                      label="Referencia de bomda"
                      placeholder="Ingrese la Referncia de la bomba"
                      icon={<PoolIcon></PoolIcon>}
                      onChange={(e) =>
                        seleccionarData("referenciaBomba", e.target.value)
                      }
                    ></InputGeneral>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    sx={{
                      height: "90px",
                      // backgroundColor: "red",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingLeft: "15px",
                      overflow: "scroll",
                    }}
                  >
                    <InputBuscar
                      label="Foto placa bomba"
                      onChange={(e) =>
                        seleccionarData("fotoBomba", e.target.files[0])
                      }
                    ></InputBuscar>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    sx={{
                      height: "90px",
                      // backgroundColor: "red",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingLeft: "15px",
                      overflow: "scroll",
                    }}
                  >
                    <InputBuscar
                      label="Ficha Tecnica"
                      onChange={(e) =>
                        seleccionarData("fichaTecnica", e.target.files[0])
                      }
                    ></InputBuscar>
                  </Grid> */}
                </Grid>

                {/* Seccion Calentador */}
                <Typography sx={styles.encabezadosEqupios}>
                  Sección de calentador
                </Typography>
                <Grid container>
                  <Grid container xs={12}>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        display: "flex",
                        justifyContent: "end",
                        // backgroundColor: "beige",
                      }}
                    >
                      <IconButton
                        className="button"
                        onClick={addTexfieldCalentaodr}
                        sx={{
                          color: "green",
                          border: "1px solid green",
                          borderRadius: "0px",
                          marginRight: "2%",
                        }}
                      >
                        <AddCircleIcon></AddCircleIcon>
                      </IconButton>
                    </Grid>
                    {textfiledCalentador.map((element, index) => (
                      <Grid container key={index}>
                        <Grid xs={12}>
                          <IconButton
                            className="button-delete"
                            onClick={() => handleDeleteCalentador(index)}
                            sx={{
                              color: "red",
                              border: "1px solid red",
                              borderRadius: "0px",
                              marginTop: "15px",
                            }}
                          >
                            <ClearIcon></ClearIcon>
                          </IconButton>
                        </Grid>
                        <Grid xs={4} sm={12} md={4}>
                          <InputGeneral
                            icon={<PoolIcon></PoolIcon>}
                            label="heaterReference"
                            onChange={(e) =>
                              handleInputChangeCalentaodr(
                                index,
                                "heaterReference",
                                e.target.value
                              )
                            }
                            value={element.InputUno}
                          />
                        </Grid>
                        <Grid xs={4} sm={12} md={4}>
                          <InputGeneral
                            icon={<PoolIcon></PoolIcon>}
                            label="heaterBrand"
                            onChange={(e) =>
                              handleInputChangeCalentaodr(
                                index,
                                "heaterBrand",
                                e.target.value
                              )
                            }
                            value={element.InputDos}
                          />
                        </Grid>
                        <Grid xs={4} sm={12} md={4}>
                          <InputBuscar
                            icon={<PoolIcon></PoolIcon>}
                            label="dataSheetHeater"
                            onChange={(e) =>
                              handleInputChangeCalentaodr(
                                index,
                                "dataSheetHeater",
                                e.target.files[0]
                              )
                            }
                            value={element.InputTres}
                          />
                        </Grid>
                      </Grid>
                    ))}
                    <button className="button" onClick={handleSubmitBomba}>
                      Mostrar
                    </button>
                  </Grid>
                </Grid>
                <Grid xs={12}>
                  <Button
                    onClick={() => crearPiscina()}
                    sx={{
                      backgroundColor: "rgb(0,164,228)",
                      color: "white",
                      width: "95%",
                      marginTop: "10px",
                      marginBottom: "10px",
                      marginLeft: "2.5%",
                      ":hover": {
                        backgroundColor: "rgb(0,164,228)",
                      },
                    }}
                  >
                    Guardar
                  </Button>
                </Grid>
              </Box>

              {/* Seccion de las flechas */}
            </Box>
            <Box
              sx={{
                // backgroundColor: "gray",
                marginTop: contador === 4 ? "46px" : "0px",
                width: "95%",
                marginLeft: "2.5%",
                display: "flex",
                justifyContent: contador === 1 ? "flex-end" : "space-between",
              }}
            >
              <KeyboardDoubleArrowLeftIcon
                sx={{
                  ...styles.arrows,
                  display: contador === 1 ? "none" : "flex",
                }}
                onClick={() => decrementar()}
              ></KeyboardDoubleArrowLeftIcon>
              <KeyboardDoubleArrowRightIcon
                sx={styles.arrows}
                onClick={() => incrementar()}
              ></KeyboardDoubleArrowRightIcon>
            </Box>
          </Box>
        </Box>
      </Box>
      <Alertas
        open={open}
        mensaje={mensaje}
        severity={color}
        cerrar={() => setOpen(false)}
      ></Alertas>
    </Box>
  );
}

export default CrearPiscina;

const styles = {
  generalContainer: {
    overflowX: "hidden",
    height: "100vh",
  },

  crearPiscina: {
    backgroundColor: "rgb(0,164,228)",
    width: "150px",
    height: "40px",
    fontFamily: "'Nunito Sans', sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "white",
    borderRadius: "5px 0px 0px 5px",
    marginRight: "5px",
  },

  contenedorInputs: {
    backgroundColor: "white",
    width: "90%",
    marginLeft: "5%",
    height: "89%",
    borderRadius: "5px",
    boxShadow: "0px 5px 5px 0px black",
    border: "1px solid black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  arrows: {
    cursor: "pointer",
    "&:hover": {
      color: "rgb(0,164,228)",
    },
  },

  encabezadosEqupios: {
    width: "95%",
    marginLeft: "2.5%",
    marginTop: "20px",
    marginBottom: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontFamily: "'Nunito Sans', sans-serif",
    borderBottom: "3px solid black",
  },
};
