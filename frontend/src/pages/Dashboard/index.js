import React, { useContext, useState, useEffect } from "react";

import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import MobileFriendlyIcon from '@material-ui/icons/MobileFriendly';
import StoreIcon from '@material-ui/icons/Store';
import SpeedIcon from "@material-ui/icons/Speed";
import GroupIcon from "@material-ui/icons/Group";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PersonIcon from "@material-ui/icons/Person";
import CallIcon from "@material-ui/icons/Call";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ForumIcon from "@material-ui/icons/Forum";
import FilterListIcon from "@material-ui/icons/FilterList";
import ClearIcon from "@material-ui/icons/Clear";
import SendIcon from '@material-ui/icons/Send';
import MessageIcon from '@material-ui/icons/Message';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import TimerIcon from '@material-ui/icons/Timer';

import { makeStyles } from "@material-ui/core/styles";
import { grey, blue } from "@material-ui/core/colors";
import { toast } from "react-toastify";

import Chart from "./Chart";
import ButtonWithSpinner from "../../components/ButtonWithSpinner";

import CardCounter from "../../components/Dashboard/CardCounter";
import TableAttendantsStatus from "../../components/Dashboard/TableAttendantsStatus";
import { isArray } from "lodash";

import { AuthContext } from "../../context/Auth/AuthContext";

import useDashboard from "../../hooks/useDashboard";
import useTickets from "../../hooks/useTickets";
import useUsers from "../../hooks/useUsers";
import useContacts from "../../hooks/useContacts";
import useMessages from "../../hooks/useMessages";
import { ChatsUser } from "./ChartsUser"

import Filters from "./Filters";
import { isEmpty } from "lodash";
import moment from "moment";
import { ChartsDate } from "./ChartsDate";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  fixedHeightPaper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: 240,
  },
  fixedHeightPaper2: {
    padding: theme.spacing(3),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    borderRadius: "12px",
    boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.05)",
    border: `1px solid ${theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"}`,
    backgroundColor: theme.palette.background.paper,
  },
  filterPaper: {
    padding: theme.spacing(3),
    display: "flex",
    alignItems: "center",
    borderRadius: "12px",
    boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.05)",
    border: `1px solid ${theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"}`,
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(4),
  },
  card: {
    padding: theme.spacing(2.5),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    borderRadius: "12px",
    boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.05)",
    border: `1px solid ${theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"}`,
    backgroundColor: theme.palette.background.paper,
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 8px 24px 0 rgba(0, 0, 0, 0.1)",
    },
  },
  iconContainer: {
    borderRadius: "50%",
    padding: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "56px",
    height: "56px",
  },
  cardTitle: {
    fontSize: "13px",
    fontWeight: "600",
    color: theme.palette.text.secondary,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: theme.spacing(1),
  },
  cardVal: {
    fontSize: "28px",
    fontWeight: "700",
    color: theme.palette.text.primary,
  },
  card0: {
    borderLeft: "5px solid #15aabf",
  },
  card00: {
    borderLeft: "5px solid #ae3ec9",
  },
  card1: {
    borderLeft: "5px solid #20B462",
  },
  card2: {
    borderLeft: "5px solid #ff922b",
  },
  card3: {
    borderLeft: "5px solid #f03e3e",
  },
  card4: {
    borderLeft: "5px solid #fab005",
  },
  card8: {
    borderLeft: "5px solid #1c7ed6",
  },
  card9: {
    borderLeft: "5px solid #e64980",
  },
  alignRight: {
    textAlign: "right",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  fullWidth: {
    width: "100%",
  },
  selectContainer: {
    width: "100%",
    textAlign: "left",
  },

}));

