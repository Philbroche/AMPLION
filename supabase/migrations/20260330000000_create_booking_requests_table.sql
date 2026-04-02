create table booking_requests (
  id uuid default gen_random_uuid() primary key,
  service text not null,
  project_description text not null,
  submitted_at timestamptz default now()
);

alter table booking_requests enable row level security;

create policy "Allow anonymous inserts"
on booking_requests for insert
to anon
with check (true);
