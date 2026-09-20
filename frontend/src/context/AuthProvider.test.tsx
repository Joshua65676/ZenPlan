// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, beforeEach } from "vitest";
import { AuthProvider } from "./AuthProvider";
import { useAuth } from "../hooks/useAuth";

const TestConsumer = () => {
  const { user } = useAuth();

  return <div>{user?.email ?? "no-user"}</div>;
};

describe("AuthProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("restores the saved user after a reload", () => {
    const savedUser = {
      id: 42,
      email: "test@example.com",
      gmail: null,
      name: "Test User",
      username: null,
      profile_picture: null,
      google_avatar: null,
      is_profile_setup: true,
    };

    localStorage.setItem("zenplan_user", JSON.stringify(savedUser));

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    );

    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });
});
