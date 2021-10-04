import { Redirect, Route, Switch } from "react-router-dom"
import { Dashboards, EmptyPage, Home, LogInField, People, Projects, Settings, SignUpField } from "../layouts"
import { ROUTES } from "./constants"

const useRoutes = () => {

   return (
      <Switch>
         <Route exact path={ROUTES.home} component={Home} />
         <Route path={ROUTES.projects} component={Projects} />
         <Route path={ROUTES.dashboard} component={Dashboards} />
         <Route path={ROUTES.people} component={People} />
         <Route path={ROUTES.backlog} component={EmptyPage} />
         <Route path={ROUTES.reports} component={EmptyPage} />
         <Route path={ROUTES.components} component={EmptyPage} />
         <Route path={ROUTES.releases} component={EmptyPage} />
         <Route path={ROUTES.addItem} component={EmptyPage} />
         <Route path={ROUTES.settings} component={Settings} />
         <Route path={ROUTES.userAuthSignUp} component={SignUpField} />
         <Route path={ROUTES.userAauthLogIn} component={LogInField} />
         <Redirect to="/" />
      </Switch>
   )

}

export default useRoutes