'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmail, signInWithGoogle } from '../../../lib/supabaseClient';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmail({ email, password }); // ✅ pass as an object
      router.push('/dashboard');
    } catch (error) {
      alert('Login failed, please try again');
      console.error(error); // useful for debugging
    }
  };
  

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      router.push('/dashboard');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Google login failed:', error.message);
      } else {
        console.error('An unknown error occurred during Google login.');
      }
      alert('Google login failed');
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleLogin} className="space-y-4 w-full max-w-sm p-6 border rounded-lg">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
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
        <Button type="submit">Login</Button>
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={handleGoogleLogin}>
            Login with Google
          </Button>
        </div>
      </form>
    </div>
  );
}
