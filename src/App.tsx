import Header from "./components/Header/Header";
import { useRoutes } from "react-router-dom";
import routes from "./utils/routes";
import { Provider } from "react-redux";
import store from "./redux/Store";
export default function App() {
  const route = useRoutes(routes);
  return (
    <>
      <Header />

      <Provider store={store}>{route}</Provider>
    </>
  );
}
