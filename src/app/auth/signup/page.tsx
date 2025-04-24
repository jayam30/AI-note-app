'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUpWithEmail, signInWithGoogle } from '../../../lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUpWithEmail(email, password);
      router.push('/dashboard');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Signup failed:', error.message);
      } else {
        console.error('An unknown error occurred during signup.');
      }
      alert('Signup failed, please try again');
    }
  };
  
  const handleGoogleSignup = async () => {
    try {
      await signInWithGoogle();
      router.push('/dashboard');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Google signup failed:', error.message);
      } else {
        console.error('An unknown error occurred during Google signup.');
      }
      alert('Google signup failed');
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSignup} className="space-y-4 w-full max-w-sm p-6 border rounded-lg">
        <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Sign Up</Button>
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={handleGoogleSignup}>
            Sign Up with Google
          </Button>
        </div>
      </form>
    </div>
  );
}
