import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateMatchesDarkMode } from './actions';
export default function Updater() {
    const dispatch = useDispatch();
    // keep dark mode in sync with the system
    useEffect(() => {
        const darkHandler = (match) => {
            dispatch(updateMatchesDarkMode({ matchesDarkMode: match.matches }));
        };
        const match = window === null || window === void 0 ? void 0 : window.matchMedia('(prefers-color-scheme: dark)');
        dispatch(updateMatchesDarkMode({ matchesDarkMode: match.matches }));
        if (match === null || match === void 0 ? void 0 : match.addListener) {
            match === null || match === void 0 ? void 0 : match.addListener(darkHandler);
        }
        else if (match === null || match === void 0 ? void 0 : match.addEventListener) {
            match === null || match === void 0 ? void 0 : match.addEventListener('change', darkHandler);
        }
        return () => {
            if (match === null || match === void 0 ? void 0 : match.removeListener) {
                match === null || match === void 0 ? void 0 : match.removeListener(darkHandler);
            }
            else if (match === null || match === void 0 ? void 0 : match.removeEventListener) {
                match === null || match === void 0 ? void 0 : match.removeEventListener('change', darkHandler);
            }
        };
    }, [dispatch]);
    return null;
}
