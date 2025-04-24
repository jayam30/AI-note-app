// types/index.ts

export interface User {
    id: string;
    email: string;
    created_at?: string;
  }
  
  export interface Note {
    id: string;
    user_id: string;
    title: string;
    content: string;
    summary?: string;
    created_at: string;
    updated_at?: string;
  }
  
  export interface CreateNoteInput {
    title: string;
    content: string;
  }
  
  export interface UpdateNoteInput {
    id: string;
    title?: string;
    content?: string;
  }
  
  export interface SummarizationRequest {
    text: string;
  }
  
  export interface SummarizationResponse {
    summary: string;
  }
  