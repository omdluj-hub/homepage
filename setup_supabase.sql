create table if not exists visits (
  id uuid default gen_random_uuid() primary key,
  path text,
  referer text,
  user_agent text,
  is_bot boolean,
  ip text,
  created_at timestamp with time zone default now()
);

create table if not exists inquiries (
  id uuid default gen_random_uuid() primary key,
  name text,
  phone text,
  category text,
  message text,
  created_at timestamp with time zone default now()
);

alter table visits enable row level security;
create policy "visits_insert_policy" on visits for insert with check (true);
create policy "visits_select_policy" on visits for select using (true);

alter table inquiries enable row level security;
create policy "inquiries_insert_policy" on inquiries for insert with check (true);
create policy "inquiries_select_policy" on inquiries for select using (true);
