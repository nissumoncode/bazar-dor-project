export default function CategoryLoading() {
  return (
    <main className="mx-auto max-w-7xl animate-pulse px-4 py-10">
      <div className="mb-8 h-9 w-56 rounded bg-blue-100/70" />

      <div className="mb-6 flex justify-between gap-4">
        <div className="h-5 w-28 rounded bg-blue-100/70" />
        <div className="h-8 w-44 rounded bg-blue-100/70" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="mb-4 h-12 w-12 rounded-xl bg-blue-100/70" />
            <div className="mb-3 h-5 w-3/4 rounded bg-blue-100/70" />
            <div className="mb-5 h-4 w-1/3 rounded bg-blue-100/70" />
            <div className="h-7 w-1/2 rounded bg-blue-100/70" />
          </div>
        ))}
      </div>
    </main>
  );
}
