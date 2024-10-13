import { logOutRequest } from "#services/userServices.ts";
import { useNavigate } from 'react-router-dom';

export const LogOutButton = () => {

    const navigate = useNavigate()

    const onButtonClick = async() => {
        const res = await logOutRequest();
        if(res.status === 200) return navigate("/login");
    }

    return (
        <button className="dev-logOutButton" onClick={onButtonClick}>Salir del chat</button>
    );
};
