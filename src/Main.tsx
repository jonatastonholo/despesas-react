import React, { useEffect, useState } from "react";
import DashboardPage from "./pages/DashboardPage";
import { IUser } from "./domain/IUser";
import { LoginPage } from "./pages/LoginPage";
import { authContext } from "./security/authContext";
import { getSession } from "./services/securityService";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import { format } from "date-fns";

export default function Main() {
  const yearMonth = format(new Date(), "yyyy-MM");
  const [user, setUser] = useState<IUser | null | undefined>(null);

  useEffect(() => {
    (async () => {
      try {
        const usuarioSessao = await getSession();
        setUser(usuarioSessao);
      } catch (e) {
        onSignOut();
      }
    })();
  }, []);

  function onSignOut() {
    setUser(null);
  }

  if (user) {
    return (
      <authContext.Provider value={{ user, onSignOut }}>
        <HashRouter>
          <Switch>
            <Route path="/despesas/:yearMonth">
              <DashboardPage />
            </Route>
            <Redirect to={{ pathname: `/despesas/${yearMonth}` }} />
          </Switch>
        </HashRouter>
      </authContext.Provider>
    );
  }
  return <LoginPage onSignIn={setUser} />;
}
