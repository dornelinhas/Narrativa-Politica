-- script_update_opportunities.sql
-- Adiciona colunas que podem estar faltando na tabela opportunities

DO $$ 
BEGIN 
  -- Título já deve existir, mas garantimos
  IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='opportunities' AND COLUMN_NAME='title') THEN
    ALTER TABLE opportunities ADD COLUMN title TEXT;
  END IF;

  -- Coluna category
  IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='opportunities' AND COLUMN_NAME='category') THEN
    ALTER TABLE opportunities ADD COLUMN category TEXT;
  END IF;

  -- Coluna type
  IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='opportunities' AND COLUMN_NAME='type') THEN
    ALTER TABLE opportunities ADD COLUMN type TEXT;
  END IF;

  -- Coluna location
  IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='opportunities' AND COLUMN_NAME='location') THEN
    ALTER TABLE opportunities ADD COLUMN location TEXT;
  END IF;

  -- Coluna deadline
  IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='opportunities' AND COLUMN_NAME='deadline') THEN
    ALTER TABLE opportunities ADD COLUMN deadline TEXT;
  END IF;

  -- Coluna link
  IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='opportunities' AND COLUMN_NAME='link') THEN
    ALTER TABLE opportunities ADD COLUMN link TEXT;
  END IF;

  -- Coluna description
  IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='opportunities' AND COLUMN_NAME='description') THEN
    ALTER TABLE opportunities ADD COLUMN description TEXT;
  END IF;

  -- Coluna fullDescription
  IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='opportunities' AND COLUMN_NAME='fullDescription') THEN
    ALTER TABLE opportunities ADD COLUMN "fullDescription" TEXT;
  END IF;

  -- Coluna image
  IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='opportunities' AND COLUMN_NAME='image') THEN
    ALTER TABLE opportunities ADD COLUMN image TEXT;
  END IF;

  -- Coluna status (Ajustamos para aceitar os novos estados)
  -- Primeiro removemos a restrição antiga se existir
  ALTER TABLE opportunities DROP CONSTRAINT IF EXISTS opportunities_status_check;
  -- Adicionamos a nova restrição
  ALTER TABLE opportunities ADD CONSTRAINT opportunities_status_check CHECK (status IN ('approved', 'pending', 'rejected', 'closed', 'expired'));

  -- Coluna sourceUrl
  IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='opportunities' AND COLUMN_NAME='sourceUrl') THEN
    ALTER TABLE opportunities ADD COLUMN "sourceUrl" TEXT;
  END IF;

  -- Coluna reviewNotes
  IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='opportunities' AND COLUMN_NAME='reviewNotes') THEN
    ALTER TABLE opportunities ADD COLUMN "reviewNotes" TEXT;
  END IF;

  -- Coluna featured
  IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='opportunities' AND COLUMN_NAME='featured') THEN
    ALTER TABLE opportunities ADD COLUMN featured BOOLEAN DEFAULT false;
  END IF;

  -- Coluna showOnHome
  IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='opportunities' AND COLUMN_NAME='showOnHome') THEN
    ALTER TABLE opportunities ADD COLUMN "showOnHome" BOOLEAN DEFAULT false;
  END IF;

END $$;
