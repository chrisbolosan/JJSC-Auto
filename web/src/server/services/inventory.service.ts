import { supabaseAdmin } from '../db/supabase';

export async function getAllWarehouse() {
  const { data, error } = await supabaseAdmin
    .from('parts')
    .select(
      'number, description, price, weight, pictureURL, inventory(quantity), part_categories(category)'
    )
    .order('number');

  if (error) {
    throw new Error(`db error: ${error.message}`);
  }

  return (data ?? []).map((p) => {
    // normalize: Supabase types an embed as an object (one-to-one) or an array (one-to-many)
    const inv = Array.isArray(p.inventory) ? p.inventory[0] : p.inventory;
    const cat = Array.isArray(p.part_categories) ? p.part_categories[0] : p.part_categories;

    return {
      number: p.number,
      description: p.description,
      price: p.price,
      weight: p.weight,
      quantity: inv?.quantity ?? 0,
      category: cat?.category ?? '',
    };
  });
}