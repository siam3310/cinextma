alter table "public"."histories" alter column "duration" set data type double precision using "duration"::double precision;

alter table "public"."histories" alter column "episode" set default 0;

alter table "public"."histories" alter column "episode" set not null;

alter table "public"."histories" alter column "last_position" set data type double precision using "last_position"::double precision;

alter table "public"."histories" alter column "season" set default 0;

alter table "public"."histories" alter column "season" set not null;


