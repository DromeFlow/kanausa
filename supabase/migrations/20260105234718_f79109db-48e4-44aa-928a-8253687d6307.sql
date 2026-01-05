-- Add global social links to site_settings
ALTER TABLE public.site_settings
ADD COLUMN IF NOT EXISTS instagram_url text,
ADD COLUMN IF NOT EXISTS linkedin_url text,
ADD COLUMN IF NOT EXISTS behance_url text;