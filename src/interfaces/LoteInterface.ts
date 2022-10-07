export interface Location {
    id: number;
    name: string;
    description: string;
    id_section: number;
    created_at: Date;
}

export interface Genetic {
    id: number;
    name: string;
    nick: string;
    description: string;
    created_at: Date;
    id_profile: number;
}

export interface LoteInterface {
    id: number;
    name: string;
    obs: string;
    propDate: Date;
    created_at: Date;
    id_propagationType: number;
    id_genetic: number;
    id_location_init: number;
    qtTotal: number;
    qtProp: number;
    qtPropTrashed: number;
    qtPlant: number;
    location: Location;
    genetic: Genetic;
}