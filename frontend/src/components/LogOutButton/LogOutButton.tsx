import { useNavigate } from 'react-router-dom';

export const LogOutButton = () => {

    const navigate = useNavigate()

    const onButtonClick = async() => {
        localStorage.removeItem('token');
        localStorage.removeItem('nombre');
        return navigate("/login");
    }

    return (
        <button className="dev-logOutButton" onClick={onButtonClick}>Salir del chat</button>
    );
};
