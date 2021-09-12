import "./App.css";
import { BrowserRouter, Switch } from "react-router-dom";
import Signin from "./views/SignIn";
import Dashboard from "./views/Dashboard";
import AddUser from "./views/AddUser";
import EditUser from "./views/EditUser";
import { AuthRoute, PrivateRoute } from "./HOCs/Route";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthRoute
          exact
          path="/"
          component={Signin}
          redirectPath="/dashboard"
        />
        <PrivateRoute path="/addUser" component={AddUser} />
        <PrivateRoute path="/editUser/:username" component={EditUser} />
        <PrivateRoute
          path="/dashboard"
          component={Dashboard}
          redirectPath="/"
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
