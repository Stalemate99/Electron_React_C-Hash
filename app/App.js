import React, { useEffect, useState } from 'react';

export default function App() {

    const [val, setVal] = useState(0);

    useEffect(()=>{
        Electron.receive("update", newVal => {
            setVal(newVal);
            console.log("Updated Counter");
        })
    });

    const handleAdd = () => {
        Electron.send("add", document.getElementById('cnt').value);
    };

    return (
        <div>
            <p>
                Counter : <input type="text" id="cnt" value={val} />
            </p>
            <button onClick={handleAdd} > ADD </button>
        </div>
    );
}