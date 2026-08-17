export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-base-100 px-4">
      <div className="relative flex items-center justify-center">
        <div className="absolute h-16 w-16 animate-ping rounded-full bg-primary/20" />
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
      <p className="animate-pulse text-sm font-medium tracking-wide text-base-content/70">
        Loading StudyNook...
      </p>
    </div>
  );
}
