import { useEffect } from 'react';

export async function getServerSideProps() {
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });
  return { props: {} };
}

export default function AboutPage() {
  console.log('a');
  const unload = (e: Event) => {
    e.preventDefault();
    return confirm('a');
  };

  useEffect(() => {
    window.addEventListener('beforeunload', unload);
    return () => window.removeEventListener('beforeunload', unload);
  });

  return <p>This is about Next.js!</p>;
}
