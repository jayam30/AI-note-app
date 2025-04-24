import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-6 text-center">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Smart Note-Taking with AI Summarization
        </h1>
        <p className="text-xl text-muted-foreground">
          Create, organize, and summarize your notes with the power of AI.
          Get concise summaries of your content instantly.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link href="/auth/signup">
            <Button size="lg" className="text-lg px-8">
              Get Started
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button variant="outline" size="lg" className="text-lg px-8">
              Sign In
            </Button>
          </Link>
        </div>
        <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-6 border rounded-lg bg-card shadow-sm">
            <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
              <svg
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
                <path d="M10 2c1 .5 2 2 2 5" />
              </svg>
            </div>
            <h3 className="text-xl font-medium">Easy Note Creation</h3>
            <p className="text-muted-foreground mt-2">
              Create and edit notes effortlessly with our intuitive interface. Organize your thoughts in one place.
            </p>
          </div>
          <div className="p-6 border rounded-lg bg-card shadow-sm">
            <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
              <svg
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m4.9 4.9 14.2 14.2" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <h3 className="text-xl font-medium">Access Anywhere</h3>
            <p className="text-muted-foreground mt-2">
              Access your notes from any device, anywhere. Your content is always synced and secure.
            </p>
          </div>
          <div className="p-6 border rounded-lg bg-card shadow-sm">
            <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
              <svg
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <rect width="18" height="10" x="3" y="11" rx="2" />
                <circle cx="12" cy="5" r="2" />
                <path d="M12 7v4" />
                <line x1="8" x2="16" y1="16" y2="16" />
              </svg>
            </div>
            <h3 className="text-xl font-medium">AI Summarization</h3>
            <p className="text-muted-foreground mt-2">
              Generate concise summaries of your notes using advanced AI technology. Save time reviewing content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}