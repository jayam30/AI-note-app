'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LoadingSpinner } from '@/components/ui/loading';
import { Note } from '@/lib/supabaseClient';
import { useCreateNote, useUpdateNote, useSummarizeNote } from '@/lib/queries';

interface NoteFormProps {
  initialData?: Note;
}

export default function NoteForm({ initialData }: NoteFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [isSaving, setIsSaving] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState(initialData?.summary || '');

  // Get the create, update, and summarize mutations
  const createNoteMutation = useCreateNote();
  const updateNoteMutation = useUpdateNote();
  const summarizeMutation = useSummarizeNote();

  const isEditing = !!initialData;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      if (isEditing) {
        await updateNoteMutation.mutateAsync({
          id: initialData.id,
          note: {
            title,
            content,
            summary,
          },
        });
      } else {
        const newNote = await createNoteMutation.mutateAsync({
          title,
          content,
          summary,
        });
        
        // Redirect to the newly created note
        router.push(`/notes/${newNote.id}`);
        return;
      }
      
      // If we're editing, stay on the page but confirm success
      setIsSaving(false);
    } catch (err) {
      setError('Failed to save note. Please try again.');
      setIsSaving(false);
      console.error(err);
    }
  };

  const handleGenerateSummary = async () => {
    if (!content.trim()) {
      setError('Please add content to your note before generating a summary.');
      return;
    }

    setIsSummarizing(true);
    setError(null);

    try {
      const generatedSummary = await summarizeMutation.mutateAsync(content);
      setSummary(generatedSummary);
    } catch (err) {
      setError('Failed to generate summary. Please try again.');
      console.error(err);
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note Title"
          required
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium">
          Content
        </label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note here..."
          className="min-h-[200px] w-full resize-y"
          required
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="summary" className="text-sm font-medium">
            Summary
          </label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleGenerateSummary}
            disabled={isSummarizing || !content}
          >
            {isSummarizing ? <LoadingSpinner className="h-4 w-4" /> : 'Generate Summary'}
          </Button>
        </div>
        <Textarea
          id="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="AI-generated summary will appear here..."
          className="w-full resize-y"
        />
        <p className="text-xs text-muted-foreground">
          The summary will be generated automatically using AI based on your note content.
        </p>
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSaving}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? (
            <>
              <LoadingSpinner className="mr-2 h-4 w-4" />
              {isEditing ? 'Saving...' : 'Creating...'}
            </>
          ) : (
            isEditing ? 'Save Changes' : 'Create Note'
          )}
        </Button>
      </div>
    </form>
  );
}
