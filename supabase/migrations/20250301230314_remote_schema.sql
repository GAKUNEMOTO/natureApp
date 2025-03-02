create table "public"."follows" (
    "follower_id" uuid not null,
    "followed_id" uuid not null,
    "created_at" timestamp with time zone default now()
);


create table "public"."profiles" (
    "id" uuid not null,
    "full_name" text,
    "email" text,
    "avatar_url" text,
    "bio" text,
    "favorite_places" text[],
    "favorite_seasons" text[],
    "instagram_url" text,
    "twitter_url" text,
    "facebook_url" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


alter table "public"."profiles" enable row level security;

alter table "public"."natures" drop column "tag";

alter table "public"."natures" add column "tags" text[];

CREATE UNIQUE INDEX pk_follows ON public.follows USING btree (follower_id, followed_id);

CREATE UNIQUE INDEX profiles_email_key ON public.profiles USING btree (email);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

alter table "public"."follows" add constraint "pk_follows" PRIMARY KEY using index "pk_follows";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."follows" add constraint "fk_followed" FOREIGN KEY (followed_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."follows" validate constraint "fk_followed";

alter table "public"."follows" add constraint "fk_follower" FOREIGN KEY (follower_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."follows" validate constraint "fk_follower";

alter table "public"."natures" add constraint "fk_natures_user" FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."natures" validate constraint "fk_natures_user";

alter table "public"."profiles" add constraint "profiles_email_key" UNIQUE using index "profiles_email_key";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  -- 必要に応じてロジックを変更
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.email);
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_profiles_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$
;

grant delete on table "public"."follows" to "anon";

grant insert on table "public"."follows" to "anon";

grant references on table "public"."follows" to "anon";

grant select on table "public"."follows" to "anon";

grant trigger on table "public"."follows" to "anon";

grant truncate on table "public"."follows" to "anon";

grant update on table "public"."follows" to "anon";

grant delete on table "public"."follows" to "authenticated";

grant insert on table "public"."follows" to "authenticated";

grant references on table "public"."follows" to "authenticated";

grant select on table "public"."follows" to "authenticated";

grant trigger on table "public"."follows" to "authenticated";

grant truncate on table "public"."follows" to "authenticated";

grant update on table "public"."follows" to "authenticated";

grant delete on table "public"."follows" to "service_role";

grant insert on table "public"."follows" to "service_role";

grant references on table "public"."follows" to "service_role";

grant select on table "public"."follows" to "service_role";

grant trigger on table "public"."follows" to "service_role";

grant truncate on table "public"."follows" to "service_role";

grant update on table "public"."follows" to "service_role";

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

create policy "Public profiles are viewable by everyone."
on "public"."profiles"
as permissive
for select
to public
using (true);


create policy "Users can insert their own profile."
on "public"."profiles"
as permissive
for insert
to public
with check ((auth.uid() = id));


create policy "Users can update own profile."
on "public"."profiles"
as permissive
for update
to public
using ((auth.uid() = id));


create policy "プロフィールは誰でも参照可能"
on "public"."profiles"
as permissive
for select
to public
using (true);


create policy "プロフィールを更新"
on "public"."profiles"
as permissive
for update
to public
using (true);


CREATE TRIGGER trigger_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_profiles_updated_at();


