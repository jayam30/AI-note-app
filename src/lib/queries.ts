import { useMutation, useQuery, useQueryClient, QueryClient } from '@tanstack/react-query';

import { fetchNotes, fetchNote, createNote, updateNote, deleteNote, getCurrentUser, signInWithEmail, signInWithGoogle } from './supabaseClient'; // Make sure to import auth functions from supabase
import { summarizeText } from './ai';
import { Note } from './supabaseClient';

export const queryClient = new QueryClient();

// Auth queries
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
  });
};

export const useSignInWithEmail = () => {
  return useMutation({
    mutationFn: signInWithEmail,
  });
};


export const useSignInWithGoogle = () => {
  return useMutation({
    mutationFn: signInWithGoogle,
  });
};

// Notes queries
export const useNotes = () => {
  return useQuery({
    queryKey: ['notes'],
    queryFn: fetchNotes,
  });
};

export const useNote = (id: string) => {
  return useQuery({
    queryKey: ['notes', id],
    queryFn: () => fetchNote(id),
    enabled: !!id, // Only fetch when id is available
  });
};

export const useCreateNote = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, note }: { id: string; note: Partial<Note> }) => 
      updateNote(id, note),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      queryClient.invalidateQueries({ queryKey: ['notes', data.id] });
    },
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
};

// AI summarization mutation
export const useSummarizeNote = () => {
  return useMutation({
    mutationFn: summarizeText,
  });
};
