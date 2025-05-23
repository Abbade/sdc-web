export interface PropagationType {
    id: number;
    name: string;
    description: string;
    id_user_create: number;
    created_at: Date;

}

export interface FaseCultivo {
    id: number;
    name: string;
    description: string;
    ordem: number;
    duration: number;
    id_user_create: number;
    created_at: Date;

}

export interface Recipiente {
    id: number           
    created_at: Date     
    id_user_create: number 
  
    name:string
    description: string; 
  
  
  }

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

export interface TrashReason {
    id: number;
    name: string;
    description: string;
}

export interface TrashedLote {
    id: number;
    id_lote: number
    name: string;
    obs: string;
    id_trashReason: number;
    trashDate: Date;
    massTrahed: number
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