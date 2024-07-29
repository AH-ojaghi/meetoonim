import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Action from "../src/Components/Content/Card/Action";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: "Like added successfully!" }),
  })
) as jest.Mock;

describe("Action Component", () => {
  const mockImage = <img alt="mock" />;
  const mockId = 96;

  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  test("renders Action component with initial state", () => {
    render(<Action img={mockImage} text="بسندیدن" id={mockId} />);
    expect(screen.getByText("بسندیدن")).toBeInTheDocument();
    expect(screen.getByAltText("mock")).toBeInTheDocument();
  });

  test("toggles like state on click", async () => {
    render(<Action img={mockImage} text="بسندیدن" id={mockId} />);

    const actionElement = screen.getByText("بسندیدن").closest("div");
    if (actionElement) {
      fireEvent.click(actionElement);

      await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
      expect(fetch).toHaveBeenCalledWith(
        `https://meetoonim.com/api/v1/posts/${mockId}/like`,
        expect.objectContaining({
          method: "PUT",
        })
      );

      await waitFor(() =>
        expect(screen.getByText("بسندیدن")).toBeInTheDocument()
      );
    }
  });

  test("toggles save state on click", async () => {
    render(<Action img={mockImage} text="ذخیره" id={mockId} />);

    const actionElement = screen.getByText("ذخیره").closest("div");
    if (actionElement) {
      fireEvent.click(actionElement);

      await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
      expect(fetch).toHaveBeenCalledWith(
        `https://meetoonim.com/api/v1/bookmarks/${mockId}`,
        expect.objectContaining({
          method: "POST",
        })
      );

      await waitFor(() =>
        expect(screen.getByText("ذخیره")).toBeInTheDocument()
      );
    }
  });
});
