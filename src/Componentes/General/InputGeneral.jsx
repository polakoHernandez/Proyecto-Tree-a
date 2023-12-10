import React, { useState, useEffect } from "react";
import { Box, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function InputGeneral() {
  const [see, setSee] = useState(false);
  return (
    <TextField
      // disabled={estadoBoton}
      // onChange={capturarCredenciales}

      name="contrasena"
      variant="outlined"
      label="Contraseña"
      color="primary"
      type={see ? "text" : "password"}
      sx={{ width: "90%", marginLeft: "5%" }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setSee(!see)}
              edge="end"
              sx={{
                backgroundColor: "rgb(0,164,228)",
                color: "white",
                width: "50px",
                height: "55px",
                borderRadius: "0",
                marginLeft: "-22px",
                marginRight: "10px",
              }}
            >
              {see ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default InputGeneral;
