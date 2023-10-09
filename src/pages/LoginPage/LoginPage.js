import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Muilink from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, Link } from "react-router-dom";

import axiosInstance from "../../Components/AxiosInstance"; // 경로는 axiosInstance 파일 위치에 따라 조정

const WorldWide = "/images/worldwide.jpeg";

const defaultTheme = createTheme();

function LoginPage({ onLogin }) {
  const navigate = useNavigate();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {
    axiosInstance
      .post("api/auth/login", { username, password })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          const userId = response.data.userInfo.userId;

          localStorage.setItem("userId", response.data.userInfo.userId);
          localStorage.setItem('nickname', response.data.userInfo.nickname);
          localStorage.setItem('username', response.data.userInfo.username);
          // localStorage.setItem('AccessToken', response.data.accessToken.value);

          onLogin(true); // 로그인 성공시 true로 설정
          navigate("/choosestage");
        } else {
          alert("로그인에 실패하였습니다.");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        if (error.response && error.response.status === 400) {
          alert("잘못된 정보를 입력하였습니다.");
        } else {
          alert("로그인 중 문제가 발생하였습니다.");
        }
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      email: username,
      password: password,
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{
          height: "60vh",
          my: 0,
          mx: 0,
        }}
      >
        <CssBaseline />
        <Grid item elevation={6} square>
          <Box
            sx={{
              mt: 0,
              mb: 4,
              mx: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: 350,
            }}
          >
            <Typography component="h1" variant="h6" sx={{ mb: 4 }}>
              방문을 환영합니다!
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="username"
                name="email"
                autoComplete="email"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="비밀번호"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                onClick={handleLogin}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 1 }}
              >
                로그인하기
              </Button>
              <Grid container justifyContent="center" alignItems="center">
                <Grid item>
                  <Link to="join" variant="body2">
                    {"If you don't have an ID, please click here!"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default LoginPage;
