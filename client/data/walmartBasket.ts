export interface WalmartBasketItem {
  id: string;
  image: string;
  name: string;
  price: string;
  cents: string;
  unitPrice?: string;
  tag?: string;
  quantity: number;
}

export const WALMART_BASKET_ITEMS: WalmartBasketItem[] = [
  {
    id: '1',
    image: 'https://i5.walmartimages.com/seo/Fresh-Envy-Apples-Each_32451a10-0563-426a-9a16-a8865b2c3774_3.b3be01fcc4c956f51fe3890589897d31.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF',
    name: 'Fresh Envy Apples, Each',
    unitPrice: '$2.38/lb',
    price: '1',
    cents: '25',
    quantity: 2,
  },
  {
    id: '2',
    image: 'https://i5.walmartimages.com/seo/bettergoods-Smoky-Fire-Roasted-Salsa-Hot-Shelf-Stable-16-oz-Glass-Jar_d3907c0e-b612-400d-9f80-5069d1be0355.6ea507f8a37873857cafdd9afd1d1f04.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF',
    name: 'Bettergoods Smoky Fire-Roasted Salsa',
    unitPrice: '74.0¢/lb',
    price: '3',
    cents: '85',
    quantity: 1,
  },
  {
    id: '3',
    image: 'https://i5.walmartimages.com/seo/Fresh-Strawberries-1-lb-Container_b54a64ad-e961-46cf-b60c-bc763716fb0b.a481cdfd237c5ab5438d5c9e90bead07.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF',
    name: 'Fresh Strawberries, 1 lb',
    price: '3',
    cents: '24',
    quantity: 1,
  },
  {
    id: '4',
    image: 'https://i5.walmartimages.com/seo/Better-Goods-Balsamic-Chicken-Sweet-Potato-and-Brussel-Sprouts-Skillet-Meal_65059c20-8bee-4745-a099-5cc8dd2abea6.ab2fcaa0ad9e7bc1709c0f969fed1b0d.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF',
    name: 'Bettergoods Balsamic Chicken Skillet Meal',
    price: '8',
    cents: '86',
    quantity: 1,
  },
  {
    id: '5',
    image: 'https://d19oj5aeuefgv.cloudfront.net/0205383',
    name: 'Chobani Plain Greek Yogurt',
    price: '2',
    cents: '62',
    quantity: 3,
  },
  {
    id: '6',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fc112438161204b9d9db6bf5cae10363b?width=200',
    name: "Bettergoods S'mores Spread",
    price: '3',
    cents: '77',
    tag: '5 oz',
    quantity: 1,
  },
  {
    id: '7',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F29e4090c4cb94c529c55a1c82f673ffb?width=200',
    name: 'SkinnyPop Original Popcorn',
    price: '3',
    cents: '47',
    quantity: 1,
  },
  {
    id: '8',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F511efb1f58ad425ba99c9144eea744d3?width=200',
    name: 'Cold Pressed Orange Juice',
    price: '1',
    cents: '98',
    quantity: 1,
  },
  {
    id: '9',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F0c5401dc7df9426fb410ad0cdd614759?width=200',
    name: 'Oatly Original Oat Milk',
    price: '5',
    cents: '27',
    quantity: 1,
  },
  {
    id: '10',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F1f722edca31f4864b8cf7cd2bbef3ca3?format=webp&width=200',
    name: 'Marketside Cage Free Large Brown Eggs, 18 ct',
    price: '5',
    cents: '48',
    tag: '18 ct',
    quantity: 1,
  },
  {
    id: '11',
    image: 'https://i5.walmartimages.com/seo/Organic-Marketside-Fresh-Baby-Peeled-Carrots-1-lb-Bag_0f9fb9a3-5148-4ba9-a109-e69878a6fc5c.89437a32c2a0a5f821f321a42c0bdc9f.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF',
    name: 'Marketside Baby Carrots, 1 lb',
    price: '1',
    cents: '18',
    tag: '1 lb',
    quantity: 1,
  },
  {
    id: '12',
    image: 'https://i5.walmartimages.com/seo/Honey-Nut-Cheerios-Heart-Healthy-Cereal-Happy-Heart-Shapes-Mega-Size-27-2-oz_e8ca93c3-8d2e-4a8c-85ec-05ced80d5b24.f57132398afadc6309a90508ce941779.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF',
    name: 'Honey Nut Cheerios Cereal, 18.8 oz',
    price: '4',
    cents: '98',
    tag: '18.8 oz',
    quantity: 1,
  },
];

export function computeBasketTotals(items: { price: string; cents: string; quantity: number }[]) {
  let count = 0;
  let total = 0;
  for (const it of items) {
    count += it.quantity;
    total += parseFloat(`${it.price}.${it.cents.padStart(2, '0')}`) * it.quantity;
  }
  return { count, total };
}
