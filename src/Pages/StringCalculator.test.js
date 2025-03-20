import { render, screen, fireEvent } from "@testing-library/react";
import StringCalculator from "./StringCalculator";
import "@testing-library/jest-dom";

describe("StringCalculator Component", () => {
  
  // test("renders input field and ADD button", () => {
  //   render(<StringCalculator />);
    
  //   // Check for input field 
  //   const inputElement = screen.getByRole("textbox");
  //   expect(inputElement).toBeInTheDocument();

  //   // Check for the button 
  //   const buttonElement = screen.getByText(/ADD/i);
  //   expect(buttonElement).toBeInTheDocument();
  // });

  test('adds valid comma-separated numbers correctly', () => {
    const { container } = render(<StringCalculator />);
    const input = container.querySelector('.calculator-input');
    const addButton = screen.getByText(/ADD/);
  
    fireEvent.change(input, { target: { value: "1,2,3" } });
    fireEvent.click(addButton);
  
    expect(screen.getByText(/Result: 6/)).toBeInTheDocument();
  });

  test('adds numbers with a custom delimiter correctly', () => {
    const { container } = render(<StringCalculator />);
    const input = container.querySelector('.calculator-input');
    const addButton = screen.getByText(/ADD/);
  
    fireEvent.change(input, { target: { value: "//;\n1;2;3" } });
    fireEvent.click(addButton);
  
    expect(screen.getByText(/Result: 6/)).toBeInTheDocument();
  });

});