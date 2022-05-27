export declare function buildOrderData(chainId: string, verifyingContract: string, order: any): {
    primaryType: string;
    types: {
        Order: {
            name: string;
            type: string;
        }[];
    };
    domain: {
        name: string;
        version: string;
        chainId: string;
        verifyingContract: string;
    };
    message: any;
};
