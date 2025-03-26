import { Navigate, Route, Routes } from "react-router";
import "./App.scss";
import { UsersList } from "./components/UsersList";
import { UserForm } from "./components/UserForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/users" />} />
      <Route path="/users" element={<UsersList />} />
      <Route path="/users/new" element={<UserForm />} />
      <Route path="/users/edit/:id" element={<UserForm />} />
    </Routes>
  );
}

export default App;
