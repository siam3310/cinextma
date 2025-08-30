create table public.histories (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  media_id integer not null,
  media_type text not null check (media_type in ('movie','tv')),
  season integer,   -- nullable for movies
  episode integer,  -- nullable for movies
  duration integer not null default 0,
  last_position integer not null default 0,
  completed boolean not null default false,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Indexes to enforce uniqueness
create unique index unique_movie_history
on public.histories (user_id, media_id)
where media_type = 'movie';

create unique index unique_tv_history
on public.histories (user_id, media_id, season, episode)
where media_type = 'tv';

-- Indexing
create index histories_user_updated_idx
on public.histories (user_id, updated_at desc);

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at
before update on public.histories
for each row
execute function public.set_updated_at();

alter table public.histories enable row level security;

-- Policies
create policy "Users can view their own histories"
on public.histories
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));

create policy "Users can insert their own histories"
on public.histories
for insert
to authenticated
with check ((( SELECT auth.uid() AS uid) = user_id));

create policy "Users can update their own histories"
on public.histories
for update
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id))
with check ((( SELECT auth.uid() AS uid) = user_id));

create policy "Users can delete their own histories"
on public.histories
for delete
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));