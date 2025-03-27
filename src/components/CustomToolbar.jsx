import { Button } from "@mui/material";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { useNavigate } from "react-router";
import AddIcon from "@mui/icons-material/Add";

export function CustomToolbar() {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate(`/users/new`);
  };

  return (
    <GridToolbarContainer sx={{ justifyContent: "flex-end" }}>
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        onClick={handleCreate}
        sx={{
          mb: 2,
          backgroundColor: "#1976d2",
          "&:hover": {
            backgroundColor: "#1565c0",
          },
        }}
      >
        Create User
      </Button>
    </GridToolbarContainer>
  );
}