const Dashboard = () => {
  const classes = useStyles();
  const [counters, setCounters] = useState({});
  const [attendants, setAttendants] = useState([]);
  const [period, setPeriod] = useState(0);
  const [filterType, setFilterType] = useState(1);
  const [dateFrom, setDateFrom] = useState(moment("1", "D").format("YYYY-MM-DD"));
  const [dateTo, setDateTo] = useState(moment().format("YYYY-MM-DD"));
  const [loading, setLoading] = useState(false);
  const { find } = useDashboard();

  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let now = `${year}-${month < 10 ? `0${month}` : `${month}`}-${date < 10 ? `0${date}` : `${date}`}`;

  const [showFilter, setShowFilter] = useState(false);
  const [queueTicket, setQueueTicket] = useState(false);

  const { user } = useContext(AuthContext);
  var userQueueIds = [];

  if (user.queues && user.queues.length > 0) {
    userQueueIds = user.queues.map((q) => q.id);
  }

  useEffect(() => {
    async function firstLoad() {
      await fetchData();
    }
    setTimeout(() => {
      firstLoad();
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
    async function handleChangePeriod(value) {
    setPeriod(value);
  }

  async function handleChangeFilterType(value) {
    setFilterType(value);
    if (value === 1) {
      setPeriod(0);
    } else {
      setDateFrom("");
      setDateTo("");
    }
  }

  async function fetchData() {
    setLoading(true);

    let params = {};

    if (period > 0) {
      params = {
        days: period,
      };
    }

    if (!isEmpty(dateFrom) && moment(dateFrom).isValid()) {
      params = {
        ...params,
        date_from: moment(dateFrom).format("YYYY-MM-DD"),
      };
    }

    if (!isEmpty(dateTo) && moment(dateTo).isValid()) {
      params = {
        ...params,
        date_to: moment(dateTo).format("YYYY-MM-DD"),
      };
    }

    if (Object.keys(params).length === 0) {
      toast.error("Parametrize o filtro");
      setLoading(false);
      return;
    }

    const data = await find(params);

    setCounters(data.counters);
    if (isArray(data.attendants)) {
      setAttendants(data.attendants);
    } else {
      setAttendants([]);
    }

    setLoading(false);
  }

  function formatTime(minutes) {
    return moment()
      .startOf("day")
      .add(minutes, "minutes")
      .format("HH[h] mm[m]");
  }

  const GetUsers = () => {
    let count;
    let userOnline = 0;
    attendants.forEach(user => {
      if (user.online === true) {
        userOnline = userOnline + 1
      }
    })
    count = userOnline === 0 ? 0 : userOnline;
    return count;
  };
  
    const GetContacts = (all) => {
    let props = {};
    if (all) {
      props = {};
    }
    const { count } = useContacts(props);
    return count;
  };
  
    function renderFilters() {
    if (filterType === 1) {
      return (
        <>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Data Inicial"
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className={classes.fullWidth}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Data Final"
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className={classes.fullWidth}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </>
      );
    } else {
      return (
        <Grid item xs={12} sm={6} md={4}>
          <FormControl className={classes.selectContainer}>
            <InputLabel id="period-selector-label">Período</InputLabel>
            <Select
              labelId="period-selector-label"
              id="period-selector"
              value={period}
              onChange={(e) => handleChangePeriod(e.target.value)}
            >
              <MenuItem value={0}>Nenhum selecionado</MenuItem>
              <MenuItem value={3}>Últimos 3 dias</MenuItem>
              <MenuItem value={7}>Últimos 7 dias</MenuItem>
              <MenuItem value={15}>Últimos 15 dias</MenuItem>
              <MenuItem value={30}>Últimos 30 dias</MenuItem>
              <MenuItem value={60}>Últimos 60 dias</MenuItem>
              <MenuItem value={90}>Últimos 90 dias</MenuItem>
            </Select>
            <FormHelperText>Selecione o período desejado</FormHelperText>
          </FormControl>
        </Grid>
      );
    }
  }

  return (
    <div>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>

          {/* FILTROS CARD UNIFICADO */}
          <Grid item xs={12}>
            <Paper className={classes.filterPaper} elevation={0}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl className={classes.selectContainer}>
                    <InputLabel id="filter-type-label">Tipo de Filtro</InputLabel>
                    <Select
                      labelId="filter-type-label"
                      value={filterType}
                      onChange={(e) => handleChangeFilterType(e.target.value)}
                    >
                      <MenuItem value={1}>Filtro por Data</MenuItem>
                      <MenuItem value={2}>Filtro por Período</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {filterType === 1 ? (
                  <>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        label="Data Inicial"
                        type="date"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                        className={classes.fullWidth}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        label="Data Final"
                        type="date"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                        className={classes.fullWidth}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                  </>
                ) : (
                  <Grid item xs={12} sm={6} md={6}>
                    <FormControl className={classes.selectContainer}>
                      <InputLabel id="period-selector-label">Período</InputLabel>
                      <Select
                        labelId="period-selector-label"
                        id="period-selector"
                        value={period}
                        onChange={(e) => handleChangePeriod(e.target.value)}
                      >
                        <MenuItem value={0}>Nenhum selecionado</MenuItem>
                        <MenuItem value={3}>Últimos 3 dias</MenuItem>
                        <MenuItem value={7}>Últimos 7 dias</MenuItem>
                        <MenuItem value={15}>Últimos 15 dias</MenuItem>
                        <MenuItem value={30}>Últimos 30 dias</MenuItem>
                        <MenuItem value={60}>Últimos 60 dias</MenuItem>
                        <MenuItem value={90}>Últimos 90 dias</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                )}

                <Grid item xs={12} sm={12} md={3} className={classes.alignRight}>
                  <ButtonWithSpinner
                    loading={loading}
                    onClick={() => fetchData()}
                    variant="contained"
                    color="primary"
                    style={{ height: "40px", width: "100%", maxWidth: "200px" }}
                  >
                    Filtrar
                  </ButtonWithSpinner>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* CONEXÕES */}
          {user.super && (
            <Grid item xs={12} sm={6} md={4}>
              <Paper className={`${classes.card} ${classes.card0}`} elevation={0}>
                <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <Typography className={classes.cardTitle}>
                      Conexões Ativas
                    </Typography>
                    <Typography className={classes.cardVal}>
                      {counters.totalWhatsappSessions}
                    </Typography>
                  </div>
                  <div className={classes.iconContainer} style={{ backgroundColor: "rgba(21, 170, 191, 0.1)" }}>
                    <MobileFriendlyIcon style={{ fontSize: "28px", color: "#15aabf" }} />
                  </div>
                </div>
              </Paper>
            </Grid>
          )}

          {/* EMPRESAS */}
          {user.super && (
            <Grid item xs={12} sm={6} md={4}>
              <Paper className={`${classes.card} ${classes.card00}`} elevation={0}>
                <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <Typography className={classes.cardTitle}>
                      Empresas
                    </Typography>
                    <Typography className={classes.cardVal}>
                      {counters.totalCompanies}
                    </Typography>
                  </div>
                  <div className={classes.iconContainer} style={{ backgroundColor: "rgba(174, 62, 201, 0.1)" }}>
                    <StoreIcon style={{ fontSize: "28px", color: "#ae3ec9" }} />
                  </div>
                </div>
              </Paper>
            </Grid>
          )}

          {/* EM CONVERSA */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper className={`${classes.card} ${classes.card1}`} elevation={0}>
              <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <Typography className={classes.cardTitle}>
                    Em Conversa
                  </Typography>
                  <Typography className={classes.cardVal}>
                    {counters.supportHappening}
                  </Typography>
                </div>
                <div className={classes.iconContainer} style={{ backgroundColor: "rgba(32, 180, 98, 0.1)" }}>
                  <CallIcon style={{ fontSize: "28px", color: "#20B462" }} />
                </div>
              </div>
            </Paper>
          </Grid>

          {/* AGUARDANDO */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper className={`${classes.card} ${classes.card2}`} elevation={0}>
              <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <Typography className={classes.cardTitle}>
                    Aguardando
                  </Typography>
                  <Typography className={classes.cardVal}>
                    {counters.supportPending}
                  </Typography>
                </div>
                <div className={classes.iconContainer} style={{ backgroundColor: "rgba(255, 146, 43, 0.1)" }}>
                  <HourglassEmptyIcon style={{ fontSize: "28px", color: "#ff922b" }} />
                </div>
              </div>
            </Paper>
          </Grid>

          {/* FINALIZADOS */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper className={`${classes.card} ${classes.card3}`} elevation={0}>
              <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <Typography className={classes.cardTitle}>
                    Finalizados
                  </Typography>
                  <Typography className={classes.cardVal}>
                    {counters.supportFinished}
                  </Typography>
                </div>
                <div className={classes.iconContainer} style={{ backgroundColor: "rgba(240, 62, 62, 0.1)" }}>
                  <CheckCircleIcon style={{ fontSize: "28px", color: "#f03e3e" }} />
                </div>
              </div>
            </Paper>
          </Grid>

          {/* NOVOS CONTATOS */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper className={`${classes.card} ${classes.card4}`} elevation={0}>
              <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <Typography className={classes.cardTitle}>
                    Novos Contatos
                  </Typography>
                  <Typography className={classes.cardVal}>
                    {GetContacts(true)}
                  </Typography>
                </div>
                <div className={classes.iconContainer} style={{ backgroundColor: "rgba(250, 176, 5, 0.1)" }}>
                  <GroupAddIcon style={{ fontSize: "28px", color: "#fab005" }} />
                </div>
              </div>
            </Paper>
          </Grid>

          {/* T.M. DE ATENDIMENTO */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper className={`${classes.card} ${classes.card8}`} elevation={0}>
              <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <Typography className={classes.cardTitle}>
                    T.M. de Conversa
                  </Typography>
                  <Typography className={classes.cardVal}>
                    {formatTime(counters.avgSupportTime)}
                  </Typography>
                </div>
                <div className={classes.iconContainer} style={{ backgroundColor: "rgba(28, 126, 214, 0.1)" }}>
                  <AccessAlarmIcon style={{ fontSize: "28px", color: "#1c7ed6" }} />
                </div>
              </div>
            </Paper>
          </Grid>

          {/* T.M. DE ESPERA */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper className={`${classes.card} ${classes.card9}`} elevation={0}>
              <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <Typography className={classes.cardTitle}>
                    T.M. de Espera
                  </Typography>
                  <Typography className={classes.cardVal}>
                    {formatTime(counters.avgWaitTime)}
                  </Typography>
                </div>
                <div className={classes.iconContainer} style={{ backgroundColor: "rgba(230, 73, 128, 0.1)" }}>
                  <TimerIcon style={{ fontSize: "28px", color: "#e64980" }} />
                </div>
              </div>
            </Paper>
          </Grid>
		 

          {/* USUARIOS ONLINE */}
          <Grid item xs={12}>
            {attendants.length ? (
              <TableAttendantsStatus
                attendants={attendants}
                loading={loading}
              />
            ) : null}
          </Grid>

          {/* TOTAL DE ATENDIMENTOS POR USUARIO */}
          <Grid item xs={12}>
            <Paper className={classes.fixedHeightPaper2}>
              <ChatsUser />
            </Paper>
          </Grid>

          {/* TOTAL DE ATENDIMENTOS */}
          <Grid item xs={12}>
            <Paper className={classes.fixedHeightPaper2}>
              <ChartsDate />
            </Paper>
          </Grid>

        </Grid>
      </Container >
    </div >
  );
};

export default Dashboard;
