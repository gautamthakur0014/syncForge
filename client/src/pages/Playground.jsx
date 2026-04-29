import { useState } from "react";
import MonacoEditor from "../components/editor/MonacoEditor";
import axios from "axios";
import Console from "../components/Console";

const Playground = () => {
  const [code, setCode] = useState("//start coding from here");
  const [output, setOutput] =useState(null);
  const fetchData = async () => {
    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:5000/api/v1/execute",
        data: {
          language: "javascript",
          code,
        },
      });
      setOutput(res.data);
    } catch (err) {
      console.log(err);
      setOutput(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="p-1 m-0 h-screen">
      <MonacoEditor code={code} setCode={setCode} />
      {/* <button className="bg-black text-2xl text-red-700" onClick={fetchData}>
        run
      </button> */}
      <Console output={output}/>
    </div>
  );
};

export default Playground;
