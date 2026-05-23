interface LastUpdatedProps {
  date: string; // formato "YYYY-MM-DD"
}

export default function LastUpdated({ date }: LastUpdatedProps) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));

  return (
    <div className="mt-12 pt-6 border-t border-primary-light/20">
      <p className="text-text/40 text-xs text-center">
        Last updated: {formattedDate}
      </p>
    </div>
  );
}