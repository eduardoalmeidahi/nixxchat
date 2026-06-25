import React, { useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid"; 
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { toast } from "react-toastify";

import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import SecurityIcon from "@material-ui/icons/Security";
import ForumIcon from "@material-ui/icons/Forum";
import PeopleIcon from "@material-ui/icons/People";
import AssessmentIcon from "@material-ui/icons/Assessment";

import { versionSystem } from "../../../package.json";
import { AuthContext } from "../../context/Auth/AuthContext";

import logo from "../../assets/logo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    backgroundColor: "#ffffff",
    overflow: "hidden",
    fontFamily: "'Inter', sans-serif",
  },
  leftPanel: {
    flex: 1.1,
    backgroundColor: "#ffffff",
    padding: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    color: "#1a202c",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  rightPanel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "radial-gradient(circle at 80% 20%, rgba(32, 180, 98, 0.12) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.12) 0%, transparent 50%), #060f1e",
    padding: theme.spacing(4),
    position: "relative",
    overflow: "hidden",
  },
  bgOrb1: {
    position: "absolute",
    top: "10%",
    right: "10%",
    width: "250px",
    height: "250px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(32, 180, 98, 0.15) 0%, rgba(32, 180, 98, 0) 70%)",
    filter: "blur(40px)",
    zIndex: 1,
    animation: "$float 6s ease-in-out infinite",
  },
  bgOrb2: {
    position: "absolute",
    bottom: "10%",
    left: "10%",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0) 70%)",
    filter: "blur(50px)",
    zIndex: 1,
    animation: "$float 8s ease-in-out infinite alternate",
  },
  "@keyframes float": {
    "0%": {
      transform: "translateY(0px)",
    },
    "50%": {
      transform: "translateY(-15px)",
    },
    "100%": {
      transform: "translateY(0px)",
    },
  },
  leftContentWrapper: {
    maxWidth: "500px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  logoImg: {
    height: "160px",
    marginBottom: theme.spacing(2),
    objectFit: "contain",
    alignSelf: "flex-start",
  },
  brandText: {
    fontSize: "12px",
    color: "#20B462",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "3px",
    marginBottom: theme.spacing(4),
    alignSelf: "flex-start",
  },
  heroTitle: {
    fontSize: "32px",
    fontWeight: "800",
    lineHeight: "1.3",
    color: "#0f172a",
    marginBottom: theme.spacing(2.5),
    textAlign: "left",
    "& span": {
      color: "#20B462",
    },
  },
  heroDesc: {
    fontSize: "15px",
    color: "#475569",
    lineHeight: "1.6",
    marginBottom: theme.spacing(5),
    textAlign: "left",
  },
  featuresList: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    width: "100%",
  },
  featureItem: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
  },
  featureIconContainer: {
    padding: "12px",
    borderRadius: "12px",
    backgroundColor: "rgba(32, 180, 98, 0.08)",
    color: "#20B462",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "48px",
    height: "48px",
  },
  featureTitle: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "2px",
  },
  featureDesc: {
    fontSize: "13px",
    color: "#64748b",
  },
  // Right side Card
  loginCard: {
    width: "100%",
    maxWidth: "440px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.25)",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 2,
  },
  cardTitle: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "8px",
  },
  cardSubtitle: {
    fontSize: "14px",
    color: "#64748b",
    marginBottom: theme.spacing(4),
  },
  inputLabel: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#475569",
    marginBottom: "6px",
    alignSelf: "flex-start",
    width: "100%",
    textAlign: "left",
  },
  textField: {
    marginBottom: theme.spacing(3),
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      "&.Mui-focused fieldset": {
        borderColor: "#20B462",
      },
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "#20B462",
    },
  },
  forgotLink: {
    fontSize: "13px",
    color: "#20B462",
    fontWeight: "600",
    textDecoration: "none",
    alignSelf: "flex-end",
    marginBottom: theme.spacing(3),
    "&:hover": {
      textDecoration: "underline",
    },
  },
  submitBtn: {
    height: "48px",
    borderRadius: "8px",
    backgroundColor: "#20B462",
    color: "#ffffff",
    fontWeight: "600",
    fontSize: "15px",
    textTransform: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#199750",
      boxShadow: "none",
    },
  },
  divider: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    margin: "20px 0",
    color: "#94a3b8",
    fontSize: "12px",
    "&::before, &::after": {
      content: '""',
      flex: 1,
      height: "1px",
      backgroundColor: "#e2e8f0",
    },
    "&::before": {
      marginRight: "10px",
    },
    "&::after": {
      marginLeft: "10px",
    },
  },
  googleBtn: {
    height: "46px",
    width: "100%",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    backgroundColor: "#ffffff",
    color: "#334155",
    fontSize: "14px",
    fontWeight: "600",
    textTransform: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#f8fafc",
      boxShadow: "none",
    },
  },
  signupPrompt: {
    fontSize: "14px",
    color: "#64748b",
    marginTop: "24px",
    "& a": {
      color: "#20B462",
      fontWeight: "600",
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
  securityFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginTop: "24px",
    color: "#94a3b8",
    fontSize: "13px",
    zIndex: 2,
  },
  copyrightFooter: {
    position: "absolute",
    bottom: "20px",
    color: "#94a3b8",
    fontSize: "12px",
    textAlign: "center",
    width: "100%",
    zIndex: 2,
  },
}));

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" style={{ marginRight: '8px' }}>
    <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114A5.59 5.59 0 0 1 8.4 12.928a5.59 5.59 0 0 1 5.59-5.592c2.186 0 4.148 1.054 5.378 2.7l3.228-3.23a10.02 10.02 0 0 0-8.606-4.66C8.42 2.146 3.9 6.666 3.9 12.246s4.52 10.1 10.09 10.1c5.8 0 9.77-4.08 9.77-9.94 0-.612-.054-1.2-.164-1.77H12.24Z" />
  </svg>
);

