"use client";

export default function EmptyState({
  title,
  description,
}) {
  return (
    <div className="rounded-xl bg-white p-10 text-center shadow">
      <h2 className="text-2xl font-bold">
        {title}
      </h2>

      <p className="mt-2 text-gray-500">
        {description}
      </p>
    </div>
  );
} 