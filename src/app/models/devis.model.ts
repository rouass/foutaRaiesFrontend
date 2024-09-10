export interface SelectedFouta {
  fouta: string;
  color: string;
  quantity: number;
  comments?: string;
}

export interface Devis {
  name: string;
  prenom: string;
  numtel: string;
  email: string;
  comments?: string;
  selectedFoutas: SelectedFouta[];
}
