-- =====================================================================================
-- NARRATIVA POLÍTICA: ESTRUTURA DO BANCO DE DADOS (SUPABASE)
-- =====================================================================================

-- 1. TABELA DE PERFIS (PROFILES)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  role TEXT CHECK (role IN ('admin', 'aluno')) DEFAULT 'aluno',
  nome_completo TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. TABELA DE CONTEÚDO DO SITE (SITE_CONTENT)
CREATE TABLE site_content (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  secao TEXT NOT NULL, 
  chave TEXT NOT NULL UNIQUE, 
  valor_texto TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. SISTEMA EDITORIAL
CREATE TABLE authors (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nome TEXT NOT NULL,
  bio TEXT,
  foto_url TEXT
);

CREATE TABLE articles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  autor_id UUID REFERENCES authors(id),
  titulo TEXT NOT NULL,
  subtitulo TEXT,
  conteudo TEXT NOT NULL, 
  capa_url TEXT,
  categoria TEXT,
  status TEXT CHECK (status IN ('rascunho', 'publicado')) DEFAULT 'rascunho',
  destaque_home BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. OPORTUNIDADES E SERVIÇOS
CREATE TABLE opportunities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  titulo TEXT NOT NULL,
  tipo TEXT CHECK (tipo IN ('remoto', 'hibrido', 'presencial')),
  localizacao TEXT,
  categoria TEXT,
  link_externo TEXT,
  descricao TEXT,
  status TEXT CHECK (status IN ('aberta', 'encerrada')) DEFAULT 'aberta',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  titulo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  icone TEXT, 
  cor_card TEXT 
);

-- 5. SISTEMA LMS (TRILHAS DE APRENDIZADO)
CREATE TABLE learning_tracks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL, 
  titulo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  horas TEXT,
  nivel TEXT,
  tem_certificado BOOLEAN DEFAULT false,
  status TEXT CHECK (status IN ('GRATUITO', 'PREMIUM')),
  cor_tema TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE modules (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  trilha_id UUID REFERENCES learning_tracks(id) ON DELETE CASCADE,
  ordem INTEGER NOT NULL,
  titulo TEXT NOT NULL
);

CREATE TABLE lessons (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  modulo_id UUID REFERENCES modules(id) ON DELETE CASCADE,
  ordem INTEGER NOT NULL,
  titulo TEXT NOT NULL,
  video_url TEXT,
  pdf_url TEXT,
  descricao_texto TEXT,
  tipo TEXT CHECK (tipo IN ('video', 'texto', 'pratica', 'pdf')) DEFAULT 'video'
);

CREATE TABLE user_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  concluido BOOLEAN DEFAULT false,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, lesson_id)
);

-- 6. BIBLIOTECA
CREATE TABLE library (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  titulo TEXT NOT NULL,
  descricao TEXT,
  categoria TEXT, 
  link_download TEXT,
  fonte TEXT,
  capa_url TEXT
);

-- 7. NEWSLETTER E INSCRITOS
CREATE TABLE newsletters (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  titulo TEXT NOT NULL,
  descricao TEXT,
  conteudo TEXT NOT NULL,
  capa_url TEXT,
  tag TEXT,
  enviado_em TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE subscribers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  nome TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =====================================================================================
-- SEGURANÇA (RLS)
-- =====================================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE library ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletters ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS SELECT PÚBLICO
CREATE POLICY "Public Select" ON site_content FOR SELECT USING (true);
CREATE POLICY "Public Select Artigos" ON articles FOR SELECT USING (status = 'publicado');
CREATE POLICY "Public Select Ops" ON opportunities FOR SELECT USING (status = 'aberta');
CREATE POLICY "Public Select Serv" ON services FOR SELECT USING (true);
CREATE POLICY "Public Select Tracks" ON learning_tracks FOR SELECT USING (true);
CREATE POLICY "Public Select Lib" ON library FOR SELECT USING (true);
CREATE POLICY "Public Select Newsletters" ON newsletters FOR SELECT USING (true);
CREATE POLICY "Public Insert Subscribers" ON subscribers FOR INSERT WITH CHECK (true);

-- ADMIN PERMISSÃO TOTAL
CREATE OR REPLACE FUNCTION is_admin() RETURNS BOOLEAN AS $$
  SELECT EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin');
$$ LANGUAGE sql SECURITY DEFINER;

CREATE POLICY "Admin Full Access" ON profiles FOR ALL USING (is_admin());
CREATE POLICY "Admin Full Access Content" ON site_content FOR ALL USING (is_admin());
CREATE POLICY "Admin Full Access Art" ON articles FOR ALL USING (is_admin());
CREATE POLICY "Admin Full Access Ops" ON opportunities FOR ALL USING (is_admin());
CREATE POLICY "Admin Full Access Serv" ON services FOR ALL USING (is_admin());
CREATE POLICY "Admin Full Access Tracks" ON learning_tracks FOR ALL USING (is_admin());
CREATE POLICY "Admin Full Access Modules" ON modules FOR ALL USING (is_admin());
CREATE POLICY "Admin Full Access Lessons" ON lessons FOR ALL USING (is_admin());
CREATE POLICY "Admin Full Access Lib" ON library FOR ALL USING (is_admin());
CREATE POLICY "Admin Full Access News" ON newsletters FOR ALL USING (is_admin());
CREATE POLICY "Admin Full Access Subs" ON subscribers FOR ALL USING (is_admin());
