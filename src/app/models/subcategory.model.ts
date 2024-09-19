export interface Subcategory {
  _id: string;               // Assuming MongoDB ObjectId
  name: string;
  description?: string;      // Optional field
  image?: string;            // Optional field
  parentCategoryId: string;  // ID reference to the parent category
}
