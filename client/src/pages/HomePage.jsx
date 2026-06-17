import { Link } from "react-router";

const HomePage = () => {
  return (
    <div>
      <p>this is home page</p>
      <div>
        <button className="bg-blue-500 h-12 w-28 m-4 rounded-xl">
          <Link to={"/Playground"}>Go to IDE</Link>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
