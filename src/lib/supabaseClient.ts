import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
export interface User {
    id: string;
    email: string;
    user_metadata?: {
      name?: string;
      avatar_url?: string;
    };
  }
  
  // Note types
  export interface Note {
    id: string;
    user_id: string;
    title: string;
    content: string;
    summary?: string;
    created_at: string;
    updated_at: string;
  }
  
  // Authentication helper functions
  export const signUpWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { data, error };
  };
  
  export async function signInWithEmail({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  }
  
  
  
  export const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { data, error };
  };
  
  export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };
  
  export const getCurrentUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    return { user: data.user, error };
  };
  
  // Note CRUD operations
  export const fetchNotes = async () => {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('updated_at', { ascending: false });
    
    if (error) throw error;
    return data as Note[];
  };
  
  export const fetchNote = async (id: string) => {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Note;
  };
  
  export const createNote = async (note: Omit<Note, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    const { data: userData } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('notes')
      .insert({
        ...note,
        user_id: userData.user?.id,
      })
      .select()
      .single();
    
    if (error) throw error;
    return data as Note;
  };
  
  export const updateNote = async (id: string, note: Partial<Note>) => {
    const { data, error } = await supabase
      .from('notes')
      .update({
        ...note,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Note;
  };
  
  export const deleteNote = async (id: string) => {
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { success: true };
  };