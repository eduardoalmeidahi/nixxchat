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
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { toast } from "react-toastify";

import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import SecurityIcon from "@material-ui/icons/Security";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ForumIcon from "@material-ui/icons/Forum";
import AndroidIcon from "@material-ui/icons/Android";
import AssessmentIcon from "@material-ui/icons/Assessment";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import { versionSystem } from "../../../package.json";
import { i18n } from "../../translate/i18n";
import { nomeEmpresa } from "../../../package.json";
import { AuthContext } from "../../context/Auth/AuthContext";

import logo from "../../assets/logo.png";
import heroImg from "../../assets/bg-login-mockup.png";

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
    flex: 1.2,
    background: "radial-gradient(circle at 10% 20%, #132538 0%, #060e15 90%)",
    padding: theme.spacing(6),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
    overflow: "hidden",
    color: "#ffffff",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    // Adding subtle glow/blur spots
    "&::before": {
      content: '""',
      position: "absolute",
      top: "10%",
      right: "-10%",
      width: "500px",
      height: "500px",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(32, 180, 98, 0.15) 0%, rgba(32, 180, 98, 0) 70%)",
      filter: "blur(60px)",
      zIndex: 1,
    },
  },
  rightPanel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: theme.spacing(4),
  },
  logoHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    zIndex: 2,
  },
  logoImg: {
    height: "80px",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    borderRadius: "20px",
    backgroundColor: "rgba(32, 180, 98, 0.1)",
    border: "1px solid rgba(32, 180, 98, 0.2)",
    color: "#20B462",
    fontSize: "12px",
    fontWeight: "600",
    marginBottom: theme.spacing(3),
    width: "fit-content",
    zIndex: 2,
  },
  heroTitle: {
    fontSize: "40px",
    fontWeight: "800",
    lineHeight: "1.2",
    color: "#ffffff",
    marginBottom: theme.spacing(2),
    zIndex: 2,
    "& span": {
      color: "#20B462",
    },
  },
  heroDesc: {
    fontSize: "15px",
    color: "#a0aec0",
    lineHeight: "1.6",
    marginBottom: theme.spacing(4),
    maxWidth: "500px",
    zIndex: 2,
  },
  featuresList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    zIndex: 2,
  },
  featureItem: {
    display: "flex",
    gap: "16px",
    alignItems: "flex-start",
  },
  featureIconContainer: {
    padding: "10px",
    borderRadius: "10px",
    backgroundColor: "rgba(32, 180, 98, 0.1)",
    color: "#20B462",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  featureTitle: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: "4px",
  },
  featureDesc: {
    fontSize: "13px",
    color: "#a0aec0",
  },
  mockupContainer: {
    position: "absolute",
    right: "-80px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "580px",
    height: "580px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    [theme.breakpoints.down("md")]: {
      right: "-180px",
      width: "480px",
      height: "480px",
    },
  },
  mockupImg: {
    width: "100%",
    height: "auto",
    objectFit: "contain",
  },
  footerPartners: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    zIndex: 2,
  },
  partnersText: {
    fontSize: "12px",
    color: "#718096",
  },
  partnersLogos: {
    display: "flex",
    gap: "24px",
    alignItems: "center",
    flexWrap: "wrap",
    opacity: 0.6,
  },
  // Right side Card
  loginCard: {
    width: "100%",
    maxWidth: "460px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.04)",
    border: "1px solid rgba(0, 0, 0, 0.05)",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  cardLogoContainer: {
    marginBottom: theme.spacing(3),
    display: "flex",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#132538",
    marginBottom: "8px",
  },
  cardSubtitle: {
    fontSize: "14px",
    color: "#718096",
    marginBottom: theme.spacing(4),
  },
  inputLabel: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#4a5568",
    marginBottom: "6px",
    alignSelf: "flex-start",
    width: "100%",
    textAlign: "left",
  },
  textField: {
    marginBottom: theme.spacing(3),
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
    },
  },
  rowActions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: theme.spacing(3),
  },
  checkboxLabel: {
    fontSize: "13px",
    color: "#4a5568",
  },
  forgotLink: {
    fontSize: "13px",
    color: "#20B462",
    fontWeight: "600",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  submitBtn: {
    height: "48px",
    borderRadius: "10px",
    backgroundColor: "#20B462",
    color: "#ffffff",
    fontWeight: "600",
    fontSize: "15px",
    textTransform: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    "&:hover": {
      backgroundColor: "#199750",
    },
  },
  arrowCircle: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "8px",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    margin: "24px 0",
    color: "#a0aec0",
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
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    backgroundColor: "#ffffff",
    color: "#4a5568",
    fontSize: "14px",
    fontWeight: "600",
    textTransform: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: "#f7fafc",
    },
  },
  signupPrompt: {
    fontSize: "14px",
    color: "#718096",
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
    marginTop: "30px",
    color: "#a0aec0",
    fontSize: "11px",
    textAlign: "center",
    maxWidth: "350px",
    lineHeight: "1.4",
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
  const [rememberMe, setRememberMe] = useState(true);

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
      
      {/* PAINEL ESQUERDO (HERO) */}
      <div className={classes.leftPanel}>
        {/* LOGO SUPERIOR */}
        <div className={classes.logoHeader}>
          <img className={classes.logoImg} src={logo} alt="Nixx Chat" />
        </div>

        {/* CONTEÚDO CENTRAL */}
        <div style={{ zIndex: 2, position: "relative", marginTop: "40px" }}>
          <div className={classes.badge}>
            <CheckCircleIcon style={{ fontSize: "14px" }} />
            Plataforma WhatsApp CRM
          </div>
          
          <Typography variant="h1" className={classes.heroTitle}>
            Centralize seu<br />atendimento com<br /><span>inteligência.</span>
          </Typography>
          
          <Typography className={classes.heroDesc}>
            Organize conversas, automatize processos e aumente suas vendas com o poder do WhatsApp e da inteligência de dados.
          </Typography>

          <div className={classes.featuresList}>
            <div className={classes.featureItem}>
              <div className={classes.featureIconContainer}>
                <ForumIcon />
              </div>
              <div>
                <Typography className={classes.featureTitle}>Atendimento omnichannel</Typography>
                <Typography className={classes.featureDesc}>Converse com seus clientes em um só lugar.</Typography>
              </div>
            </div>
            
            <div className={classes.featureItem}>
              <div className={classes.featureIconContainer}>
                <AndroidIcon />
              </div>
              <div>
                <Typography className={classes.featureTitle}>Automação de conversas</Typography>
                <Typography className={classes.featureDesc}>Crie fluxos inteligentes e ganhe tempo no dia a dia.</Typography>
              </div>
            </div>
            
            <div className={classes.featureItem}>
              <div className={classes.featureIconContainer}>
                <AssessmentIcon />
              </div>
              <div>
                <Typography className={classes.featureTitle}>Métricas em tempo real</Typography>
                <Typography className={classes.featureDesc}>Acompanhe resultados e tome decisões com mais precisão.</Typography>
              </div>
            </div>
          </div>
        </div>

        {/* ILUSTRAÇÃO FLUTUANTE (MOCKUP) */}
        <div className={classes.mockupContainer}>
          <img className={classes.mockupImg} src={heroImg} alt="Dashboard Mockup" />
        </div>

      </div>

      {/* PAINEL DIREITO (FORMULÁRIO) */}
      <div className={classes.rightPanel}>
        <div className={classes.loginCard}>
          {/* LOGO CARD */}
          <div className={classes.cardLogoContainer}>
            <img src={logo} alt="Nixx Chat" style={{ height: "80px" }} />
          </div>

          <Typography variant="h2" className={classes.cardTitle}>
            Acesse sua conta
          </Typography>
          <Typography className={classes.cardSubtitle}>
            Entre para continuar gerenciando seus atendimentos.
          </Typography>

          <form style={{ width: "100%" }} noValidate onSubmit={handlSubmit}>
            <Typography className={classes.inputLabel}>E-mail</Typography>
            <TextField
              variant="outlined"
              margin="none"
              required
              fullWidth
              id="email"
              placeholder="eduardoalmeida.hi@gmail.com"
              name="email"
              value={user.email}
              onChange={handleChangeInput}
              autoComplete="email"
              autoFocus
              className={classes.textField}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon style={{ color: "#a0aec0" }} />
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
              placeholder="••••••••••••"
              type={showPassword ? "text" : "password"}
              id="password"
              value={user.password}
              onChange={handleChangeInput}
              autoComplete="current-password"
              className={classes.textField}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon style={{ color: "#a0aec0" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      style={{ fontSize: "13px", color: "#718096" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                      <span style={{ fontSize: "12px", marginLeft: "4px", fontWeight: "600" }}>
                        {showPassword ? "Ocultar" : "Mostrar"}
                      </span>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <div className={classes.rowActions}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    color="primary"
                    style={{ color: "#20B462" }}
                  />
                }
                label={<span className={classes.checkboxLabel}>Lembrar-me</span>}
              />
              <Link component={RouterLink} to="/forgetpsw" className={classes.forgotLink}>
                Esqueceu sua senha?
              </Link>
            </div>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submitBtn}
            >
              Entrar
              <div className={classes.arrowCircle}>
                <ArrowForwardIcon style={{ fontSize: "14px", color: "#ffffff" }} />
              </div>
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
              Ainda não tem uma conta? <Link component={RouterLink} to="/signup">Criar conta</Link>
            </div>
          </form>
        </div>

        <div className={classes.securityFooter}>
          <SecurityIcon style={{ fontSize: "14px", color: "#20B462" }} />
          <span>
            Seus dados protegidos com segurança.<br />
            Criptografia de ponta a ponta e conformidade com a LGPD.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
