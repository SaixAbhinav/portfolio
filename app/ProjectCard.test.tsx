import { describe, it, expect } from "vitest";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectCard } from "./ProjectCard";

const baseProps = {
  title: "SmartSignal",
  subtitle: "AI Traffic Light Automation System",
  description: "Reduces vehicle waiting time by ~28%.",
  tags: ["Python", "PPO"],
  github: "https://github.com/example/smart-signal",
  iconName: "TrafficCone" as const,
  kicker: "Project 01",
  demo: <div data-testid="demo">demo</div>,
};

const screenshots = [
  { src: "https://example.com/a.png", caption: "First screen", width: 800, height: 600 },
];

// The expanded modal renders a visible "GitHub" action link; the collapsed card
// does not. So the presence of that text is a reliable proxy for "modal open".
const modalMarker = () => screen.queryByRole("link", { name: "GitHub" });

describe("ProjectCard", () => {
  it("renders the collapsed card content", () => {
    render(<ProjectCard {...baseProps} />);
    expect(screen.getByRole("heading", { name: "SmartSignal" })).toBeInTheDocument();
    expect(screen.getByText("AI Traffic Light Automation System")).toBeInTheDocument();
    expect(screen.getByText("Python")).toBeInTheDocument();
    expect(screen.getByText("PPO")).toBeInTheDocument();
    // Modal is not mounted until the card is activated.
    expect(modalMarker()).not.toBeInTheDocument();
  });

  it("opens the modal when the card is clicked", async () => {
    const user = userEvent.setup();
    render(<ProjectCard {...baseProps} />);

    await user.click(screen.getByRole("heading", { name: "SmartSignal" }));

    expect(modalMarker()).toBeInTheDocument();
  });

  it("closes the modal on Escape", async () => {
    const user = userEvent.setup();
    render(<ProjectCard {...baseProps} />);

    await user.click(screen.getByRole("heading", { name: "SmartSignal" }));
    expect(modalMarker()).toBeInTheDocument();

    await user.keyboard("{Escape}");
    await waitForElementToBeRemoved(modalMarker);
    expect(modalMarker()).not.toBeInTheDocument();
  });

  it("locks body scroll while the modal is open and restores it on close", async () => {
    const user = userEvent.setup();
    render(<ProjectCard {...baseProps} />);
    expect(document.body.style.overflow).toBe("");

    await user.click(screen.getByRole("heading", { name: "SmartSignal" }));
    expect(document.body.style.overflow).toBe("hidden");

    await user.keyboard("{Escape}");
    await waitForElementToBeRemoved(modalMarker);
    expect(document.body.style.overflow).toBe("");
  });

  it("Escape closes the lightbox first, leaving the modal open", async () => {
    const user = userEvent.setup();
    render(<ProjectCard {...baseProps} screenshots={screenshots} />);

    await user.click(screen.getByRole("heading", { name: "SmartSignal" }));
    expect(modalMarker()).toBeInTheDocument();

    // Open the screenshot lightbox.
    await user.click(screen.getByRole("button", { name: "Expand screenshot: First screen" }));
    const closeLightbox = screen.getByRole("button", { name: "Close screenshot" });
    expect(closeLightbox).toBeInTheDocument();

    // First Escape dismisses the lightbox synchronously but keeps the modal mounted.
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("button", { name: "Close screenshot" })).not.toBeInTheDocument();
    expect(modalMarker()).toBeInTheDocument();
  });
});
