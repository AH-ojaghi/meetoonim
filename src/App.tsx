import Header from "./components/Header/Header";
import { Provider } from "react-redux";
import {Routes} from "react-router-dom";
import store from "./Redux/store";
import { indexRoutes } from "./utils/routing/routes";
//
export default function App() {
  return (
    <>
      <Header />

      <Provider store={store}>
        {/* {route} */}
<Routes>
  {indexRoutes()}
</Routes>
      </Provider>
    </>
  );
}
