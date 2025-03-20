import '../App.css'
import { useState } from 'react'
function StringCalculator() {
	const [inputData, setInputData] = useState("")
	const [result, setResult] = useState(null);
	const [error, setError] = useState("");

	const add = (numbers) => {
		if (!numbers) throw new Error(`Invalid Input`);
		let delimiter = /,|\n/;
		if (numbers.startsWith("//")) {
			if (numbers.includes("\\n")) {
				numbers = numbers.replace(/\\n/g, "\n");
			}

			const parts = numbers.split("\n");
			delimiter = parts[0].slice(2);
			numbers = parts.slice(1).join("\n");
		}

		const numArray = numbers.split(delimiter)
			.map(n => {
				if (!n)throw new Error(`Invalid Input`);
				const num = Number(n)
				if (isNaN(num)) {
					throw new Error(`Invalid Input: ${n}`);  // Throw error if not a valid number
				}
				return num;
			})
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
			<div className="calculator-header">String Calculator</div>
			<div className='calculator-body'>
			<label>Enter Numbers</label> <br />
			<label>(Format: <b style={{ color: '#41ad14'}}>//[delimiter]\n[numbers]</b> or <b style={{ color: '#41ad14'}}>[numbers]</b> )</label> <br />
			<textarea
				className='calculator-input'
				value={inputData}
				placeholder='Eg:  //;\n1;2  or 1,2,3'
				onChange={(e) => setInputData(e.target.value)}
			/>
			<button className="add-button" onClick={handleAddition}>
				ADD
			</button>
			{error ? (
				<p style={{ color: "red" }}>{error}</p>
			) : result !== null ? (
				<p>Result: {result}</p>
			) : null}
			</div>
			
		</div>
	);
}

export default StringCalculator;