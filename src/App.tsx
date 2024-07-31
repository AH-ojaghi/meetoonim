import Header from "./Components/Header/Header";
import { useRoutes } from "react-router-dom";
import routes from "./Utils/routes";
import { Provider } from "react-redux";
import store from "./Redux/Store";
export default function App() {
  const route = useRoutes(routes);
  return (
    <>
      <Header />

      <Provider store={store}>{route}</Provider>
    </>
  );
}
