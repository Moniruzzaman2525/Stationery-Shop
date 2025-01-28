export type TUser = {
    _id: string;
    id: string;
    name: string;
    email: string;
    role: string;
    isBlocked: boolean;
    createdAt: string;
    updatedAt: string;
    age?: string;
    gender?: string;
    phone?: string;
    currentCity?: string;
    currentCountry?: string;
    currentStreet?: string;
    permanentCity?: string;
    permanentCountry?: string;
    permanentStreet?: string;
}