alter table "public"."histories" drop constraint "histories_media_type_check";

alter table "public"."histories" drop constraint "histories_user_id_media_id_media_type_season_episode_key";

drop index if exists "public"."histories_user_id_media_id_media_type_season_episode_key";

alter table "public"."histories" drop column "media_type";

alter table "public"."histories" add column "adult" boolean not null;

alter table "public"."histories" add column "backdrop_path" text;

alter table "public"."histories" add column "poster_path" text;

alter table "public"."histories" add column "release_date" date not null;

alter table "public"."histories" add column "title" text not null;

alter table "public"."histories" add column "type" text not null;

alter table "public"."histories" add column "vote_average" numeric(4,1) not null;

alter table "public"."histories" alter column "id" drop default;

alter table "public"."histories" alter column "id" set data type integer using "id"::integer;

alter table "public"."watchlist" alter column "backdrop_path" drop not null;

drop sequence if exists "public"."histories_id_seq";

CREATE UNIQUE INDEX histories_user_id_media_id_type_season_episode_key ON public.histories USING btree (user_id, media_id, type, season, episode);

alter table "public"."histories" add constraint "histories_type_check" CHECK ((type = ANY (ARRAY['movie'::text, 'tv'::text]))) not valid;

alter table "public"."histories" validate constraint "histories_type_check";

alter table "public"."histories" add constraint "histories_user_id_media_id_type_season_episode_key" UNIQUE using index "histories_user_id_media_id_type_season_episode_key";


