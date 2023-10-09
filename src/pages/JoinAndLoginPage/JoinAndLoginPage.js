import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Components/AxiosInstance"; // 경로는 axiosInstance 파일 위치에 따라 조정
import LoginPage from "../LoginPage/LoginPage";
import JoinPage from "../JoinPage/JoinPage";
import { Routes, Route } from "react-router-dom";

const WorldWide = "/images/worldwide.jpeg";

const defaultTheme = createTheme();

function JoinAndLoginPage({ onLogin }) {
  const navigate = useNavigate();

  // const [username, setUsername] = React.useState("");
  // const [password, setPassword] = React.useState("");

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log({
  //     email: username,
  //     password: password,
  //   });
  // };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${WorldWide})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* 상단아이콘 */}
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              MOGAKO FLAG
            </Typography>

            <Box
              sx={{
                my: 2,
                mx: 2,
              }}
            >
              <Routes>
                <Route path="/" element={<LoginPage onLogin={onLogin} />} />
                <Route path="/join" element={<JoinPage />} />
                <Route path="/login" element={<LoginPage />} />

              </Routes>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default JoinAndLoginPage;
