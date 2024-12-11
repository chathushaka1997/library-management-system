import { NavigateFunction } from "react-router-dom";

// Define navigate as optional
export let navigate: NavigateFunction | undefined = () => {};

export const setNavigate = (fn: NavigateFunction | undefined) => {
    if (fn) {
        navigate = fn;
    }
};