export interface Student {
    name: string;
    year: number;
    group: number;
    status: string;
    birthdate: string;
    birthPlace: string;
    undergraduateMajor: string;
    photo: string;
  }
  
  export interface Filter {
    category: string;
    displayName: string;
    options: Option[];
  }
  
  export type FilterState = Record<string, Option>;
  
  export type Option = string | number;
  