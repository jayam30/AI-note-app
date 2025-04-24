'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useNote, useUpdateNote, useSummarizeNote } from '@/lib/queries';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';

interface NoteDetailProps {
  id: string;
}

export default function NoteDetail({ id }: NoteDetailProps) {
  const router = useRouter();
  const { data: note, isLoading, error } = useNote(id);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);
  
  const updateNoteMutation = useUpdateNote();
  const summarizeMutation = useSummarizeNote();

  const handleGenerateSummary = async () => {
    if (!note || !note.content.trim()) {
      setSummaryError('Cannot generate summary for empty content.');
      return;
    }

    setIsSummarizing(true);
    setSummaryError(null);

    try {
      const generatedSummary = await summarizeMutation.mutateAsync(note.content);
      
      // Update the note with the new summary
      await updateNoteMutation.mutateAsync({
        id: note.id,
        note: { summary: generatedSummary }
      });
      
    } catch (err) {
      setSummaryError('Failed to generate summary. Please try again.');
      console.error(err);
    } finally {
      setIsSummarizing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className="text-center p-6 bg-muted rounded-lg">
        <h3 className="text-lg font-medium">Failed to load note</h3>
        <p className="text-muted-foreground mt-2 mb-4">
          This note may not exist or you might not have permission to view it.
        </p>
        <Button onClick={() => router.push('/dashboard')}>
          Go to Dashboard
        </Button>
      </div>
    );
  }

  const formattedDate = new Date(note.updated_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{note.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Last updated: {formattedDate}
          </p>
        </div>
        <div className="flex space-x-2">
          <Link href={`/notes/${id}/edit`} passHref>
            <Button variant="outline">Edit</Button>
          </Link>
        </div>
      </div>

      <div className="p-6 bg-card border rounded-lg shadow-sm">
        <div className="prose max-w-none">
          <pre className="whitespace-pre-line text-base font-normal">
            {note.content}
          </pre>
        </div>
      </div>

      <div className="p-6 bg-muted rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium">Summary</h3>
          {!note.summary && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleGenerateSummary}
              disabled={isSummarizing}
            >
              {isSummarizing ? <LoadingSpinner className="h-4 w-4" /> : 'Generate Summary'}
            </Button>
          )}
        </div>
        
        {summaryError && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{summaryError}</AlertDescription>
          </Alert>
        )}
        
        {note.summary ? (
          <p className="text-base">{note.summary}</p>
        ) : (
          <p className="text-muted-foreground text-sm italic">
            No summary available. Generate one using the button above.
          </p>
        )}
      </div>
    </div>
  );
}