drop trigger if exists "trigger_profiles_updated_at" on "public"."profiles";

drop policy "Public profiles are viewable by everyone." on "public"."profiles";

drop policy "Users can insert their own profile." on "public"."profiles";

drop policy "Users can update own profile." on "public"."profiles";

drop policy "プロフィールは誰でも参照可能" on "public"."profiles";

drop policy "プロフィールを更新" on "public"."profiles";

revoke delete on table "public"."follows" from "anon";

revoke insert on table "public"."follows" from "anon";

revoke references on table "public"."follows" from "anon";

revoke select on table "public"."follows" from "anon";

revoke trigger on table "public"."follows" from "anon";

revoke truncate on table "public"."follows" from "anon";

revoke update on table "public"."follows" from "anon";

revoke delete on table "public"."follows" from "authenticated";

revoke insert on table "public"."follows" from "authenticated";

revoke references on table "public"."follows" from "authenticated";

revoke select on table "public"."follows" from "authenticated";

revoke trigger on table "public"."follows" from "authenticated";

revoke truncate on table "public"."follows" from "authenticated";

revoke update on table "public"."follows" from "authenticated";

revoke delete on table "public"."follows" from "service_role";

revoke insert on table "public"."follows" from "service_role";

revoke references on table "public"."follows" from "service_role";

revoke select on table "public"."follows" from "service_role";

revoke trigger on table "public"."follows" from "service_role";

revoke truncate on table "public"."follows" from "service_role";

revoke update on table "public"."follows" from "service_role";

revoke delete on table "public"."profiles" from "anon";

revoke insert on table "public"."profiles" from "anon";

revoke references on table "public"."profiles" from "anon";

revoke select on table "public"."profiles" from "anon";

revoke trigger on table "public"."profiles" from "anon";

revoke truncate on table "public"."profiles" from "anon";

revoke update on table "public"."profiles" from "anon";

revoke delete on table "public"."profiles" from "authenticated";

revoke insert on table "public"."profiles" from "authenticated";

revoke references on table "public"."profiles" from "authenticated";

revoke select on table "public"."profiles" from "authenticated";

revoke trigger on table "public"."profiles" from "authenticated";

revoke truncate on table "public"."profiles" from "authenticated";

revoke update on table "public"."profiles" from "authenticated";

revoke delete on table "public"."profiles" from "service_role";

revoke insert on table "public"."profiles" from "service_role";

revoke references on table "public"."profiles" from "service_role";

revoke select on table "public"."profiles" from "service_role";

revoke trigger on table "public"."profiles" from "service_role";

revoke truncate on table "public"."profiles" from "service_role";

revoke update on table "public"."profiles" from "service_role";

alter table "public"."follows" drop constraint "fk_followed";

alter table "public"."follows" drop constraint "fk_follower";

alter table "public"."natures" drop constraint "fk_natures_user";

alter table "public"."profiles" drop constraint "profiles_email_key";

alter table "public"."profiles" drop constraint "profiles_id_fkey";

drop function if exists "public"."handle_new_user"();

drop function if exists "public"."update_profiles_updated_at"();

alter table "public"."follows" drop constraint "pk_follows";

alter table "public"."profiles" drop constraint "profiles_pkey";

drop index if exists "public"."pk_follows";

drop index if exists "public"."profiles_email_key";

drop index if exists "public"."profiles_pkey";

drop table "public"."follows";

drop table "public"."profiles";

alter table "public"."natures" drop column "tags";

alter table "public"."natures" add column "tag" text[];



