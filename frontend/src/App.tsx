import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginRequest } from "#services/userServices.ts";
import { Usuario } from '#models/Usuario.ts';
import { MarcaPersonal } from "#components/MarcaPersonal/MarcaPersonal.tsx";
import { DarkModeButton } from "#components/DarkModeButton/DarkModeButton.tsx";

interface AppProps {
    nombre: (nombre:string) => void
}

export const App: React.FC<AppProps> = ({ nombre }) => {

    const { register, formState: { errors }, handleSubmit, clearErrors } = useForm();
    
    const setNombre = nombre;

    const navigate = useNavigate()

    const correctPassword = import.meta.env.VITE_SECRET_PASSWORD;

    const onSubmit = handleSubmit( async (data) => {
        const loginUser: Usuario = {
            nombre: data.nombre,
            contraseña: data.contraseña,
        }
        if(data.contraseña == correctPassword) {
            setNombre(data.nombre);
            const res = await loginRequest(loginUser)
            if(res.status == 200) return navigate("/protected/chat");
            console.log('Usuario no logueado')
        }
    });

    return (
        <div className="dev-fondo dev-main relative">
            <h1 className="dev-titulo">HiDev</h1>
            <form className="dev-form" onSubmit={onSubmit}>
                <input 
                    type="text" 
                    placeholder="Nombre" 
                    className="dev-input" 
                    {...register("nombre", {
                        minLength: {
                            value: 3,
                            message: 'El nombre debe tener al menos 3 caractéres',
                        },
                        maxLength: {
                            value: 20,
                            message: 'El nombre puede contener como máximo 20 caractéres',
                        },
                        validate: value => {
                            if(value === "" || value === null) {
                                return 'Debes ingresar un nombre para acceder';
                            } else return true;
                        }
                    })}
                    onChange={()=> clearErrors("nombre")}
                />
                <div className="h-[5px] translate-y-[-9px]">
                    <span className={errors && errors.nombre ? "dev-error opacity-1 transition-all duration-[.5s] ease-in-out" : "dev-error opacity-0"}>{errors.nombre && errors.nombre.message ? errors.nombre.message.toString() : ""}</span>
                </div>
                <input
                    type="password"
                    placeholder="Contraseña"
                    className="dev-input"
                    {...register("contraseña", {
                        validate: value => {
                            if(!value) {
                                return 'Debes ingresar la contaseña para acceder';
                            } else if(value != correctPassword) {
                                return 'La contraseña es incorrecta';
                            } else return true;
                        }
                    })}
                    onChange={()=> clearErrors("contraseña")}
                />
                <div className="h-[5px] translate-y-[-9px]">
                    <span className={errors && errors.contraseña ? "dev-error opacity-1 transition-all duration-[.5s] ease-in-out" : "dev-error opacity-0"}>{errors.contraseña && errors.contraseña.message ? errors.contraseña.message.toString() : ""}</span>
                </div>
                <input type="submit" className="dev-button" value="Entrar al Chat" />
            </form>
            <MarcaPersonal />
            <DarkModeButton />
        </div>
    );
};
