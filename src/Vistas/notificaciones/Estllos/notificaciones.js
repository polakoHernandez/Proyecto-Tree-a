const styles = {
  generalContainer: {
    overflowX: "hidden",
    height: "100vh",
    // backgroundColor: "red",
  },

  container: {
    //backgroundColor: "pink",
    width: "80%",
    marginTop: "10px",
    marginLeft: "10%",
    height: "100%",
  },

  encabezado: {
    // backgroundColor: "cyan",
    height: "10%",
    display: "flex",
    justifyContent: "space-between",
    aligItems: "center",
  },

  containerFormulario: {
    backgroundColor: "white",
    height: "85%",
    overflowY: "scroll",
    backgroundColor: "white",
    marginLeft: "2.5%",
    borderRadius: "5px",
    boxShadow: "0px 5px 5px 0px black",
    border: "1px solid black",
  },

  textoEncabezado: {
    backgroundColor: "rgb(0,164,228)",
    width: "15%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Nunito Sans', sans-serif",
    color: "white",
    borderRadius: "15px 0px 0px 0px",
  },

  boxFormulario: {
    // backgroundColor: "red",
    width: "95%",
    marginLeft: "2.5%",
    height: "85%",
    overflowY: "scroll",
  },

  button: {
    width: "95%",
    marginLeft: "2.5%",
    marginTop: "10px",
    marginBottom: "10px",
    backgroundColor: "rgb(0, 164, 228)",
    "&:hover": {
      backgroundColor: "rgb(0,164,228)",
    },
  },

  containerTypografhys: {
    display: "flex",
    // backgroundColor: "red",
    marginLeft: { xs: "3%", sm: "3%", md: "3%", lg: "3%" },
  },

  containerFlechas: {
    // backgroundColor: "pink",
    width: "95%",
    marginLeft: "2.5%",
    display: "flex",
    justifyContent: "space-between",
  },
};

export default styles;
