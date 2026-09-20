// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Settings from "./Settings";

const mockSetUser = vi.fn();
const fetchMock = vi.fn();

vi.mock("../../hooks/useAuth", () => ({
  useAuth: () => ({
    user: {
      id: 1,
      email: "old@example.com",
      gmail: null,
      name: "Old Name",
      username: "old-name",
      profile_picture: null,
      google_avatar: null,
      is_profile_setup: true,
    },
    setUser: mockSetUser,
  }),
}));

describe("Settings", () => {
  beforeEach(() => {
    mockSetUser.mockClear();
    fetchMock.mockClear();
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        user: {
          id: 1,
          email: "new@example.com",
          gmail: null,
          name: "New Name",
          username: "old-name",
          profile_picture: null,
          google_avatar: null,
          is_profile_setup: true,
        },
      }),
    });
    vi.stubGlobal("fetch", fetchMock);
  });

  it("sends the updated profile to the backend when save changes is clicked", async () => {
    render(<Settings />);

    fireEvent.change(screen.getByLabelText("Full Name"), {
      target: { value: "New Name" },
    });

    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "new@example.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /save changes/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "http://localhost:8080/auth/profile",
        expect.objectContaining({
          method: "POST",
          credentials: "include",
        }),
      );
    });

    expect(mockSetUser).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "New Name",
        email: "new@example.com",
      }),
    );
  });
});
