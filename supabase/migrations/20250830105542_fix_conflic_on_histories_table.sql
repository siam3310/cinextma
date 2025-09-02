drop index if exists "public"."unique_movie_history";

drop index if exists "public"."unique_tv_history";

CREATE UNIQUE INDEX histories_user_id_media_id_media_type_season_episode_key ON public.histories USING btree (user_id, media_id, media_type, season, episode);

alter table "public"."histories" add constraint "histories_user_id_media_id_media_type_season_episode_key" UNIQUE using index "histories_user_id_media_id_media_type_season_episode_key";


