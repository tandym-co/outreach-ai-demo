-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Prospects
create table if not exists prospects (
  id            uuid primary key default uuid_generate_v4(),
  name          text not null,
  company       text not null,
  linkedin_url  text,
  status        text not null default 'pending'
                  check (status in ('pending', 'replied', 'no_reply')),
  last_contacted date,
  created_at    timestamptz default now()
);

-- Messages
create table if not exists messages (
  id           uuid primary key default uuid_generate_v4(),
  prospect_id  uuid references prospects(id) on delete cascade,
  direction    text not null check (direction in ('outbound', 'inbound')),
  body         text not null,
  sent_at      timestamptz default now()
);

-- Persona (single-row settings table)
create table if not exists persona (
  id          int primary key default 1,
  description text not null default 'Professional B2B sales rep',
  updated_at  timestamptz default now(),
  check (id = 1)
);

-- Seed the default persona row
insert into persona (id, description)
values (1, 'Professional B2B sales rep')
on conflict (id) do nothing;
