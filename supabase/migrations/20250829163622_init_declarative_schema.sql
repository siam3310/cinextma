create extension if not exists "pg_net" with schema "extensions";


create sequence "public"."histories_id_seq";

create table "public"."histories" (
    "id" bigint not null default nextval('histories_id_seq'::regclass),
    "user_id" uuid not null,
    "media_id" integer not null,
    "media_type" text not null,
    "progress" integer not null default 0,
    "watched_at" timestamp with time zone not null default now()
);


alter table "public"."histories" enable row level security;

alter sequence "public"."histories_id_seq" owned by "public"."histories"."id";

CREATE UNIQUE INDEX histories_pkey ON public.histories USING btree (id);

alter table "public"."histories" add constraint "histories_pkey" PRIMARY KEY using index "histories_pkey";

alter table "public"."histories" add constraint "histories_media_type_check" CHECK ((media_type = ANY (ARRAY['movie'::text, 'tv'::text]))) not valid;

alter table "public"."histories" validate constraint "histories_media_type_check";

alter table "public"."histories" add constraint "histories_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."histories" validate constraint "histories_user_id_fkey";

grant delete on table "public"."histories" to "anon";

grant insert on table "public"."histories" to "anon";

grant references on table "public"."histories" to "anon";

grant select on table "public"."histories" to "anon";

grant trigger on table "public"."histories" to "anon";

grant truncate on table "public"."histories" to "anon";

grant update on table "public"."histories" to "anon";

grant delete on table "public"."histories" to "authenticated";

grant insert on table "public"."histories" to "authenticated";

grant references on table "public"."histories" to "authenticated";

grant select on table "public"."histories" to "authenticated";

grant trigger on table "public"."histories" to "authenticated";

grant truncate on table "public"."histories" to "authenticated";

grant update on table "public"."histories" to "authenticated";

grant delete on table "public"."histories" to "service_role";

grant insert on table "public"."histories" to "service_role";

grant references on table "public"."histories" to "service_role";

grant select on table "public"."histories" to "service_role";

grant trigger on table "public"."histories" to "service_role";

grant truncate on table "public"."histories" to "service_role";

grant update on table "public"."histories" to "service_role";

create policy "Users can delete their own histories"
on "public"."histories"
as permissive
for delete
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "Users can insert their own histories"
on "public"."histories"
as permissive
for insert
to authenticated
with check ((( SELECT auth.uid() AS uid) = user_id));


create policy "Users can update their own histories"
on "public"."histories"
as permissive
for update
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id))
with check ((( SELECT auth.uid() AS uid) = user_id));


create policy "Users can view their own histories"
on "public"."histories"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));



