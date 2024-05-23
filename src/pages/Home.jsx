import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <ul>
        <li>
          <Link to="/detail/1">Detail 1</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
