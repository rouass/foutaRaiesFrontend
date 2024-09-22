import { Fouta } from "./fouta.model";

export interface SelectedFouta {
  fouta: Fouta;
  dimension: string;  // Add this field
  quantity: number;
  comments?: string;
}

export interface Devis {
  _id: string;
  name: string;
  prenom: string;
  numtel: string;
  email: string;
  comments?: string;
  selectedFoutas: SelectedFouta[];
}