const Login = () => {
  const classes = useStyles();
  const [user, setUser] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const { handleLogin } = useContext(AuthContext);

  const handleChangeInput = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlSubmit = e => {
    e.preventDefault();
    handleLogin(user);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      
      {/* PAINEL ESQUERDO (HERO - FUNDO BRANCO PURO) */}
      <div className={classes.leftPanel}>
        <div className={classes.leftContentWrapper}>
          {/* LOGO EM DESTAQUE E AUMENTADA */}
          <img className={classes.logoImg} src={logo} alt="Nixx Chat" />
          
          {/* MARCA NIXX SUITE SOFTWARE HOUSE */}
          <Typography className={classes.brandText}>
            Nixx Suite Software House
          </Typography>

          {/* CONTEÚDO CENTRAL */}
          <Typography variant="h1" className={classes.heroTitle}>
            A plataforma WhatsApp CRM que <span>impulsiona</span> o seu negócio.
          </Typography>
          
          <Typography className={classes.heroDesc}>
            Centralize atendimentos, organize conversas e aumente suas vendas com mais eficiência.
          </Typography>

          {/* LISTA DE RECURSOS CLEAN */}
          <div className={classes.featuresList}>
            <div className={classes.featureItem}>
              <div className={classes.featureIconContainer}>
                <ForumIcon />
              </div>
              <div>
                <Typography className={classes.featureTitle}>Atendimentos centralizados</Typography>
                <Typography className={classes.featureDesc}>Todas as conversas do WhatsApp em um só lugar.</Typography>
              </div>
            </div>
            
            <div className={classes.featureItem}>
              <div className={classes.featureIconContainer}>
                <PeopleIcon />
              </div>
              <div>
                <Typography className={classes.featureTitle}>Mais produtividade</Typography>
                <Typography className={classes.featureDesc}>Automatize processos e ganhe tempo.</Typography>
              </div>
            </div>
            
            <div className={classes.featureItem}>
              <div className={classes.featureIconContainer}>
                <AssessmentIcon />
              </div>
              <div>
                <Typography className={classes.featureTitle}>Resultados que importam</Typography>
                <Typography className={classes.featureDesc}>Relatórios e métricas para decisões inteligentes.</Typography>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PAINEL DIREITO (FORMULÁRIO - FUNDO ESCURO COM CHARME) */}
      <div className={classes.rightPanel}>
        {/* Efeitos de Fundo (Orbs Luminosas / Círculos de Charme) */}
        <div className={classes.bgOrb1}></div>
        <div className={classes.bgOrb2}></div>

        <div className={classes.loginCard}>
          <Typography variant="h2" className={classes.cardTitle}>
            Bem-vindo de volta!
          </Typography>
          <Typography className={classes.cardSubtitle}>
            Acesse sua conta para continuar
          </Typography>

          <form style={{ width: "100%" }} noValidate onSubmit={handlSubmit}>
            <Typography className={classes.inputLabel}>E-mail</Typography>
            <TextField
              variant="outlined"
              margin="none"
              required
              fullWidth
              id="email"
              placeholder="eduardo@almeida.com"
              name="email"
              value={user.email}
              onChange={handleChangeInput}
              autoComplete="email"
              autoFocus
              className={classes.textField}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon style={{ color: "#94a3b8" }} />
                  </InputAdornment>
                ),
              }}
            />

            <Typography className={classes.inputLabel}>Senha</Typography>
            <TextField
              variant="outlined"
              margin="none"
              required
              fullWidth
              name="password"
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              id="password"
              value={user.password}
              onChange={handleChangeInput}
              autoComplete="current-password"
              className={classes.textField}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon style={{ color: "#94a3b8" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      style={{ padding: "8px", color: "#94a3b8" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Link component={RouterLink} to="/forgetpsw" className={classes.forgotLink}>
              Esqueceu sua senha?
            </Link>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submitBtn}
            >
              Entrar
            </Button>

            <div className={classes.divider}>ou</div>

            <Button
              variant="outlined"
              className={classes.googleBtn}
              onClick={() => toast.info("Login com Google não configurado.")}
              startIcon={<GoogleIcon />}
            >
              Entrar com Google
            </Button>

            <div className={classes.signupPrompt}>
              Ainda não tem uma conta? <Link component={RouterLink} to="/signup">Registre-se</Link>
            </div>
          </form>
        </div>

        {/* NOTA DE SEGURANÇA */}
        <div className={classes.securityFooter}>
          <SecurityIcon style={{ fontSize: "16px", color: "#20B462" }} />
          <span>Seus dados estão protegidos com segurança.</span>
        </div>

        {/* COPYRIGHT */}
        <div className={classes.copyrightFooter}>
          Copyright <span style={{ color: "#20B462", fontWeight: "600" }}>PLW Design</span> • v {versionSystem} 2026.
        </div>
      </div>
    </div>
  );
};

export default Login;
