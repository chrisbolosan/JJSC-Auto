--DATA SEED
--plz work
--do 
--npx supabase db reset
--then
--npx supabase db push --include-seed
--and check supabase dashboard


INSERT INTO "LEGACY"(part_no, description, img_url, price, weight) VALUES
(123, 'Valvoline Conventional Motor Oil 10W-30', 
'https://www.gvado.com/image/cache/wkseller/83/5acec2dfdd374Premium%20Conventional-10W-30-1000x1000.png', 32.40, 8.8), 
(124, '18 Liter Repsol 10W Engine Oil', 
'https://www.gvado.com/image/cache/wkseller/11228//5d3e75c85fd03SE_F1p11-1000x1000.jpg', 40.24, 37.4),
(125, 'Rotor', 'https://contentassets.autozone.com/product_image/USA/11544/BHKQ/EBR1210XPR/EBR1210XPR-01.jpg', 65.90, 15);

INSERT INTO "INVENTORY"(part_no, quantity) VALUES
(123, 5),
(124, 67);

INSERT INTO "CUSTOMER"(email, name, street, city, zip_code) VALUES
('johndoe@niu.com', 'John Doe', '67 Blinker', 'Los Santos', '67676'),
('scrummaster@niu.com', 'Chris Bolosan', '420 Josh', 'Dekalb', '60115');

