export interface ProductInterface {
    id?: number;
    name: string;
    active: boolean;
    value: number;
    skuCode: string;
    barCode: string;
    obs?: string | null; // Permitir valor null
    isVariable: boolean;
    parent?: ProductInterface | null;
    children?: ProductInterface[] | undefined;
    parentId?: number | null;
    variableTypeId?: number | null;
    variableValueTypeId?: number | null;
    unitOfMeasureId: number;
    unitOfMeasure?: UnitOfMeasure;
    productCategoryId?: number | null;
    productCategory?: ProductCategory | null;
    height?: number | null;
    width?: number | null;
    depth?: number | null;
    volumes?: number | null;
    netWeight?: number | null;
    grossWeight?: number | null;
  
    amount: Number | string ;
    minAmount: Number | null | string;
    maxAmount: Number | null | string;
  }

  // Interface para a entidade VariableType
export interface VariableType {
  id: number;
  name: string;
  active: boolean;
  products: any[];
  variableTypeValues: VariableTypeValue[];
}
export interface ProductChildInterface {
  id?: number | null;
  name?: string | null;
  unitOfMeasureId?: number | null;
  barCode?: string | null;
  skuCode?: string | null;
  value?: number | null;
  active?: boolean | null;
  variableTypeId?: number | null;
  variableValueTypeId?: number | null;
  amount?: number | null;
}
// Interface para a entidade VariableTypeValue
export interface VariableTypeValue {
  id: number;
  name: string;
  active: boolean;
  products: any[];
  variableTypeId: number;
 // variableType: VariableType;
}

  export type ProductType = {
    id?: number;
    name: string;
    active: boolean;
    value: number;
    skuCode: string;
    barCode: string;
    obs?: string | null; // Permitir valor null
    isVariable: boolean;
    parent?: ProductInterface | null;
    children?: ProductInterface[] | undefined;
    parentId?: number | null;
    variableTypeId?: number | null;
    variableValueTypeId?: number | null;
    unitOfMeasureId: number;
    unitOfMeasure?: UnitOfMeasure;
    productCategoryId?: number | null;
    productCategory?: ProductCategory | null;
    height?: number | null;
    width?: number | null;
    depth?: number | null;
    volumes?: number | null;
    netWeight?: number | null;
    grossWeight?: number | null;
  
    amount: Number | string ;
    minAmount: Number | null | string;
    maxAmount: Number | null | string;
  };

  export interface UnitOfMeasure {
    id: number;
    name: string;
    active: boolean;
    products: ProductInterface[];
  }
  
  export interface ProductCategory {
    id: number;
    name: string;
    active: boolean;
    products: ProductInterface[];
  }
  