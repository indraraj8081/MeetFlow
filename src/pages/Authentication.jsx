
import * as React from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { alpha, createTheme, ThemeProvider } from "@mui/material/styles";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import ScreenShareRoundedIcon from "@mui/icons-material/ScreenShareRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { AuthContext } from "../contexts/authContext.jsx";

const theme = createTheme({
  palette: {
    primary: { main: "#635BEE", dark: "#5046D8" },
    background: { default: "#F5F7FF", paper: "#FFFFFF" },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
    button: { textTransform: "none", fontWeight: 700 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { minHeight: 48, borderRadius: 12 },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: "#FFFFFF",
        },
      },
    },
  },
});

export default function Authentication() {
  const { handleLogin, handleRegister } = React.useContext(AuthContext);

  const [formState, setFormState] = React.useState(0);
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const isRegister = formState === 1;

  const switchMode = (mode) => {
    setFormState(mode);
    setName("");
    setUsername("");
    setPassword("");
    setError("");
    setShowPassword(false);
  };

  const handleAuth = async (event) => {
    event.preventDefault();
    setError("");

    if (isRegister && !name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!username.trim() || !password) {
      setError("Please enter your username and password.");
      return;
    }

    if (isRegister && password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);

    try {
      if (isRegister) {
        const result = await handleRegister(
          name.trim(),
          username.trim(),
          password
        );

        setMessage(
          typeof result === "string"
            ? result
            : "Your account has been created successfully!"
        );
        setOpen(true);
        switchMode(0);
      } else {
        await handleLogin(username.trim(), password);
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 2, sm: 4 },
          background:
            "radial-gradient(circle at 10% 10%, #E4E7FF 0, transparent 35%), radial-gradient(circle at 90% 90%, #DCEBFF 0, transparent 35%), #F5F7FF",
        }}
      >
        <Container maxWidth="md" disableGutters>
          <Paper
            elevation={0}
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "0.95fr 1.05fr" },
              overflow: "hidden",
              borderRadius: { xs: 3, md: 4 },
              border: "1px solid #E8E9F6",
              boxShadow: "0 24px 80px rgba(47, 54, 110, 0.13)",
            }}
          >
            {/* MeetFlow branding panel */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden",
                p: 4,
                color: "#FFFFFF",
                background:
                  "linear-gradient(145deg, #171A45 0%, #393A9D 55%, #6B63F5 100%)",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  width: 320,
                  height: 320,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.14)",
                  right: -170,
                  top: 120,
                }}
              />

              <Box sx={{ position: "relative", zIndex: 1 }}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Avatar
                    variant="rounded"
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: "rgba(255,255,255,0.17)",
                      color: "#FFFFFF",
                      borderRadius: 2.5,
                    }}
                  >
                    <VideocamRoundedIcon fontSize="large" />
                  </Avatar>

                  <Box>
                    <Typography variant="h5" fontWeight={800}>
                      MeetFlow
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      Meet better. Work smarter.
                    </Typography>
                  </Box>
                </Stack>

                <Box sx={{ mt: 9, mb: 5 }}>
                  <Typography
                    variant="overline"
                    sx={{ letterSpacing: 2, color: "#C5C4FF" }}
                  >
                    CONNECT FROM ANYWHERE
                  </Typography>

                  <Typography
                    variant="h3"
                    fontWeight={800}
                    lineHeight={1.15}
                    sx={{ mt: 2, mb: 2 }}
                  >
                    Great conversations start here.
                  </Typography>

                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.78)",
                      lineHeight: 1.8,
                    }}
                  >
                    Bring your team together, share ideas, and make every
                    meeting more productive with MeetFlow.
                  </Typography>
                </Box>

                {/* Feature cards */}
                <Stack spacing={1.5}>
                  {[
                    {
                      icon: <GroupsRoundedIcon />,
                      title: "Team meetings",
                      subtitle: "Connect with people in real time",
                    },
                    {
                      icon: <ScreenShareRoundedIcon />,
                      title: "Share your ideas",
                      subtitle: "Collaborate and present together",
                    },
                    {
                      icon: <SecurityRoundedIcon />,
                      title: "Account security",
                      subtitle: "Sign in to your personal account",
                    },
                  ].map((feature) => (
                    <Stack
                      key={feature.title}
                      direction="row"
                      spacing={1.5}
                      alignItems="center"
                      sx={{
                        p: 1.5,
                        borderRadius: 2.5,
                        bgcolor: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.10)",
                      }}
                    >
                      <Box sx={{ color: "#C5C4FF", display: "flex" }}>
                        {feature.icon}
                      </Box>
                      <Box>
                        <Typography fontWeight={700} variant="body2">
                          {feature.title}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "rgba(255,255,255,0.7)" }}
                        >
                          {feature.subtitle}
                        </Typography>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
              </Box>

              <Typography
                variant="caption"
                sx={{
                  mt: 4,
                  position: "relative",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                Connect. Collaborate. Achieve more.
              </Typography>
            </Box>

            {/* Sign in / Sign up form */}
            <Box
              sx={{
                p: { xs: 3, sm: 5 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {/* Mobile branding */}
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                sx={{ display: { xs: "flex", md: "none" }, mb: 4 }}
              >
                <Avatar
                  variant="rounded"
                  sx={{
                    bgcolor: "primary.main",
                    color: "#FFFFFF",
                    width: 46,
                    height: 46,
                    borderRadius: 2.5,
                  }}
                >
                  <VideocamRoundedIcon fontSize="large" />
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight={800}>
                    MeetFlow
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Meet better. Work smarter.
                  </Typography>
                </Box>
              </Stack>

              <Avatar
                sx={{
                  width: 54,
                  height: 54,
                  mb: 2.5,
                  bgcolor: alpha("#635BEE", 0.1),
                  color: "primary.main",
                }}
              >
                <VideocamRoundedIcon fontSize="large" />
              </Avatar>

              <Typography
                variant="h4"
                fontWeight={800}
                sx={{ letterSpacing: "-0.8px", mb: 1 }}
              >
                {isRegister ? "Create your account" : "Welcome back"}
              </Typography>

              <Typography color="text.secondary" sx={{ mb: 3 }}>
                {isRegister
                  ? "Join MeetFlow and connect with your team."
                  : "Sign in to join your meetings and connect with your team."}
              </Typography>

              <Stack
                direction="row"
                spacing={0.5}
                sx={{
                  bgcolor: "#F0F1FA",
                  p: 0.5,
                  borderRadius: 2.5,
                  mb: 3,
                }}
              >
                <Button
                  fullWidth
                  variant={!isRegister ? "contained" : "text"}
                  disableElevation
                  onClick={() => switchMode(0)}
                  sx={{
                    color: !isRegister ? "#FFFFFF" : "text.secondary",
                  }}
                >
                  Sign In
                </Button>

                <Button
                  fullWidth
                  variant={isRegister ? "contained" : "text"}
                  disableElevation
                  onClick={() => switchMode(1)}
                  sx={{
                    color: isRegister ? "#FFFFFF" : "text.secondary",
                  }}
                >
                  Sign Up
                </Button>
              </Stack>

              <Box component="form" onSubmit={handleAuth} noValidate>
                {isRegister && (
                  <TextField
                    label="Full name"
                    name="name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    inputProps={{ maxLength: 128 }}
                    autoFocus
                    sx={{ mb: 2 }}
                  />
                )}

                <TextField
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  inputProps={{ maxLength: 128 }}
                  autoFocus={!isRegister}
                  sx={{ mb: 2 }}
                />

                <TextField
                  label="Password"
                  name="password"
                  autoComplete={
                    isRegister ? "new-password" : "current-password"
                  }
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  inputProps={{ maxLength: 128 }}
                  sx={{ mb: 1 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          onClick={() =>
                            setShowPassword((previous) => !previous)
                          }
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOffOutlinedIcon />
                          ) : (
                            <VisibilityOutlinedIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {!isRegister && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block", textAlign: "right", mb: 2 }}
                  >
                    {/* Enter your registered username to continue. */}
                  </Typography>
                )}

                {error && (
                  <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                    {error}
                  </Alert>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  endIcon={
                    !loading && <ArrowForwardRoundedIcon />
                  }
                  sx={{
                    mt: 1,
                    py: 1.5,
                    background:
                      "linear-gradient(100deg, #635BEE, #8175F5)",
                    boxShadow: "0 8px 22px rgba(99,91,238,0.24)",
                    "&:hover": {
                      background:
                        "linear-gradient(100deg, #5046D8, #7063E9)",
                      boxShadow: "0 10px 26px rgba(99,91,238,0.32)",
                    },
                  }}
                >
                  {loading
                    ? "Please wait..."
                    : isRegister
                      ? "Create Account"
                      : "Sign In to MeetFlow"}
                </Button>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                {isRegister
                  ? "Already have an account? "
                  : "New to MeetFlow? "}
                <Link
                  component="button"
                  type="button"
                  underline="hover"
                  onClick={() => switchMode(isRegister ? 0 : 1)}
                  sx={{
                    fontWeight: 700,
                    color: "primary.main",
                    verticalAlign: "baseline",
                  }}
                >
                  {isRegister ? "Sign in" : "Create an account"}
                </Link>
              </Typography>
            </Box>
          </Paper>

          <Typography
            variant="caption"
            color="text.secondary"
            textAlign="center"
            display="block"
            sx={{ mt: 3 }}
          >
            © {new Date().getFullYear()} MeetFlow. All rights reserved.
          </Typography>
        </Container>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={(_, reason) => {
          if (reason !== "clickaway") setOpen(false);
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setOpen(false)}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
