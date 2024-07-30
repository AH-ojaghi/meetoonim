import Header from "./Components/Header/Header";
import { useRoutes } from "react-router-dom";
import routes from "./Utils/routes";
export default function App() {
  const route = useRoutes(routes);
  return (
    <>
      <Header />
      {route}
 
    </>
  );
}
