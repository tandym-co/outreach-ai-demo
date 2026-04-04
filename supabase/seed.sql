-- Repeatable seed — truncate first
truncate messages restart identity cascade;
truncate prospects restart identity cascade;
delete from persona where id = 1;

-- Prospects
insert into prospects (id, name, company, linkedin_url, status, last_contacted) values
  ('a1000000-0000-0000-0000-000000000001', 'Sarah Chen',    'Acme Corp',  'https://linkedin.com/in/sarah-chen',    'replied',   '2026-03-28'),
  ('a1000000-0000-0000-0000-000000000002', 'James Park',    'Notion',     'https://linkedin.com/in/james-park',    'no_reply',  '2026-03-20'),
  ('a1000000-0000-0000-0000-000000000003', 'Priya Nair',    'Stripe',     'https://linkedin.com/in/priya-nair',    'pending',   null),
  ('a1000000-0000-0000-0000-000000000004', 'Marco Rossi',   'Figma',      'https://linkedin.com/in/marco-rossi',   'replied',   '2026-03-30'),
  ('a1000000-0000-0000-0000-000000000005', 'Alex Thompson', 'Linear',     'https://linkedin.com/in/alex-thompson', 'no_reply',  '2026-03-18'),
  ('a1000000-0000-0000-0000-000000000006', 'Yuki Tanaka',   'Vercel',     'https://linkedin.com/in/yuki-tanaka',   'pending',   null),
  ('a1000000-0000-0000-0000-000000000007', 'Rachel Kim',    'Anthropic',  'https://linkedin.com/in/rachel-kim',    'replied',   '2026-04-01'),
  ('a1000000-0000-0000-0000-000000000008', 'David Osei',    'Loom',       'https://linkedin.com/in/david-osei',    'no_reply',  '2026-03-15'),
  ('a1000000-0000-0000-0000-000000000009', 'Maria Santos',  'Intercom',   'https://linkedin.com/in/maria-santos',  'pending',   null),
  ('a1000000-0000-0000-0000-000000000010', 'Tom Nguyen',    'HubSpot',    'https://linkedin.com/in/tom-nguyen',    'replied',   '2026-03-29');

-- Messages
insert into messages (prospect_id, direction, body, sent_at) values
  -- Sarah Chen (replied)
  ('a1000000-0000-0000-0000-000000000001', 'outbound', 'Hi Sarah, I noticed your work at Acme Corp — would love to connect about how we help ops teams move faster.', '2026-03-27 09:00:00'),
  ('a1000000-0000-0000-0000-000000000001', 'inbound',  'Thanks for reaching out! Happy to chat next week. What times work for you?', '2026-03-28 14:22:00'),
  -- James Park (no_reply)
  ('a1000000-0000-0000-0000-000000000002', 'outbound', 'Hey James, big fan of what Notion is building. Curious if you''d be open to a 15-min chat about workflow automation?', '2026-03-20 10:00:00'),
  -- Marco Rossi (replied)
  ('a1000000-0000-0000-0000-000000000004', 'outbound', 'Hi Marco, your recent post on design systems really resonated. We help product teams like Figma''s customers ship faster — worth a quick chat?', '2026-03-29 08:30:00'),
  ('a1000000-0000-0000-0000-000000000004', 'inbound',  'Hey! Yes, definitely interested. Can we do Thursday?', '2026-03-30 11:05:00'),
  -- Alex Thompson (no_reply)
  ('a1000000-0000-0000-0000-000000000005', 'outbound', 'Hi Alex, Linear''s velocity is impressive — we work with fast-moving eng teams. Would love 15 mins.', '2026-03-18 09:00:00'),
  -- Rachel Kim (replied)
  ('a1000000-0000-0000-0000-000000000007', 'outbound', 'Rachel, the work coming out of Anthropic is incredible. I''d love to explore if there''s a fit on the go-to-market side.', '2026-03-31 09:15:00'),
  ('a1000000-0000-0000-0000-000000000007', 'inbound',  'Appreciate it! Send me more details and I''ll loop in the right person.', '2026-04-01 16:40:00'),
  -- David Osei (no_reply)
  ('a1000000-0000-0000-0000-000000000008', 'outbound', 'David, saw your talk on async communication — very aligned with what we''re building. Coffee chat?', '2026-03-15 10:30:00'),
  -- Tom Nguyen (replied)
  ('a1000000-0000-0000-0000-000000000010', 'outbound', 'Tom, HubSpot''s ecosystem is exactly the space we play in. Can we connect?', '2026-03-28 08:00:00'),
  ('a1000000-0000-0000-0000-000000000010', 'inbound',  'Sure! I''m heads down this week but ping me Monday.', '2026-03-29 17:30:00');

-- Persona
insert into persona (id, description)
values (1, 'Friendly and concise B2B sales rep who focuses on value, not features');
