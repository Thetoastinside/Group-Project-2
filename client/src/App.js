import './App.css';
import { useState } from "react";
function App() {

  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')



  return (
  <div className="App">
    <div className='AddPassword'>
      <input
       type="text"
       placeholder="Password" 
       onChange={(event) => {
        setPassword(event.target.value);
       }}
      />
      <input 
      type="text" 
      placeholder="Site" 
      onChange={(event) => {
        setTitle(event.target.value);
       }}
      />
      <button> Add Password</button>
    </div>
  </div>
  );
}

export default App;
