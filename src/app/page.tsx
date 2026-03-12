import { redirect } from 'next/navigation';

// Root page redirects to the default locale (Arabic)
export default function RootPage() {
  redirect('/ar');
}
