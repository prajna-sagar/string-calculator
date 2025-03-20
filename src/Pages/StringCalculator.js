import '../App.css'
import { useState } from 'react'
function StringCalculator() {
    const [inputData, setInputData] = useState("")
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const handleAddition = () => {
        try {
            // Extract delimiter and numbers
            let numbers = inputData.split(/[,\n]/).map(Number);
            
            if (numbers.some(isNaN)) {
                setError("Invalid input! Please enter valid numbers.");
                setResult(null);
            } else {
                setError("");
                setResult(0);
            }
        } catch (err) {
            setError("Error in logic")
        }
    };
    
    return (
        <div className="calculator-section">
        <label>Enter Numbers:</label> <br />
        <label>(Format: <b>//[delimiter]\n[numbers]</b>)</label> <br />
        <input
            style={{ width: "50%" }}
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
        />
        <label>{inputData}</label><br />
        <button className="add-button" onClick={handleAddition}>
            ADD
        </button>
        <br />
        {error ? (
            <p style={{ color: "red" }}>{error}</p>
        ) : result !== null ? (
            <p>Result: {result}</p>
        ) : null}
    </div>
);
}

export default StringCalculator;