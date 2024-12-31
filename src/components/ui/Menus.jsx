import { createContext, useContext, useState } from "react";
import Icon from "./Icon";
import { useOutSideClick } from "../../hooks/useOutSideClick";
import StyleListMenu from "./StyleListMenu";
import ModalButton from "./ModalButton";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils";


const MenusContext = createContext();

function Menus({ children }) {
    const [openName, setOpenName] = useState("");
    const [position, setPosition] = useState(null);
    const close = () => setOpenName("");
    const open = setOpenName;

    return (
        <MenusContext.Provider value={{ openName, open, close, position, setPosition }}>
            {children}
        </MenusContext.Provider>
    );
}
function Toggle({ name, icon, }) {
    const { openName, open, close, setPosition } = useContext(MenusContext);
    function handleClick(e) {
        e.stopPropagation();
        const rect = e.target.closest("button").getBoundingClientRect();
        setPosition({
            x: window.innerWidth - rect.width - rect.x,
            y: rect.y + rect.height + 8,
        });
        openName === "" || openName !== name ? open(name) : close();
    }
    return (
        <ModalButton icon={<Icon name={icon} />} onClick={handleClick} tooltip={name}/>
    );
}

function List({ name, children }) {
    const { openName, close, position } = useContext(MenusContext);
    const ref = useOutSideClick(close, false);

    if (openName !== name) return null;

    return createPortal(
        <StyleListMenu position={position} ref={ref}>
            {children}
        </StyleListMenu>, document.body
    )
}

function Button({ children, icon, onClick }) {
    const { close } = useContext(MenusContext);

    function handleClick() {
        onClick?.();
        close();
    }

    return (
        <li>
            <button onClick={handleClick}>
                {icon}
                <span>{children}</span>
            </button>
            
        </li>
    )
}

Menus.Toggle = Toggle
Menus.List = List
Menus.Button = Button

export default Menus;
