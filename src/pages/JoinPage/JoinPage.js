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
import { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import axiosInstance from "../../Components/AxiosInstance";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

const defaultTheme = createTheme();

function JoinPage() {
  const navigate = useNavigate();

  //유저네임, 닉네임, 이메일 중복체크용 state
  const [usernameChecked, setUsernameChecked] = useState(false);
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);

  const handleTempChange = (event) => {
    const { name, value } = event.target;
    setTempValues((prevState) => ({ ...prevState, [name]: value }));

    // 값이 변경되면 상태를 초기화
    switch (name) {
      case "username":
        setUsernameChecked(false);
        break;
      case "nickname":
        setNicknameChecked(false);
        break;
      case "email":
        setEmailChecked(false);
        break;
      default:
        break;
    }
  };

  const checkDuplicate = (type) => {
    const regex = /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/;

    if (!tempValues[type]) {
      alert(`${fieldDisplayNames[type]}를 입력해주세요.`);
      return;
    } else if (!regex.test(tempValues[type])) {
      alert(`알파벳, 숫자, 특수문자만 입력해주세요.`);
      return;
    }

    axiosInstance
      .post(`api/users/valid/${type}`, { [type]: tempValues[type] })
      .then((response) => {
        if (response.status === 200) {
          switch (type) {
            case "username":
              setUsernameChecked(true);
              break;
            case "nickname":
              setNicknameChecked(true);
              break;
            case "email":
              setEmailChecked(true);
              break;
            default:
              break;
          }
        } else {
          alert("서버 응답 오류. 다시 시도해주세요.");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          alert("중복되었습니다.");
        } else {
          alert("서버 응답 오류. 다시 시도해주세요.");
        }
      });
  };

  const fieldDisplayNames = {
    username: "아이디를",
    nickname: "닉네임을",
    email: "이메일을",
  };

  const iconButtonStyles = {
    width: 100,
    mr: 1,
    backgroundColor: "white",
    fontSize: "16px",
    borderRadius: "3px",
    Animation: "none",
    "&:hover": {
      mr: 1,
      borderRadius: "3px",
      // border: "0px solid dodgerblue",
    },
  };

  //이메일 유효성 체크
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const [isValidEmail, setIsValidEmail] = useState(false);

  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    setTempValues((prevState) => ({ ...prevState, email: emailValue }));
    setIsValidEmail(emailRegex.test(emailValue));
  };

  //////////여기까지 유저네임, 닉네임, 이메일

  const [buttonState, setButtonState] = useState({
    color: "default", //
    text: "중복확인", //
  });

  //유저네임, 닉네임, 이메일 state
  const [upperInfo, setUpperInfo] = useState({
    username: "",
    nickname: "",
    email: "",
  });

  //사용자에게 보이게하는부분
  const [tempValues, setTempValues] = useState({
    username: "",
    nickname: "",
    email: "",
  });

  const handleFinalizeInput = (event) => {
    const { name, value } = event.target;
    setUpperInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  //비밀번호관련
  const [password, setPassword] = useState(""); //비밀번호 state
  const [passwordState, setPasswordState] = useState(
    "8자리 이상, 알파벳과 숫자만 입력 가능.(특수문자 제외)"
  ); //비밀번호 유효성 state
  const [passwordConfirmState, setPasswordConfirmState] = useState(
    "동일한 비밀번호를 입력하여 주세요."
  ); //비밀번호 재확인 state
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); //가입버튼 활성화 관리 state

  //가입 완료 알러트 state
  const [showJoinAlert, setShowJoinAlert] = useState(false);

  //가입완료 서밋 함수
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const nickname = data.get("nickname");
    const email = data.get("email");
    const password = data.get("password");

    console.log({
      username: data.get("username"),
      nickname: data.get("nickname"),
      email: data.get("email"),
      password: data.get("password"),
    });

    //조건문 달아서 가입완료여부 확인하고 가입완료 -> 가입 불가 나누기
    axiosInstance
      .post("api/users", { username, nickname, email, password })
      .then((response) => {
        //응답이 200이면 회원가입, 로그인페이지로 이동
        if (response.status === 200) {
          //가입 완료 메시지 알러트
          setShowJoinAlert(true);
          // 알림 표시 후 3초 후에 메인화면으로 이동
          setTimeout(() => {
            navigate("/main");
          }, 3000);
        } else {
          alert("회원가입실패");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          alert("잘못된 정보를 입력하였습니다.");
        } else {
          alert("문제가 발생하였습니다.");
        }
      });
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
            }} >
            <Typography component="h1" variant="h5">
              회원 정보를 기입하세요.
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
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="User ID"
                  value={tempValues.username}
                  onChange={handleTempChange}
                  onBlur={handleFinalizeInput}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          sx={iconButtonStyles}
                          edge="end"
                          color={usernameChecked ? "primary" : "default"}
                          onClick={() => checkDuplicate("username")}
                        >
                          {usernameChecked ? "확인완료!" : "중복확인"}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  margin="dense"
                  autoComplete="nickname"
                  name="nickname"
                  required
                  fullWidth
                  id="nickname"
                  label="Nick Name"
                  value={tempValues.nickname}
                  onChange={handleTempChange}
                  onBlur={handleFinalizeInput}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          disableRipple //안먹힘! 클릭효과 안사라짐!
                          sx={iconButtonStyles}
                          edge="end"
                          color={nicknameChecked ? "primary" : "default"}
                          onClick={() => checkDuplicate("nickname")}
                        >
                          {nicknameChecked ? "확인완료!" : "중복확인"}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={tempValues.email}
                  onChange={handleTempChange}
                  onBlur={handleFinalizeInput}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          sx={iconButtonStyles}
                          edge="end"
                          color={emailChecked ? "primary" : "default"}
                          onClick={() => checkDuplicate("email")}
                        >
                          {emailChecked ? "확인완료!" : "중복확인"}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
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
          {/* 가입완료알러트 */}
          {showJoinAlert && (
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
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default JoinPage;
