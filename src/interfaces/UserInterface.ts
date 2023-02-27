export interface UserInterface {
    id: number;
    created_at: Date;
    id_role: number;
    id_organization?: any;
    name: string;
    email: string;
    password: string;
}