import { render, screen } from "@testing-library/react";

import Home from "../app/page";

it("Should have template", () => {
  render(<Home />);

  const templates = screen.getByText("Templates");

  expect(templates).toBeDefined();
});
