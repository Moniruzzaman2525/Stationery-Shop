

export interface TUser {
    id: string;
    _id?: string;
    name: string;
    age?: string;
    gender?: 'Male' | 'Female';
    blood?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
    phone?: string;
    email: string;
    currentCountry?: string;
    currentCity?: string;
    currentStreet?: string;
    permanentCountry?: string;
    permanentCity?: string;
    permanentStreet?: string;
    password: string;
    role?: 'admin' | 'user';
    isBlocked?: boolean
}
