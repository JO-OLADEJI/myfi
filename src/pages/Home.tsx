import { Link } from "react-router-dom";
import useAppStore from "@/contexts/state";

export const Home = (): JSX.Element => {
  const did = useAppStore((state) => state.did);

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
