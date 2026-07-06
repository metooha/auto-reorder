export const allSuggestions = [
  // TVs & Electronics
  'tv', 'tvs on sale', 'best tvs for gaming', 'tvs for living rooms', 'tvs under $500',
  'large screen tvs', 'tv mount', 'tv antenna', 'television', 'tv stand', 'smart tv',
  'laptop', 'laptops for students', 'gaming laptop', 'headphones', 'wireless headphones',
  'bluetooth speaker', 'phone charger', 'tablet', 'ipad',
  // Toys
  'toys', 'toys for boys', 'toys for girls', 'toys for toddlers', 'educational toys',
  'outdoor toys', 'baby toys', 'lego sets', 'barbie dolls', 'action figures',
  'board games', 'stuffed animals', 'toy cars', 'puzzles', 'building blocks',
  'remote control cars', 'dollhouse', 'toy kitchen', 'nerf guns', 'hot wheels',
  // Clothing
  'shirt', 'shirts for men', 'shirts for women', 't-shirts', 'jeans', 'jeans for women',
  'pants', 'dress', 'dresses for women', 'shoes', 'sneakers', 'boots', 'socks',
  'underwear', 'jacket', 'winter jacket', 'sweater', 'hoodie',
  // Groceries & Food
  'milk', 'bread', 'eggs', 'chicken', 'ground beef', 'rice', 'pasta', 'cereal',
  'coffee', 'coffee pods', 'tea', 'chips', 'cookies', 'snacks', 'snacks for kids',
  'fruit snacks', 'yogurt', 'cheese', 'butter', 'frozen pizza',
  // Household
  'toilet paper', 'paper towels', 'laundry detergent', 'dish soap', 'cleaning supplies',
  'trash bags', 'batteries', 'light bulbs', 'storage bins', 'hangers', 'towels',
  'sheets', 'pillows', 'blankets',
  // Baby & Kids
  'diapers', 'baby wipes', 'baby formula', 'baby food', 'baby bottles', 'pacifiers',
  'baby clothes', 'car seat', 'stroller', 'baby monitor',
  // Beauty & Personal Care
  'shampoo', 'conditioner', 'body wash', 'toothpaste', 'toothbrush', 'deodorant',
  'makeup', 'lipstick', 'mascara', 'skincare', 'moisturizer', 'sunscreen', 'razor', 'hair dryer',
  // Sports & Outdoors
  'basketball', 'soccer ball', 'yoga mat', 'dumbbells', 'weights', 'camping tent',
  'sleeping bag', 'hiking boots', 'bike', 'bicycle', 'skateboard', 'roller skates',
  // Pet Supplies
  'dog food', 'cat food', 'pet toys', 'dog treats', 'cat litter', 'pet bed', 'leash', 'collar',
  // Books & Media
  'books', 'kindle', 'magazines', 'notebook', 'pens', 'markers', 'crayons', 'backpack',
  // Kitchen & Dining
  'plates', 'cups', 'utensils', 'cookware', 'pots and pans', 'coffee maker', 'blender',
  'microwave', 'toaster', 'air fryer', 'slow cooker',
  // Furniture
  'couch', 'sofa', 'chair', 'desk', 'table', 'bed frame', 'mattress', 'dresser',
  'bookshelf', 'ottoman'
];

export type KeepShoppingItem = {
  label: string;
  image: string | null;
  isFilter?: boolean;
};

export const keepShoppingCategory = 'Flowers';

export const keepShoppingFor: KeepShoppingItem[] = [
  { label: 'Pickup today', image: null, isFilter: true },
  { label: 'Flowers Shop', image: 'https://images.pexels.com/photos/5410133/pexels-photo-5410133.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { label: 'Flowers Bouquet', image: 'https://images.pexels.com/photos/35062137/pexels-photo-35062137.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { label: 'Roses', image: 'https://images.pexels.com/photos/19867740/pexels-photo-19867740.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { label: 'Artificial Flowers', image: 'https://images.pexels.com/photos/8754695/pexels-photo-8754695.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { label: 'Sunflowers', image: 'https://images.pexels.com/photos/4622893/pexels-photo-4622893.jpeg?auto=compress&cs=tinysrgb&w=300' },
];

export const grabYourUsuals = [
  'white socks',
  'coffee pods',
  'paper towels',
  'laundry detergent',
  'dog food',
  'bread',
  'cheese',
];

export const defaultRecentSearches = [
  'towel papers big rolls',
  'suncreen travel size',
  'kids socks toddler',
  'milk low fat',
  'smart tv 65',
];

export const trendingSearches = [
  'sprite+tea',
  'slashing legends tin',
  'toothpicks',
  'abu garcia',
  'quilted northern bath tissue',
  'pencils',
  'protein powder',
];

export const frequentSearches = [
  'papel plates',
  'laundry detergent',
  'eggs',
  'green tea',
  'cereal',
  'colgate',
  'flour',
  'listerine',
];

export function filterSuggestions(query: string): string[] {
  if (!query) return [];
  return allSuggestions.filter(s => s.toLowerCase().includes(query.toLowerCase()));
}

export function renderHighlightedText(text: string, query: string) {
  if (!query) return { before: '', match: text, after: '' };

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerText.indexOf(lowerQuery);

  if (index === -1) return { before: text, match: '', after: '' };

  return {
    before: text.slice(0, index),
    match: text.slice(index, index + query.length),
    after: text.slice(index + query.length),
  };
}
