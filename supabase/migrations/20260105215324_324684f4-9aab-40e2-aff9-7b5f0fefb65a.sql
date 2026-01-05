-- Content tables for dynamic site management (user_roles policies already partially exist)

-- Ensure RLS is enabled on user_roles and add only the admin management policy if missing
alter table public.user_roles enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'user_roles'
      and policyname = 'Admins manage roles'
  ) then
    create policy "Admins manage roles"
      on public.user_roles
      for all
      to authenticated
      using (public.has_role(auth.uid(), 'admin'))
      with check (public.has_role(auth.uid(), 'admin'));
  end if;
end $$;

-- Content tables
create table if not exists public.home_hero (
  id uuid primary key default gen_random_uuid(),
  title text,
  subtitle text,
  cta_text text,
  background_image_url text,
  scroll_label text,
  updated_at timestamptz not null default now()
);

alter table public.home_hero enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'home_hero' and policyname = 'Public read home_hero'
  ) then
    create policy "Public read home_hero"
      on public.home_hero
      for select
      using (true);
  end if;
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'home_hero' and policyname = 'Admins full access home_hero'
  ) then
    create policy "Admins full access home_hero"
      on public.home_hero
      for all
      to authenticated
      using (public.has_role(auth.uid(), 'admin'))
      with check (public.has_role(auth.uid(), 'admin'));
  end if;
end $$;

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  "order" int default 0,
  icon_name text,
  updated_at timestamptz not null default now()
);

alter table public.services enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'services' and policyname = 'Public read services'
  ) then
    create policy "Public read services"
      on public.services
      for select
      using (true);
  end if;
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'services' and policyname = 'Admins full access services'
  ) then
    create policy "Admins full access services"
      on public.services
      for all
      to authenticated
      using (public.has_role(auth.uid(), 'admin'))
      with check (public.has_role(auth.uid(), 'admin'));
  end if;
end $$;

create table if not exists public.about_sections (
  id uuid primary key default gen_random_uuid(),
  section_key text not null unique,
  title text,
  body text,
  updated_at timestamptz not null default now()
);

alter table public.about_sections enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'about_sections' and policyname = 'Public read about_sections'
  ) then
    create policy "Public read about_sections"
      on public.about_sections
      for select
      using (true);
  end if;
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'about_sections' and policyname = 'Admins full access about_sections'
  ) then
    create policy "Admins full access about_sections"
      on public.about_sections
      for all
      to authenticated
      using (public.has_role(auth.uid(), 'admin'))
      with check (public.has_role(auth.uid(), 'admin'));
  end if;
end $$;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  location text,
  category text,
  description text,
  area text,
  year text,
  thumbnail_url text,
  highlight boolean not null default false,
  updated_at timestamptz not null default now()
);

alter table public.projects enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'projects' and policyname = 'Public read projects'
  ) then
    create policy "Public read projects"
      on public.projects
      for select
      using (true);
  end if;
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'projects' and policyname = 'Admins full access projects'
  ) then
    create policy "Admins full access projects"
      on public.projects
      for all
      to authenticated
      using (public.has_role(auth.uid(), 'admin'))
      with check (public.has_role(auth.uid(), 'admin'));
  end if;
end $$;

create table if not exists public.contact_info (
  id uuid primary key default gen_random_uuid(),
  email text,
  phone text,
  studio_address text,
  follow_text text,
  intro_title text,
  intro_description text,
  updated_at timestamptz not null default now()
);

alter table public.contact_info enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'contact_info' and policyname = 'Public read contact_info'
  ) then
    create policy "Public read contact_info"
      on public.contact_info
      for select
      using (true);
  end if;
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'contact_info' and policyname = 'Admins full access contact_info'
  ) then
    create policy "Admins full access contact_info"
      on public.contact_info
      for all
      to authenticated
      using (public.has_role(auth.uid(), 'admin'))
      with check (public.has_role(auth.uid(), 'admin'));
  end if;
end $$;

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text,
  content text,
  category text,
  cover_image_url text,
  author_name text,
  published_at timestamptz,
  read_time text,
  is_published boolean not null default false,
  updated_at timestamptz not null default now()
);

alter table public.blog_posts enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'blog_posts' and policyname = 'Public read published blog_posts'
  ) then
    create policy "Public read published blog_posts"
      on public.blog_posts
      for select
      using (is_published = true);
  end if;
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'blog_posts' and policyname = 'Admins full access blog_posts'
  ) then
    create policy "Admins full access blog_posts"
      on public.blog_posts
      for all
      to authenticated
      using (public.has_role(auth.uid(), 'admin'))
      with check (public.has_role(auth.uid(), 'admin'));
  end if;
end $$;

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  site_name text,
  footer_text text,
  show_admin_link boolean not null default true,
  admin_link_label text not null default 'Admin',
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'site_settings' and policyname = 'Public read site_settings'
  ) then
    create policy "Public read site_settings"
      on public.site_settings
      for select
      using (true);
  end if;
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'site_settings' and policyname = 'Admins full access site_settings'
  ) then
    create policy "Admins full access site_settings"
      on public.site_settings
      for all
      to authenticated
      using (public.has_role(auth.uid(), 'admin'))
      with check (public.has_role(auth.uid(), 'admin'));
  end if;
end $$;

-- Storage bucket for public site assets
insert into storage.buckets (id, name, public)
values ('public-assets', 'public-assets', true)
on conflict (id) do nothing;

-- RLS policies for storage.objects affecting the public-assets bucket
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Public read public-assets'
  ) THEN
    create policy "Public read public-assets"
      on storage.objects
      for select
      using (bucket_id = 'public-assets');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Admins upload to public-assets'
  ) THEN
    create policy "Admins upload to public-assets"
      on storage.objects
      for insert
      to authenticated
      with check (bucket_id = 'public-assets' and public.has_role(auth.uid(), 'admin'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Admins update public-assets'
  ) THEN
    create policy "Admins update public-assets"
      on storage.objects
      for update
      to authenticated
      using (bucket_id = 'public-assets' and public.has_role(auth.uid(), 'admin'))
      with check (bucket_id = 'public-assets' and public.has_role(auth.uid(), 'admin'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Admins delete public-assets'
  ) THEN
    create policy "Admins delete public-assets"
      on storage.objects
      for delete
      to authenticated
      using (bucket_id = 'public-assets' and public.has_role(auth.uid(), 'admin'));
  END IF;
END $$;