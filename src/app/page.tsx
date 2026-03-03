export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-20">
      <section className="w-full max-w-3xl space-y-4 text-center">
        <h1 className="text-4xl font-bold">Wei Portfolio</h1>
        <p className="text-lg opacity-80">A clean portfolio site built with Next.js.</p>
        <a href="/app" className="inline-block underline underline-offset-4">
          Open portfolio page
        </a>
      </section>
    </main>
  );
}
