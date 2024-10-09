import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

interface AppProps {
    nombre: (nombre:string) => void
}

export const App: React.FC<AppProps> = ({ nombre }) => {

    const setNombre = nombre;

    const { register, formState: { errors }, handleSubmit, clearErrors } = useForm();

    const navigate = useNavigate()

    const correctPassword = import.meta.env.VITE_SECRET_PASSWORD;

    const onSubmit = handleSubmit(data => {

        if(data.contraseña == correctPassword) {
            setNombre(data.nombre);
            return navigate("/chat");
        }
    });

    const onInputChange = () => {
        if(errors) clearErrors();
    }

    return (
        <div className="fondoClaro main">
            <h1 className="titulo">HiDev</h1>
            <form className="form" onSubmit={onSubmit}>
                <div className="flex flex-col gap-2 place-content-start">
                    <input 
                        type="text" 
                        placeholder="Nombre" 
                        className="input" 
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
                        onChange={onInputChange}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        className="input"
                        {...register("contraseña", {
                            validate: value => {
                                if(value === "" || value === null) {
                                    return 'Debes ingresar la contaseña para acceder';
                                } else if(value != correctPassword) {
                                    return 'La contraseña es incorrecta';
                                } else return true;
                            }
                        })}
                        onChange={onInputChange}
                    />
                    <div className="h-[10px]">
                        <span className={errors && errors.contraseña ? "error opacity-1 transition-all duration-[.5s] ease-in-out" : "error opacity-0"}>{errors.contraseña && errors.contraseña.message ? errors.contraseña.message.toString() : ""}</span>
                    </div>
                </div>
                <button type="submit" className="button">
                    Entrar al Chat
                </button>
            </form>
        </div>
    );
};
