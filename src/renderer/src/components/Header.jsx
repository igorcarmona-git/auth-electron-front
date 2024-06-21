import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {
    const handleLogout = () => {
        const navigate = useNavigate();
        localStorage.removeItem('token');
        navigate('/');
    };
        return (<>
            <Link to="/reports">Dashboards</Link>
            <div>
                <button onClick={() => {handleLogout}}>Logout</button>
            </div>
        </>
    );
}

export default Header;