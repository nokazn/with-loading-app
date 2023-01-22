import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleStart =
      (msg?: string) =>
      (url: string, ...a: any[]) => {
        if (msg != null) {
          console.info(msg);
        }
        console.log(`Loading: ${url}`, a);
        NProgress.start();
      };

    const handleStop = (msg?: string) => () => {
      if (msg != null) {
        console.error(msg);
      }
      NProgress.done();
    };

    router.events.on('routeChangeStart', handleStart());
    router.events.on('routeChangeComplete', handleStop());
    router.events.on('routeChangeError', handleStop('エラー'));

    return () => {
      router.events.off('routeChangeStart', handleStart('終わりの始まり'));
      router.events.off('routeChangeComplete', handleStop());
      router.events.off('routeChangeError', handleStop('エラー'));
    };
  }, [router]);

  const unload = (e: Event) => {
    e.preventDefault();
    // @ts-expect-error
    return (e.returnValue = 'Check');
  };

  useEffect(() => {
    window.addEventListener('beforeunload', unload);
    return () => window.removeEventListener('beforeunload', unload);
  });

  return (
    <>
      <nav>
        <style jsx>{`
          a {
            margin: 0 10px 0 0;
          }
        `}</style>
        <Link href='/' legacyBehavior>
          <a>Home</a>
        </Link>
        <Link href='/about' legacyBehavior>
          <a>About</a>
        </Link>
        <Link href='/forever' legacyBehavior>
          <a>Forever</a>
        </Link>
        <a href='/non-existing'>Non Existing Page</a>
      </nav>
      <Component {...pageProps} />
    </>
  );
}
