drop extension if exists "pg_net";


  create table "public"."profiles" (
    "id" uuid not null,
    "username" text not null,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."profiles" enable row level security;


  create table "public"."watchlist" (
    "user_id" uuid not null,
    "id" integer not null,
    "type" text not null,
    "adult" boolean not null,
    "backdrop_path" text not null,
    "poster_path" text,
    "release_date" date not null,
    "title" text not null,
    "vote_average" numeric(4,1) not null,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."watchlist" enable row level security;

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX profiles_username_key ON public.profiles USING btree (username);

CREATE UNIQUE INDEX watchlist_pkey ON public.watchlist USING btree (user_id, id, type);

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."watchlist" add constraint "watchlist_pkey" PRIMARY KEY using index "watchlist_pkey";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."profiles" add constraint "profiles_username_key" UNIQUE using index "profiles_username_key";

alter table "public"."watchlist" add constraint "watchlist_type_check" CHECK ((type = ANY (ARRAY['movie'::text, 'tv'::text]))) not valid;

alter table "public"."watchlist" validate constraint "watchlist_type_check";

alter table "public"."watchlist" add constraint "watchlist_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."watchlist" validate constraint "watchlist_user_id_fkey";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

grant delete on table "public"."watchlist" to "anon";

grant insert on table "public"."watchlist" to "anon";

grant references on table "public"."watchlist" to "anon";

grant select on table "public"."watchlist" to "anon";

grant trigger on table "public"."watchlist" to "anon";

grant truncate on table "public"."watchlist" to "anon";

grant update on table "public"."watchlist" to "anon";

grant delete on table "public"."watchlist" to "authenticated";

grant insert on table "public"."watchlist" to "authenticated";

grant references on table "public"."watchlist" to "authenticated";

grant select on table "public"."watchlist" to "authenticated";

grant trigger on table "public"."watchlist" to "authenticated";

grant truncate on table "public"."watchlist" to "authenticated";

grant update on table "public"."watchlist" to "authenticated";

grant delete on table "public"."watchlist" to "service_role";

grant insert on table "public"."watchlist" to "service_role";

grant references on table "public"."watchlist" to "service_role";

grant select on table "public"."watchlist" to "service_role";

grant trigger on table "public"."watchlist" to "service_role";

grant truncate on table "public"."watchlist" to "service_role";

grant update on table "public"."watchlist" to "service_role";


  create policy "Enable read access for all users"
  on "public"."profiles"
  as permissive
  for select
  to anon, authenticated
using (true);



  create policy "Users can insert their own profile"
  on "public"."profiles"
  as permissive
  for insert
  to authenticated
with check ((( SELECT auth.uid() AS uid) = id));



  create policy "Users can update their own profile"
  on "public"."profiles"
  as permissive
  for update
  to authenticated
using ((( SELECT auth.uid() AS uid) = id))
with check ((( SELECT auth.uid() AS uid) = id));



  create policy "Users can delete their own watchlist"
  on "public"."watchlist"
  as permissive
  for delete
  to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));



  create policy "Users can insert their own watchlist"
  on "public"."watchlist"
  as permissive
  for insert
  to authenticated
with check ((( SELECT auth.uid() AS uid) = user_id));



  create policy "Users can view their own watchlist"
  on "public"."watchlist"
  as permissive
  for select
  to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));



