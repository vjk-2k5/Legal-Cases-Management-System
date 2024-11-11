import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/lawyers/dashboard');  
}