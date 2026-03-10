import React from 'react';

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="not-prose mt-10 mb-4 text-2xl font-semibold text-white">{children}</h2>;
}

export function Callout({
  type = 'info',
  children,
}: {
  type?: 'info' | 'warning' | 'success';
  children: React.ReactNode;
}) {
  const styles =
    type === 'warning'
      ? 'border-yellow-500/40 bg-yellow-500/10 text-yellow-100'
      : type === 'success'
        ? 'border-green-500/40 bg-green-500/10 text-green-100'
        : 'border-blue-500/40 bg-blue-500/10 text-blue-100';

  return <div className={`not-prose my-6 rounded-2xl border p-4 ${styles}`}>{children}</div>;
}

export function Checklist({ children }: { children: React.ReactNode }) {
  return <ul className="not-prose my-4 space-y-2">{children}</ul>;
}

export function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-gray-200">
      <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-600 bg-gray-800 text-xs text-gray-200">
        ✓
      </span>
      <span className="leading-relaxed">{children}</span>
    </li>
  );
}

export function Steps({ children }: { children: React.ReactNode }) {
  return <ol className="steps-list not-prose my-4 space-y-3">{children}</ol>;
}

export function Step({ children }: { children: React.ReactNode }) {
  return (
    <li className="steps-item flex gap-3 text-gray-200">
      <span className="steps-badge mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-700 text-sm font-semibold text-white" />
      <span className="leading-relaxed">{children}</span>
    </li>
  );
}
