import { renderHook, act } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { useDeleteUser } from '../customHook/useDeleteUser';


vi.mock('../api/usersApi', () => ({
  deleteUser: vi.fn(),
}));

describe('useDeleteUser Hook', () => {
  const mockLocalUserList = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
  ];
  const mockSetUsers = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  test('initial state', () => {
    const { result } = renderHook(() => 
      useDeleteUser(mockLocalUserList, mockSetUsers)
    );
    
    expect(result.current.openDeleteDialog).toBe(false);
  });

  test('handleDeleteClick sets the selected user ID', () => {
    const { result } = renderHook(() => 
      useDeleteUser(mockLocalUserList, mockSetUsers)
    );
    
    act(() => {
      result.current.handleDeleteClick(1);
    });
    
    expect(result.current.openDeleteDialog).toBe(true);
  });
});