import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Typography } from "@mui/material";

const Header: React.FC = () => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Typography textAlign={'center'} fontSize={"18px"}> Notification center</Typography>
      </Toolbar>
    </AppBar>
  </Box>
);
export default Header;
