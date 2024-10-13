import { useState, useEffect } from "react";
import marcaDark from "#assets/marcaDark.png";
import marcaOriginal from "#assets/marcaOriginal.png";

export const MarcaPersonal = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(
        document.documentElement.classList.contains("dark")
    );

    useEffect(() => {
        const updateDarkMode = () => {
            setIsDarkMode(document.documentElement.classList.contains("dark"));
        };

        // Inicializa el estado
        updateDarkMode();

        // Configura un observer para cambios en el DOM
        const observer = new MutationObserver(updateDarkMode);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"], // Observa cambios solo en la clase
        });

        return () => {
            observer.disconnect(); // Desconectar el observer al desmontar
        };
    }, []);

    return (
        <div className="absolute bottom-10 right-10 flex flex-row gap-4 place-items-center">
            <span className="text-white font-bold text-lg">Developed By</span>
            <img
                src={isDarkMode ? marcaOriginal : marcaDark}
                alt="Jorge Neder"
                className="w-[120px]"
            />
        </div>
    );
};
