import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CarSelector from "../components/CarSelector";

vi.mock("../fixtures/manufacturers.json", () => ({
  default: [{ code: "M1", name: "BMW" }],
}));
vi.mock("../fixtures/models.json", () => ({
  default: [{ code: "MD1", name: "3 Series" }],
}));
vi.mock("../fixtures/types.json", () => ({
  default: [
    {
      code: "T1",
      name: "316 i",
      power: "115 KM / 85 KW",
      cubicCapacity: "1796 ccm",
    },
  ],
}));

describe("CarSelector Component (Vitest)", () => {
  beforeEach(() => {
    render(<CarSelector />);
  });

  it("renders dropdowns and buttons", () => {
    expect(screen.getByLabelText(/Manufacturer/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Vehicle Model/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Vehicle Type/i)).toBeInTheDocument();
    expect(screen.getByTestId("reset-button")).toBeInTheDocument();
    expect(screen.getByTestId("ok-button")).toBeInTheDocument();
  });

  it("OK button is disabled initially and enables after selection", () => {
    const okButton = screen.getByTestId("ok-button") as HTMLButtonElement;
    expect(okButton).toBeDisabled();

    fireEvent.change(screen.getByLabelText(/Manufacturer/i), {
      target: { value: "M1" },
    });
    fireEvent.change(screen.getByLabelText(/Vehicle Model/i), {
      target: { value: "MD1" },
    });
    fireEvent.change(screen.getByLabelText(/Vehicle Type/i), {
      target: { value: "T1" },
    });

    expect(okButton).not.toBeDisabled();
  });

  it("reset button clears selection", () => {
    fireEvent.change(screen.getByLabelText(/Manufacturer/i), {
      target: { value: "M1" },
    });
    fireEvent.change(screen.getByLabelText(/Vehicle Model/i), {
      target: { value: "MD1" },
    });
    fireEvent.change(screen.getByLabelText(/Vehicle Type/i), {
      target: { value: "T1" },
    });

    fireEvent.click(screen.getByTestId("reset-button"));

    expect(screen.getByLabelText(/Manufacturer/i)).toHaveValue("");
    expect(screen.getByLabelText(/Vehicle Model/i)).toHaveValue("");
    expect(screen.getByLabelText(/Vehicle Type/i)).toHaveValue("");
    expect(screen.getByTestId("ok-button")).toBeDisabled();
  });

  it("shows selected car details only in the summary section", () => {
    fireEvent.change(screen.getByLabelText(/Manufacturer/i), {
      target: { value: "M1" },
    });
    fireEvent.change(screen.getByLabelText(/Vehicle Model/i), {
      target: { value: "MD1" },
    });
    fireEvent.change(screen.getByLabelText(/Vehicle Type/i), {
      target: { value: "T1" },
    });

    // Scope to the section that contains the vehicle info
    const summary = screen.getByText(/Your selection/i).nextElementSibling!;
    const summaryScope = within(summary);

    expect(summaryScope.getByText(/BMW/)).toBeInTheDocument();
    expect(summaryScope.getByText(/3 Series/)).toBeInTheDocument();
    expect(summaryScope.getByText(/316 i/)).toBeInTheDocument();
    expect(summaryScope.getByText(/1796 ccm/)).toBeInTheDocument();
  });
});
