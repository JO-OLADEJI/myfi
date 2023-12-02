import { useContext } from "react";
import { Web5Context } from "./contexts/web5";
import { Link } from "react-router-dom";

const Home = (): JSX.Element => {
  const { did } = useContext(Web5Context);

  return (
    <div>
      <h1>MyFi</h1>
      <h3>DevCareers X TBD web5 Hackerton Sphinx Group Project</h3>

      <br />

      <p>
        <b>Connected DID:</b>{" "}
        {did === "" ? "loading . . ." : `${did.substring(0, 20)}. . .`}
        <button
          onClick={async (e) => {
            e.preventDefault();
            await navigator.clipboard.writeText(did);
            alert("DID copied to clipboard.");
          }}
        >
          copy
        </button>
      </p>
      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
};

export default Home;
