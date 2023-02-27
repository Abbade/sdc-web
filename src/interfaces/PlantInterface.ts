export interface Location {
  id: number;
  created_at: Date;
  id_user_create: number;
  name: string;
  description: string;
  id_section: number;
  id_faseCultivo?: any;
}

export interface Genetic {
  id: number;
  created_at: Date;
  id_user_create: number;
  name: string;
  nick: string;
  description: string;
  id_profile: number;
}

export interface Recipiente {
  id: number;
  created_at: Date;
  id_user_create: number;
  name: string;
  description: string;
}

export interface PropagationType {
  id: number;
  created_at: Date;
  id_user_create: number;
  name: string;
  description: string;
}

export interface FaseCultivo {
  id: number;
  created_at: Date;
  id_user_create: number;
  name: string;
  description: string;
  ordem: number;
  duration?: any;
  id_tipo_fase_cultivo: number;
}

export interface ActionPlant {
  id: number;
  id_user_create: number;
  created_at: Date;
  obs: string;
  status: string;
  id_actionGroup: number;
  id_user_atribution: number;
  id_user_completion: number;
  scheduledDate?: any;
  isCanceled?: any;
  cancelationDate?: any;
  isCompleted: boolean;
  completionDate: Date;
  id_action: number;
  id_planta: number;
  id_recipiente?: number;
  id_faseCultivo?: number;
  id_location?: number;
  id_trashReason?: any;
  id_recipiente_old?: any;
  id_faseCultivo_old?: number;
  id_location_old?: number;
}

export interface PlantInterface {
  id: number;
  id_user_create: number;
  created_at: Date;
  obs: string;
  name: string;
  id_lote: number;
  id_propagationType: number;
  id_genetic: number;
  id_location: number;
  id_recipiente: number;
  id_faseCultivo: number;
  isMotherPlant: boolean;
  isMalePlant: boolean;
  isTrashed: boolean;
  isCropped: boolean;
  id_mother?: any;
  lastTransplant: Date;
  propDate: Date;
  propName: string;
  aclimatationDate: Date;
  vegetationDate?: any;
  vegetation2Date?: any;
  vegetation3Date?: any;
  floweringDate?: any;
  aclimatationLocation: string;
  aclimatationRecipient: string;
  vegetationLocation?: any;
  vegetationRecipient?: any;
  vegetation2Location?: any;
  vegetation2Recipient?: any;
  vegetation3Location?: any;
  vegetation3Recipient?: any;
  floweringLocation?: any;
  floweringRecipient?: any;
  cropDate?: any;
  cropName?: any;
  id_crop?: any;
  trashDate?: any;
  id_trashReason?: any;
  fullWetMass?: any;
  flowersWetMass?: any;
  wetTrimMass?: any;
  fullDriedMass?: any;
  flowersDriedMass?: any;
  driedTrimMass?: any;
  location: Location;
  genetic: Genetic;
  recipiente: Recipiente;
  propagationType: PropagationType;
  faseCultivo: FaseCultivo;
  actionPlants?: ActionPlant[];
}
