
declare namespace Express {
    interface Request {
        currentHome: {
            _id: string;
            ownerFirstName: string;
            ownerLastName: string;
            email: string;
            loginName: string;
            phone: string;
        }
    }
}