import { Outlet } from "react-router";
import { Login } from '../../components'
import './Admin.css';

const Admin = () => {
    return (
            <div className="admin-container">
                <Login/>
                <main>
                    <Outlet />
                </main>
            </div>
    );
};

export default Admin;