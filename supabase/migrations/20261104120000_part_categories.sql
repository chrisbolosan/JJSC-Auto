create table public.part_categories (
  part_number integer primary key,
  category text not null
);

alter table public.part_categories enable row level security;
