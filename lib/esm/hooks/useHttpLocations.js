import { useMemo } from 'react';
import uriToHttp from '../utils/uriToHttp';
export default function useHttpLocations(uri) {
    return useMemo(() => {
        return uri ? uriToHttp(uri) : [];
    }, [uri]);
}
