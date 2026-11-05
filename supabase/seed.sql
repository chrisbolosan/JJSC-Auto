insert into public.parts (number, description, price, weight, "pictureURL") values
  (123, 'Valvoline Conventional Motor Oil 10W-30', 32.40, 8.80, 'https://www.gvado.com/image/cache/wkseller/83/5acec2dfdd374Premium%20Conventional-10W-30-1000x1000.png'),
  (124, '18 Liter Repsol 10W Engine Oil', 40.24, 37.40, 'https://www.gvado.com/image/cache/wkseller/11228//5d3e75c85fd03SE_F1p11-1000x1000.jpg'),
  (125, 'Ceramic brake pads', 54.99, 4.20, null),
  (126, 'Engine oil filter', 8.99, 0.60, null),
  (127, 'AGM battery', 189.97, 38.50, null);

insert into public.inventory (part_number, quantity) values
  (123, 5),
  (124, 67),
  (125, 12),
  (126, 0);

insert into public.part_categories (part_number, category) values
  (123, 'Fluids'),
  (124, 'Fluids'),
  (125, 'Brakes'),
  (126, 'Filters'),
  (127, 'Batteries');

insert into public.shipping_brackets (min_weight, max_weight, shipping_charge) values
  (0, 10, 5.00),
  (10, 30, 12.00),
  (30, 60, 20.00),
  (60, null, 35.00);

insert into public.customers (email, name, street, city, zip_code) values
  ('johndoe@niu.com', 'John Doe', '67 Blinker', 'Los Santos', '67676'),
  ('scrummaster@niu.com', 'Jane Mullen', '123 Applegate', 'Dekalb', '60115');


insert into public.orders (customer_id, status, total_weight, subtotal, shipping, total, auth_number, shipped_at)
select c.id, o.status, o.total_weight, o.subtotal, o.shipping, o.total, o.auth_number, o.shipped_at
from (values('johndoe@niu.com', 'authorized', 49.67, 54.00, 15.00, 69.00, '404', now()),('scrummaster@niu.com', 'shipped', 84.34, 54.54, 20.00, 74.54, '401', now())
) as o(email, status, total_weight, subtotal, shipping, total, auth_number, shipped_at)
join public.customers c on c.email = o.email;

