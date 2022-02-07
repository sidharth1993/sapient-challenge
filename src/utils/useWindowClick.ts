import { useEffect, useState } from "react";

function useWindowClick (ref: React.RefObject<any>) : boolean {
    const [windowClick, setWindowClick] = useState(false);
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            setWindowClick(ref.current && !ref.current.contains(event.target));
        }
        window.addEventListener('mousedown', handleClick);
        return () => {
            window.removeEventListener('mousedown', handleClick);
        }
    }, [ref])
    return windowClick;
}

export default useWindowClick;