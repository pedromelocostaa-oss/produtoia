
CREATE TABLE public.diagnostics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  area TEXT NOT NULL,
  setor TEXT NOT NULL,
  cargo TEXT NOT NULL,
  tamanho TEXT NOT NULL,
  descricao TEXT NOT NULL,
  resultado TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.diagnostics ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (no login required)
CREATE POLICY "Anyone can create a diagnostic"
  ON public.diagnostics
  FOR INSERT
  WITH CHECK (true);

-- No public SELECT - data is only accessible via direct DB access for analysis
CREATE POLICY "No public read access"
  ON public.diagnostics
  FOR SELECT
  USING (false);
