#SEED DATA
INSERT INTO INVENTORY(part_no, quantity) VALUES
(123, 5),
(124, 67);

INSERT INTO LEGACY(part_no, description, img_url, price, weight,)
(123, "Valvoline Conventional Motor Oil 10W-30", 
https://www.gvado.com/image/cache/wkseller/83/5acec2dfdd374Premium%20Conventional-10W-30-1000x1000.png, 32.40, 8.8), 
(124, "18 Liter Repsol 10W Engine Oil", 
https://www.gvado.com/image/cache/wkseller/11228//5d3e75c85fd03SE_F1p11-1000x1000.jpg, 40.24, 37.4);


INSERT INTO CUSTOMER(email, name, street, city, zip_code,)
(johndoe@niu.com, "John Doe", "67 Blinker", "Los Santos", 67676),
(scrummaster@niu.com, "Chris Bolosan", "420 Josh", "Dekalb", 60115);

INSERT INTO ORDERS(order_id, total_weight, status, email, shipping, total_price,
auth_number)
(1, 49.67, "Not ready buddy", johndoe@niu.com, 15, 69, 404),
(2, 84.34, "Ready sir", scrummaster@niu.com, 20, 74.54, 401);
