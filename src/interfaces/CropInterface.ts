export interface Crops {
    id_location: number
    location: any    
  
    id_fasesCrop: number
    fasesCrop: any
  
    id_genetic: number
    genetics : any
  
    name: String
  
    isStored: Boolean
  
    cropDate        :Date
    dryingStartDate :Date
    dryingEndDate   :Date
    storageDate     :Date
  
    qtPlants: number
  
    cropFullWetMass   : number
    cropWetTrimMass   : number
    cropFlowerWetMass : number
  
    cropFullDriedMass   : number
    cropDriedTrimMass   : number
    cropDriedFlowerMass : number
  
    plantas: any
  }