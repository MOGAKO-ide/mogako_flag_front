import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const defaultTheme = createTheme();

function JoinPage() {
  const navigate = useNavigate();
  //비밀번호 state
  const [password, setPassword] = useState("");
  //비밀번호 유효성 state
  const [passwordState, setPasswordState] = useState(
    "8자리 이상, 알파벳과 숫자만 입력 가능.(특수문자 제외)"
  );
  //비밀번호 재확인 state
  const [passwordConfirmState, setPasswordConfirmState] = useState(
    "동일한 비밀번호를 입력하여 주세요."
  );
  //가입버튼 활성화 관리 state
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  //가입확인 알러트 state
  const [showAlert, setShowAlert] = useState(false);

  //가입완료 서밋 함수
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userName = data.get("userName");
    const nickName = data.get("nickName");
    const email = data.get("email");
    const password = data.get("password");

    console.log({
      userName: data.get("userName"),
      nickName: data.get("nickName"),
      email: data.get("email"),
      password: data.get("password"),
      passwordConfirm: data.get("passwordConfirm"),
    });

    //가입 완료 메시지 알러트
    setShowAlert(true);
    // 알림 표시 후 3초 후에 메인화면으로 이동
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  //비밀번호 유효성 검사함수
  const handlePasswordCheck = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    if (
      newPassword === "" ||
      newPassword.length < 8 ||
      !/^[a-zA-Z0-9]+$/.test(newPassword)
    ) {
      setPasswordState("8자리 이상, 알파벳과 숫자만 입력 가능.(특수문자 제외)");
      setIsButtonDisabled(true);
    } else {
      setPasswordState("유효한 비밀번호 입니다.");
      setIsButtonDisabled(true);
    }
  };

  //비밀번화 재확인 검사함수
  const handlePasswordConfirm = (event) => {
    const newPasswordConfirm = event.target.value;

    if (newPasswordConfirm !== "") {
      if (newPasswordConfirm !== password) {
        setPasswordConfirmState("동일한 비밀번호를 입력하여 주세요.");
        setIsButtonDisabled(true);
      } else {
        setPasswordConfirmState("비밀번호 확인완료.");
        setIsButtonDisabled(false);
      }
    }
  };

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
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
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
            <Avatar sx={{ m: 1, bgcolor: "gray" }}>
              <AssignmentIndIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              회원 정보를 입력하여 주세요.
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <Box sx={{ mb: 4 }}>
                {" "}
                {/* 유저네임, 닉네임, 이메일 부분 */}
                <TextField
                  margin="dense"
                  autoComplete="name"
                  name="userName"
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                />
                <TextField
                  margin="dense"
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Nick Name"
                />
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Box>

              <Box>
                {" "}
                {/* 패스워드 부분 */}
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={handlePasswordCheck}
                />
                <Typography
                  variant="body2"
                  gutterBottom
                  component="div"
                  sx={{
                    mt: 0,
                    color:
                      passwordState === "유효한 비밀번호 입니다."
                        ? "blue"
                        : "inherit",
                  }}
                >
                  - {passwordState}
                </Typography>
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  name="passwordConfirm"
                  label="Password Confirm"
                  type="password"
                  id="passwordConfirm"
                  onChange={handlePasswordConfirm}
                />
                <Typography
                  variant="body2"
                  gutterBottom
                  component="div"
                  sx={{
                    mt: 0,
                    color:
                      passwordConfirmState === "비밀번호 확인완료."
                        ? "blue"
                        : "inherit",
                  }}
                >
                  - {passwordConfirmState}
                </Typography>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isButtonDisabled}
                >
                  가입완료
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* 알림 표시 조건 추가 */}
      {showAlert && (
        <Stack
          sx={{
            width: "100%",
            position: "absolute",
            top: 10,
            left: "50%",
            transform: "translateX(-50%)",
          }}
          spacing={2}
        >
          <Alert severity="success">가입이 완료되었습니다.</Alert>
        </Stack>
      )}
    </ThemeProvider>
  );
}

export default JoinPage;
