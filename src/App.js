import { useCallback, useEffect, useState } from "react";

function App() {
  const [passLength, setPassLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [isCopy, setIsCopy] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "1234567890";
    if (charAllowed) str += "!@#$%^&*()_+-=[]{}|;:<>?";

    for (let i = 0; i < passLength; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [passLength, numAllowed, charAllowed, setPassword]);

  const handleCopy = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    setIsCopy(true);
    setTimeout(() => setIsCopy(false), 1000);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [passLength, numAllowed, charAllowed, passwordGenerator]);
  return (
    <div className="flex items-center justify-center w-full h-screen text-white bg-gray-900">
      <div className="p-8 bg-gray-700 rounded-lg shadow-white shadow-3xl">
        <h1 className="mb-3 text-2xl text-center">Password Generator</h1>
        <div className="flex flex-row overflow-hidden rounded-lg md:w-96">
          <input
            type="text"
            className="w-[80%] p-2 outline-none text-blue-600"
            value={password}
            readOnly
          />
          <button
            className={`bg-blue-600 w-[20%] p-2 cursor-pointer ${
              isCopy && "bg-blue-400"
            }`}
            onClick={handleCopy}
          >
            {isCopy ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className="flex items-center mt-4">
          <input
            type="range"
            min={2}
            max={20}
            value={passLength}
            onChange={(e) => setPassLength(e.target.value)}
          />
          <label className="mx-4">Length : {passLength}</label>
        </div>
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            checked={numAllowed}
            onChange={() => setNumAllowed((prev) => !prev)}
            className="cursor-pointer"
          />
          <label className="mx-4">Include Number</label>
        </div>
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            checked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
            className="cursor-pointer"
          />
          <label className="mx-4">Include Special Character</label>
        </div>
      </div>
    </div>
  );
}

export default App;
