import Header from "./components/Header/Header";
import { Provider } from "react-redux";
import {Routes, useLocation} from "react-router-dom";
import store from "./Redux/store";
import { indexRoutes, modalRoutes } from "./utils/routing/routes";
//
export default function App() {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;

  return (
    <>
      <Header />

      <Provider store={store}>
        {/* {route} */}
<Routes location={previousLocation  || location}>
  {indexRoutes()}
</Routes>
{
  previousLocation && (

<Routes>
  {modalRoutes()}
</Routes>
  )
}
      </Provider>
    </>
  );
}
