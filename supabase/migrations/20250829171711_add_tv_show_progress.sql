alter table "public"."histories" drop column "progress";

alter table "public"."histories" drop column "watched_at";

alter table "public"."histories" add column "completed" boolean not null default false;

alter table "public"."histories" add column "created_at" timestamp with time zone not null default now();

alter table "public"."histories" add column "duration" integer not null default 0;

alter table "public"."histories" add column "episode" integer;

alter table "public"."histories" add column "last_position" integer not null default 0;

alter table "public"."histories" add column "season" integer;

alter table "public"."histories" add column "updated_at" timestamp with time zone not null default now();

CREATE INDEX histories_user_updated_idx ON public.histories USING btree (user_id, updated_at DESC);

CREATE UNIQUE INDEX unique_movie_history ON public.histories USING btree (user_id, media_id) WHERE (media_type = 'movie'::text);

CREATE UNIQUE INDEX unique_tv_history ON public.histories USING btree (user_id, media_id, season, episode) WHERE (media_type = 'tv'::text);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.set_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  new.updated_at = now();
  return new;
end;
$function$
;

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.histories FOR EACH ROW EXECUTE FUNCTION set_updated_at();


