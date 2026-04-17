CREATE TABLE IF NOT EXISTS posts (
  id BIGINT PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  subtitle TEXT,
  content TEXT,
  type TEXT DEFAULT 'Artigo',
  author_id TEXT DEFAULT 'anne',
  category TEXT,
  image TEXT,
  excerpt TEXT,
  tags TEXT,
  refs JSONB DEFAULT '[]',
  date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS services (
  id BIGINT PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT,
  investment TEXT,
  target_audience TEXT,
  type TEXT,
  image TEXT
);

CREATE TABLE IF NOT EXISTS projects (
  id BIGINT PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  status TEXT,
  impact TEXT,
  social_impact TEXT,
  investment TEXT,
  target_audience TEXT,
  image TEXT,
  accent_color TEXT DEFAULT 'pink'
);

CREATE TABLE IF NOT EXISTS paths (
  id BIGINT PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  category TEXT,
  level TEXT,
  workload TEXT,
  has_certificate BOOLEAN DEFAULT TRUE,
  image TEXT,
  modules JSONB DEFAULT '[]'
);

CREATE TABLE IF NOT EXISTS library (
  id BIGINT PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT,
  type TEXT,
  link TEXT,
  file_name TEXT,
  file TEXT,
  image TEXT,
  date DATE
);

CREATE TABLE IF NOT EXISTS team (
  id BIGINT PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT,
  role TEXT,
  image TEXT,
  bio_institucional TEXT,
  bio_author TEXT,
  bio_instructor TEXT,
  date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS subscribers (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  status TEXT DEFAULT 'Ativo'
);

CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS about (
  id BIGINT PRIMARY KEY DEFAULT 1,
  name TEXT DEFAULT 'Anne Dornelas',
  role TEXT DEFAULT 'Administradora',
  image TEXT,
  mission TEXT,
  bio_institucional TEXT,
  bio_author TEXT,
  bio_instructor TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS opportunities (
  id BIGINT PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  org TEXT,
  type TEXT,
  deadline TEXT,
  requirements TEXT,
  description TEXT,
  link TEXT,
  location TEXT,
  area TEXT
);
