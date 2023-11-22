import { Navigate, Outlet } from "react-router";
import { Login } from "../../components";
import "./Admin.css";
import { useGlobalAuthContext } from "../../hooks";

const Admin = () => {
  const { currentUser } = useGlobalAuthContext();

  if (currentUser) {
    Navigate("/admin/manageArticles");
  }
  return (
    <div className="admin-container">
      <Login />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;
