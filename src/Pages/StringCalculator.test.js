import { render, screen, fireEvent } from "@testing-library/react";
import StringCalculator from "./StringCalculator";
import "@testing-library/jest-dom";

describe("StringCalculator Component", () => {
  
  test("renders input field and ADD button", () => {
    render(<StringCalculator />);
    
    // Check for input field 
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();

    // Check for the button 
    const buttonElement = screen.getByText(/ADD/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test("updates input field value", () => {
    render(<StringCalculator />);
    
    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "1,2,3" } });

    expect(inputElement.value).toBe("1,2,3");
  });

  test("handles empty input without error", () => {
    render(<StringCalculator />);
    
    const inputElement = screen.getByRole("textbox");
    const buttonElement = screen.getByText(/ADD/i);

    fireEvent.change(inputElement, { target: { value: "" } });
    fireEvent.click(buttonElement);

    expect(screen.getByText(/Result: 0/i)).toBeInTheDocument();
  });

});