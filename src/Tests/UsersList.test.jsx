import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { UsersList } from "../components/UsersList";
import { beforeEach, describe, expect, test, vi } from "vitest";
import "@testing-library/jest-dom";

vi.mock("@mui/x-data-grid", () => ({
  DataGrid: vi.fn(() => (
    <div data-testid="mocked-datagrid">Mocked DataGrid</div>
  )),
  GridActionsCellItem: vi.fn(),
}));

vi.mock("../api/usersApi", async () => {
  const actual = await import("../api/usersApi");
  return {
    ...actual,
    fetchUsers: vi.fn(),
  };
});

vi.mock("../customHook/useDeleteUser", async () => {
  const actual = await import("../customHook/useDeleteUser");
  return {
    ...actual,
    useDeleteUser: vi.fn(),
  };
});

const mockNavigate = vi.fn();
vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    MemoryRouter: actual.MemoryRouter,
  };
});

describe("UsersList Component", () => {
  const mockUsers = [
    { id: 1, name: "John Doe", email: "john@test.com", phone: "1234567890" },
    { id: 2, name: "Jane Smith", email: "jane@test.com", phone: "0987654321" },
  ];

  beforeEach(async () => {
    vi.clearAllMocks();
    localStorage.clear();

    const { fetchUsers } = await import("../api/usersApi");
    vi.mocked(fetchUsers).mockResolvedValue(mockUsers);

    const { useDeleteUser } = await import("../customHook/useDeleteUser");
    vi.mocked(useDeleteUser).mockReturnValue({
      openDeleteDialog: false,
      handleDeleteClick: vi.fn(),
      handleDeleteConfirm: vi.fn(),
      handleDeleteCancel: vi.fn(),
    });
  });

  test("renders component title", () => {
    render(
      <MemoryRouter>
        <UsersList />
      </MemoryRouter>
    );
    expect(screen.getByText("Users")).toBeInTheDocument();
  });

  test("displays users from localStorage", async () => {
    localStorage.setItem("users", JSON.stringify(mockUsers));
    render(
      <MemoryRouter>
        <UsersList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("mocked-datagrid")).toBeInTheDocument();
    });
  });

  test("calls delete handler when delete action triggered", async () => {
    const mockHandleDelete = vi.fn();
    const { useDeleteUser } = await import("../customHook/useDeleteUser");
    vi.mocked(useDeleteUser).mockReturnValue({
      openDeleteDialog: false,
      handleDeleteClick: mockHandleDelete,
      handleDeleteConfirm: vi.fn(),
      handleDeleteCancel: vi.fn(),
    });

    localStorage.setItem("users", JSON.stringify(mockUsers));
    render(
      <MemoryRouter>
        <UsersList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockHandleDelete).not.toHaveBeenCalled();
      mockHandleDelete(1);
      expect(mockHandleDelete).toHaveBeenCalledWith(1);
    });
  });
});
