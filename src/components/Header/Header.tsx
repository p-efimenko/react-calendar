import React from "react";
import { AppBar, Toolbar, IconButton, Box, Stack } from "@mui/material";

import { Menu } from "@mui/icons-material";

import { ApplicationName, CalendarNavigation, Search } from "./components";

export const Header: React.FC = () => {
  //
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent" sx={{ width: "100%" }}>
          <Toolbar>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ width: "100%" }}
            >
              <CalendarNavigation />
              <Search />
            </Stack>
          </Toolbar>
        </AppBar>
      </Box>
      {/* <Stack height={64} p={1} direction="row" alignItems="center"></Stack> */}
    </>
  );
};
