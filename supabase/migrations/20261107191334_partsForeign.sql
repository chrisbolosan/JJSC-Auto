ALTER TABLE public.order_items
ADD CONSTRAINT part_number_fkey
FOREIGN KEY (part_number)
references public.parts (number)
ON DELETE CASCADE;