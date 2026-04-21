import { useState, useEffect, useRef } from 'react';
import { Users, Plus, Search, ExternalLink, MessageCircle, X, Upload, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

/* ── Types ── */

interface Case {
  id: string;
  created_at: string;
  author_name: string;
  author_role: string | null;
  author_company: string | null;
  show_profile: boolean;
  title: string;
  what_built: string;
  tool_used: string;
  area: string;
  description: string;
  result: string | null;
  image_url: string | null;
  external_link: string | null;
  comment_count?: number;
}

interface Comment {
  id: string;
  created_at: string;
  author_name: string;
  content: string;
}

/* ── Constants ── */

const TOOLS = ['Todos', 'ChatGPT', 'Claude', 'Gemini', 'Lovable', 'n8n', 'Outros'];
const AREAS = ['Todos', 'Marketing', 'Vendas', 'RH', 'Operações', 'Jurídico', 'Financeiro', 'Produto'];
const TOOL_OPTIONS = ['ChatGPT', 'Claude', 'Gemini', 'Lovable', 'n8n', 'Perplexity', 'NotebookLM', 'Cursor', 'Outra'];
const AREA_OPTIONS = [
  'Marketing/Social Media', 'Vendas', 'Customer Success', 'RH',
  'Operações', 'Jurídico', 'Financeiro', 'Produto/Tech', 'Outra',
];
const TOOL_COLORS: Record<string, string> = {
  ChatGPT: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  Claude: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  Gemini: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Lovable: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  n8n: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

/* ── Main Component ── */

export default function Community() {
  const { user } = useAuth();
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterTool, setFilterTool] = useState('Todos');
  const [filterArea, setFilterArea] = useState('Todos');
  const [search, setSearch] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  useEffect(() => {
    fetchCases();
  }, []);

  async function fetchCases() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cases')
        .select('*')
        .eq('is_visible', true)
        .order('created_at', { ascending: false });
      if (error) throw error;

      const ids = (data || []).map((c) => c.id);
      const counts: Record<string, number> = {};
      if (ids.length > 0) {
        const { data: cd } = await supabase
          .from('comments')
          .select('case_id')
          .in('case_id', ids)
          .eq('is_visible', true);
        (cd || []).forEach((c) => {
          counts[c.case_id] = (counts[c.case_id] || 0) + 1;
        });
      }
      setCases((data || []).map((c) => ({ ...c, comment_count: counts[c.id] || 0 })));
    } catch {
      toast.error('Erro ao carregar cases. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  const filtered = cases.filter((c) => {
    const toolMatch =
      filterTool === 'Todos' ||
      c.tool_used === filterTool ||
      (filterTool === 'Outros' && !TOOLS.slice(1, -1).includes(c.tool_used));
    const areaMatch =
      filterArea === 'Todos' || c.area.toLowerCase().includes(filterArea.toLowerCase());
    const searchMatch =
      !search ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.author_name.toLowerCase().includes(search.toLowerCase());
    return toolMatch && areaMatch && searchMatch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                Comunidade Virada IA
              </h1>
            </div>
            <p className="text-muted-foreground max-w-xl">
              Veja o que outros profissionais já construíram com IA — e compartilhe o seu também.
            </p>
          </div>
          <Button onClick={() => setCreateOpen(true)} size="lg" className="shrink-0">
            <Plus className="w-4 h-4 mr-2" />
            Compartilhar o que construí →
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-3 animate-fade-in">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-semibold text-muted-foreground">Ferramenta:</span>
          {TOOLS.map((t) => (
            <button
              key={t}
              onClick={() => setFilterTool(t)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${
                filterTool === t
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card text-muted-foreground border-border hover:border-primary/30 hover:text-foreground'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-semibold text-muted-foreground">Área:</span>
          {AREAS.map((a) => (
            <button
              key={a}
              onClick={() => setFilterArea(a)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${
                filterArea === a
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card text-muted-foreground border-border hover:border-primary/30 hover:text-foreground'
              }`}
            >
              {a}
            </button>
          ))}
        </div>
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar cases..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <CaseSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground font-medium">
            {cases.length === 0
              ? 'Ainda não há cases aqui. Seja o primeiro a compartilhar o que construiu.'
              : 'Nenhum case encontrado com esses filtros.'}
          </p>
          {cases.length === 0 && (
            <Button variant="outline" className="mt-4" onClick={() => setCreateOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Compartilhar o que construí
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <CaseCard key={c.id} caseItem={c} onClick={() => setSelectedCase(c)} />
          ))}
        </div>
      )}

      <CreateCaseModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSuccess={() => {
          setCreateOpen(false);
          fetchCases();
        }}
        defaultName={user?.user_metadata?.full_name ?? ""}
        defaultEmail={user?.email ?? ""}
      />
      {selectedCase && (
        <CaseDetailModal caseItem={selectedCase} onClose={() => setSelectedCase(null)} />
      )}
    </div>
  );
}

/* ── CaseSkeleton ── */

function CaseSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <Skeleton className="h-40 w-full rounded-none" />
      <div className="p-4 space-y-2">
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex items-center justify-between pt-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}

/* ── CaseCard ── */

function CaseCard({ caseItem: c, onClick }: { caseItem: Case; onClick: () => void }) {
  const toolColor = TOOL_COLORS[c.tool_used] || 'bg-muted text-muted-foreground';
  const excerpt = c.description.length > 120 ? c.description.slice(0, 120) + '...' : c.description;

  return (
    <button
      onClick={onClick}
      className="text-left rounded-xl border border-border bg-card overflow-hidden hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-200 group"
    >
      {c.image_url && (
        <div className="h-40 overflow-hidden bg-muted">
          <img
            src={c.image_url}
            alt={c.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex flex-wrap gap-1.5 mb-2">
          <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${toolColor}`}>
            {c.tool_used}
          </span>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-muted text-muted-foreground">
            {c.area}
          </span>
        </div>
        <h3 className="font-semibold text-foreground text-sm mb-1.5 line-clamp-2">{c.title}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed mb-2">{excerpt}</p>
        {c.result && (
          <div className="mb-2 px-2.5 py-1.5 rounded-lg bg-primary/5 border border-primary/10">
            <p className="text-xs text-primary font-medium line-clamp-2">{c.result}</p>
          </div>
        )}
        <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1 border-t border-border">
          <div className="truncate">
            <span className="font-medium text-foreground">{c.author_name}</span>
            {c.show_profile && c.author_role && (
              <span>
                {' '}· {c.author_role}
                {c.author_company ? ` @ ${c.author_company}` : ''}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-2">
            <span>{formatRelative(c.created_at)}</span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />
              {c.comment_count ?? 0}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

/* ── CreateCaseModal ── */

interface CreateForm {
  author_name: string;
  author_email: string;
  author_role: string;
  author_company: string;
  show_profile: boolean;
  title: string;
  what_built: string;
  tool_used: string;
  area: string;
  description: string;
  result: string;
  external_link: string;
}

const EMPTY_FORM: CreateForm = {
  author_name: '',
  author_email: '',
  author_role: '',
  author_company: '',
  show_profile: false,
  title: '',
  what_built: '',
  tool_used: '',
  area: '',
  description: '',
  result: '',
  external_link: '',
};

function CreateCaseModal({
  open,
  onClose,
  onSuccess,
  defaultName = "",
  defaultEmail = "",
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  defaultName?: string;
  defaultEmail?: string;
}) {
  const [form, setForm] = useState<CreateForm>({ ...EMPTY_FORM, author_name: defaultName, author_email: defaultEmail });
  const [errors, setErrors] = useState<Partial<Record<keyof CreateForm, string>>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function set(field: keyof CreateForm, value: string | boolean) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error('A imagem deve ter no máximo 5MB.');
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function validate(): boolean {
    const newErrors: Partial<Record<keyof CreateForm, string>> = {};
    if (!form.author_name.trim()) newErrors.author_name = 'Nome obrigatório';
    if (!form.title.trim()) newErrors.title = 'Título obrigatório';
    if (!form.what_built.trim()) newErrors.what_built = 'Campo obrigatório';
    if (!form.tool_used) newErrors.tool_used = 'Selecione uma ferramenta';
    if (!form.area) newErrors.area = 'Selecione uma área';
    if (!form.description.trim()) newErrors.description = 'Descrição obrigatória';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    setLoading(true);
    try {
      let image_url: string | null = null;
      if (imageFile) {
        const ext = imageFile.name.split('.').pop();
        const p = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: ue } = await supabase.storage
          .from('case-images')
          .upload(p, imageFile, { contentType: imageFile.type });
        if (ue) throw ue;
        const { data: ud } = supabase.storage.from('case-images').getPublicUrl(p);
        image_url = ud.publicUrl;
      }

      const { error } = await supabase.from('cases').insert({
        author_name: form.author_name.trim(),
        author_email: form.author_email.trim() || null,
        author_role: form.author_role.trim() || null,
        author_company: form.author_company.trim() || null,
        show_profile: form.show_profile,
        title: form.title.trim(),
        what_built: form.what_built.trim(),
        tool_used: form.tool_used,
        area: form.area,
        description: form.description.trim(),
        result: form.result.trim() || null,
        external_link: form.external_link.trim() || null,
        image_url,
        is_visible: true,
      });
      if (error) throw error;

      toast.success('Case publicado! Obrigado por contribuir com a comunidade.');
      setForm({ ...EMPTY_FORM, author_name: defaultName, author_email: defaultEmail });
      setImageFile(null);
      setImagePreview(null);
      onSuccess();
    } catch {
      toast.error('Erro ao publicar o case. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    if (loading) return;
    setForm({ ...EMPTY_FORM, author_name: defaultName, author_email: defaultEmail });
    setErrors({});
    setImageFile(null);
    setImagePreview(null);
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Compartilhar o que construí</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          {/* Sobre você */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3 pb-2 border-b border-border">
              Sobre você
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Nome completo *" error={errors.author_name}>
                <Input
                  placeholder="Seu nome"
                  value={form.author_name}
                  onChange={(e) => set('author_name', e.target.value)}
                />
              </Field>
              <Field label="E-mail (não aparece publicamente)">
                <Input
                  placeholder="seu@email.com"
                  type="email"
                  value={form.author_email}
                  onChange={(e) => set('author_email', e.target.value)}
                />
              </Field>
              <Field label="Cargo">
                <Input
                  placeholder="Ex: Analista de Marketing"
                  value={form.author_role}
                  onChange={(e) => set('author_role', e.target.value)}
                />
              </Field>
              <Field label="Empresa">
                <Input
                  placeholder="Ex: Empresa XYZ"
                  value={form.author_company}
                  onChange={(e) => set('author_company', e.target.value)}
                />
              </Field>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <Checkbox
                id="show_profile"
                checked={form.show_profile}
                onCheckedChange={(v) => set('show_profile', Boolean(v))}
              />
              <Label htmlFor="show_profile" className="text-sm cursor-pointer">
                Quero que meu cargo e empresa apareçam no meu case
              </Label>
            </div>
          </section>

          {/* Sobre o que construiu */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3 pb-2 border-b border-border">
              Sobre o que você construiu
            </h3>
            <div className="space-y-3">
              <Field label="Título do case *" error={errors.title}>
                <Input
                  placeholder="Ex: Automatizei a triagem de e-mails do suporte com ChatGPT"
                  value={form.title}
                  onChange={(e) => set('title', e.target.value)}
                />
              </Field>
              <Field label="O que você construiu? *" error={errors.what_built}>
                <Textarea
                  placeholder="Descreva brevemente o que você criou ou automatizou..."
                  rows={3}
                  value={form.what_built}
                  onChange={(e) => set('what_built', e.target.value)}
                />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Ferramenta de IA usada *" error={errors.tool_used}>
                  <Select value={form.tool_used} onValueChange={(v) => set('tool_used', v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      {TOOL_OPTIONS.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Área profissional *" error={errors.area}>
                  <Select value={form.area} onValueChange={(v) => set('area', v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      {AREA_OPTIONS.map((a) => (
                        <SelectItem key={a} value={a}>
                          {a}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <Field label="Descrição completa *" error={errors.description}>
                <Textarea
                  placeholder="Explique como você fez, qual foi o processo, dificuldades e aprendizados..."
                  rows={4}
                  value={form.description}
                  onChange={(e) => set('description', e.target.value)}
                />
              </Field>
              <Field label="Resultado ou impacto (opcional)">
                <Textarea
                  placeholder="Ex: Economizei 3h por semana, aumentei a taxa de resposta em 40%..."
                  rows={2}
                  value={form.result}
                  onChange={(e) => set('result', e.target.value)}
                />
              </Field>
              <Field label="Link do projeto (opcional)">
                <Input
                  placeholder="https://..."
                  value={form.external_link}
                  onChange={(e) => set('external_link', e.target.value)}
                />
              </Field>
            </div>
          </section>

          {/* Imagem */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-1 pb-2 border-b border-border">
              Imagem (opcional)
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              Coloque um print do que você criou — isso ajuda outras pessoas a entender melhor.
            </p>
            {imagePreview ? (
              <div className="relative rounded-lg overflow-hidden border border-border">
                <img src={imagePreview} alt="Preview" className="w-full max-h-48 object-cover" />
                <button
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview(null);
                  }}
                  className="absolute top-2 right-2 p-1 rounded-full bg-background/80 hover:bg-background border border-border transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/30 hover:bg-muted/50 transition-all group"
              >
                <Upload className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2 group-hover:text-primary/50 transition-colors" />
                <p className="text-sm text-muted-foreground">Clique para selecionar uma imagem</p>
                <p className="text-xs text-muted-foreground/70 mt-1">JPG, PNG, WebP · Máx. 5MB</p>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleImageChange}
            />
          </section>

          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={handleClose} disabled={loading} className="flex-1">
              Cancelar
            </Button>
            <Button onClick={handleSubmit} disabled={loading} className="flex-1">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Publicando...
                </>
              ) : (
                'Publicar meu case'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ── CaseDetailModal ── */

function CaseDetailModal({
  caseItem: c,
  onClose,
}: {
  caseItem: Case;
  onClose: () => void;
}) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentName, setCommentName] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentErrors, setCommentErrors] = useState<{ name?: string; content?: string }>({});

  useEffect(() => {
    fetchComments();
  }, [c.id]);

  async function fetchComments() {
    setCommentsLoading(true);
    try {
      const { data } = await supabase
        .from('comments')
        .select('id, created_at, author_name, content')
        .eq('case_id', c.id)
        .eq('is_visible', true)
        .order('created_at', { ascending: true });
      setComments(data || []);
    } finally {
      setCommentsLoading(false);
    }
  }

  async function handleComment() {
    const errs: { name?: string; content?: string } = {};
    if (!commentName.trim()) errs.name = 'Nome obrigatório';
    if (!commentContent.trim()) errs.content = 'Comentário obrigatório';
    if (Object.keys(errs).length) {
      setCommentErrors(errs);
      return;
    }
    setCommentLoading(true);
    try {
      const { data, error } = await supabase
        .from('comments')
        .insert({
          case_id: c.id,
          author_name: commentName.trim(),
          content: commentContent.trim(),
          is_visible: true,
        })
        .select('id, created_at, author_name, content')
        .single();
      if (error) throw error;
      setComments((prev) => [...prev, data]);
      setCommentName('');
      setCommentContent('');
      setCommentErrors({});
    } catch {
      toast.error('Erro ao publicar comentário.');
    } finally {
      setCommentLoading(false);
    }
  }

  const toolColor = TOOL_COLORS[c.tool_used] || 'bg-muted text-muted-foreground';

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {c.image_url && (
          <div className="rounded-lg overflow-hidden -mx-6 -mt-6 mb-4">
            <img src={c.image_url} alt={c.title} className="w-full max-h-64 object-cover" />
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${toolColor}`}>
            {c.tool_used}
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-muted text-muted-foreground">
            {c.area}
          </span>
        </div>

        <h2 className="text-xl font-bold text-foreground mb-2">{c.title}</h2>

        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-4">
          <span className="font-medium text-foreground">{c.author_name}</span>
          {c.show_profile && c.author_role && (
            <span>
              · {c.author_role}
              {c.author_company ? ` @ ${c.author_company}` : ''}
            </span>
          )}
          <span>·</span>
          <span>{formatRelative(c.created_at)}</span>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
              O que foi construído
            </h4>
            <p className="text-sm text-foreground leading-relaxed">{c.what_built}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
              Descrição completa
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {c.description}
            </p>
          </div>
          {c.result && (
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/15">
              <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                Resultado / Impacto
              </h4>
              <p className="text-sm text-foreground font-medium leading-relaxed">{c.result}</p>
            </div>
          )}
          {c.external_link && (
            <a
              href={c.external_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Ver projeto
            </a>
          )}
        </div>

        {/* Comments */}
        <div className="border-t border-border pt-5">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Comentários e perguntas
            {comments.length > 0 && (
              <span className="text-muted-foreground font-normal text-sm">({comments.length})</span>
            )}
          </h3>

          {commentsLoading ? (
            <div className="space-y-3 mb-4">
              {[1, 2].map((i) => (
                <div key={i} className="space-y-1.5">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          ) : comments.length === 0 ? (
            <p className="text-sm text-muted-foreground mb-4">
              Seja o primeiro a comentar ou fazer uma pergunta.
            </p>
          ) : (
            <div className="space-y-4 mb-4">
              {comments.map((comment) => (
                <div key={comment.id} className="text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-foreground">{comment.author_name}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatRelative(comment.created_at)}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{comment.content}</p>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-2 bg-muted/40 rounded-xl p-4">
            <Field label="Seu nome *" error={commentErrors.name}>
              <Input
                placeholder="Como você se chama?"
                value={commentName}
                onChange={(e) => {
                  setCommentName(e.target.value);
                  setCommentErrors((er) => ({ ...er, name: undefined }));
                }}
                className="bg-background"
              />
            </Field>
            <Field label="Comentário ou pergunta *" error={commentErrors.content}>
              <Textarea
                placeholder="O que você achou? Tem alguma dúvida?"
                rows={3}
                value={commentContent}
                onChange={(e) => {
                  setCommentContent(e.target.value);
                  setCommentErrors((er) => ({ ...er, content: undefined }));
                }}
                className="bg-background"
              />
            </Field>
            <Button onClick={handleComment} disabled={commentLoading} className="w-full">
              {commentLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Publicando...
                </>
              ) : (
                'Publicar comentário'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ── Helpers ── */

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function formatRelative(dateStr: string) {
  try {
    return formatDistanceToNow(new Date(dateStr), { addSuffix: true, locale: ptBR });
  } catch {
    return '';
  }
}
