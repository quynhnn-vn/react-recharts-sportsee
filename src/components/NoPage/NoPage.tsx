import { NavLink } from "react-router-dom";

const NoPage = () => {
  return (
    <main>
      <h3>404</h3>
      <p>Oups! La page que vous demandez n'existe pas.</p>
      <br />
      <NavLink to="/user/12">Afficher la page de Karl</NavLink>
      <br />
      <br />
      <NavLink to="/user/18">Afficher la page de Cecilia</NavLink>
    </main>
  );
};

export default NoPage;
