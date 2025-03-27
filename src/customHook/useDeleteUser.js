import { useState } from "react";
import { deleteUser } from "../api/usersApi";

export const useDeleteUser = (localUserList, setUsers) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedUserId(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteUser(selectedUserId);
      const filteredList = localUserList.filter(
        (user) => user.id !== parseInt(selectedUserId)
      );
      localStorage.setItem("users", JSON.stringify(filteredList));
      setUsers(filteredList);
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setOpenDeleteDialog(false);
      setSelectedUserId(null);
    }
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
    setSelectedUserId(null);
  };

  return {
    openDeleteDialog,
    selectedUserId,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
  };
};