export interface PlantaInterface {
    id: number;
    id_lote: number;
    aclimatationDate: Date;
    qtPlant: number;
    id_location: number;
    id_recipiente: number;
    obs: string;
  }
  
export interface INewPlant {
    id_lote: number;
  
    name: string;
  
    obs: string;
  
    id_location?: number;
    id_recipiente?: number;
  
    aclimatationDate: Date;
  
    //GENERATED ABOVE
    aclimatationName: string;
  
    id_user_create: number;
    propDate: Date;
    propName: string,
    id_genetic: number,
    id_propagationType: number;
  
    id_faseCultivo: number;
  }
  
  