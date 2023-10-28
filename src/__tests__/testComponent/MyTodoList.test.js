import { render, screen, fireEvent } from "@testing-library/react";
import MyTodoList from "../../components/MyTodoList";

describe("MyTodoList Component", () => {
  it("renders the Select component with the correct options", () => {
    render(<MyTodoList />);

    const selectElement = screen.getByLabelText("Filter By");

    fireEvent.change(selectElement, { target: { value: "Completed" } });

    expect(selectElement.value).toBe("Completed");
  });
});
