import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import DashboardPage from "./pages/DashboardPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import PoolPage from "./pages/PoolPage";
import NewPoolPage from "./pages/NewPoolPage";
import LoginPage from "./pages/LoginPage";
import LogInProtection from "./components/LogInProtection";
import ErrorPage from "./pages/NotFoundPage";

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  });
  return (
    <Fragment>
      <Navigation />
      <Routes>
        <Route
          path="/"
          exact
          element={
            <LogInProtection>
              <DashboardPage />
            </LogInProtection>
          }
        />
        <Route path="/login" exact element={<LoginPage />} />
        <Route
          path="/leaderboard"
          element={
            <LogInProtection>
              <LeaderboardPage />
            </LogInProtection>
          }
        />
        <Route
          path="/question/:id"
          element={
            <LogInProtection>
              <PoolPage />
            </LogInProtection>
          }
        />
        <Route
          path="/add"
          element={
            <LogInProtection>
              <NewPoolPage />
            </LogInProtection>
          }
        />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </Fragment>
  );

  //  return <div>{props.loading === true ? null : <DashboardPage />}</div>;
};
const mapStateToProps = ({ users }) => ({
  loading: users === null,
});

export default connect(mapStateToProps)(App);
