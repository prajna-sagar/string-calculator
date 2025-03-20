import '../App.css'
import { useState } from 'react'
function StringCalculator() {
	const [inputData, setInputData] = useState("")
	const [result, setResult] = useState(null);
	const [error, setError] = useState("");

	const add = (numbers) => {
		if (!numbers) return 0;
		console.log('numbers ', numbers)
		let delimiter = /,|\n/;
		if (numbers.startsWith("//")) {
			console.log('yess', numbers.includes("\\n"))
			if (numbers.includes("\\n")) {
				numbers = numbers.replace(/\\n/g, "\n");
			}

			const parts = numbers.split("\n");
			delimiter = parts[0].slice(2);
			numbers = parts.slice(1).join("\n");
		}

		const numArray = numbers.split(delimiter)
			.map(n => {
				const num = Number(n)
				if (isNaN(num)) {
					throw new Error(`Invalid Input: ${n}`);  // Throw error if not a valid number
				}
				return num;
			})
		console.log('numArray ', numArray)
		const negatives = numArray.filter(n => n < 0);
		if (negatives.length) {
			throw new Error(`Negative numbers not allowed: ${negatives.join(", ")}`);
		}

		return numArray.reduce((sum, num) => sum + num, 0);
	};

	const handleAddition = () => {
		try {
			setError("");
			setResult(add(inputData));
		} catch (e) {
			setError(e.message);
			setResult(null);
		}
	};

	return (
		<div className="calculator-section">
			<label>Enter Numbers:</label> <br />
			<label>(Format: <b>//[delimiter]\n[numbers]</b>)</label> <br />
			<textarea
				className='calculator-input'
				value={inputData}
				onChange={(e) => setInputData(e.target.value)}
			/>
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