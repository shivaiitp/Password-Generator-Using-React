import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copyButton, setCopyButton] = useState("Copy");
  const [buttonClass, setButtonClass] = useState("bg-blue-700");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "1234567809";
    if (charAllowed) str += "`~!@#$%^&*()-_+=}{[]|\\.,?/<>";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    setCopyButton("Copied");
    setButtonClass("bg-green-700");
    window.navigator.clipboard.writeText(password);
    setTimeout(() => {
      setCopyButton("Copy");
      setButtonClass("bg-blue-700");
    }, 2000); // Reset the button text and class after 2 seconds
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
          type="text" 
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='password'
          readOnly
          ref={passwordRef}
        />
        <button 
          className={`outline-none text-white px-3 py-0.5 shrink-0 ${buttonClass}`}
          onClick={copyPasswordToClipboard}>
          {copyButton}
        </button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
            type="range"  
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length = {length}</label>
        </div>
        <div className='flex text-sm gap-x-1'>
          <input 
            type="checkbox"
            checked={numberAllowed}
            id="numberInput"
            onChange={() => setNumberAllowed(prev => !prev)}
          />
          <label htmlFor='numberInput'>Numbers</label>
        </div>
        <div className='flex text-sm gap-x-1'>
          <input 
            type="checkbox"
            checked={charAllowed}
            id="charInput"
            onChange={() => setCharAllowed(prev => !prev)}
          />
          <label htmlFor='charInput'>Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App
