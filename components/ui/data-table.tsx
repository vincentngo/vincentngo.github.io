"use client";

import { type ReactNode } from "react";

interface DataTableProps {
  children: ReactNode;
  className?: string;
}

export function DataTable({ children, className = "" }: DataTableProps) {
  return (
    <div className={`my-6 overflow-x-auto rounded-lg border border-border shadow-sm ${className}`}>
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  );
}

export function DataTableHead({ children }: { children: ReactNode }) {
  return (
    <thead className="bg-muted">
      <tr>{children}</tr>
    </thead>
  );
}

export function DataTableBody({ children }: { children: ReactNode }) {
  return <tbody className="divide-y divide-border">{children}</tbody>;
}

export function DataTableRow({ children }: { children: ReactNode }) {
  return <tr className="transition-colors hover:bg-muted/50">{children}</tr>;
}

export function DataTableHeader({ children }: { children: ReactNode }) {
  return (
    <th className="border-b border-border px-4 py-3 text-left font-semibold text-foreground">
      {children}
    </th>
  );
}

export function DataTableCell({ children }: { children: ReactNode }) {
  return <td className="border-b border-border px-4 py-3 text-foreground/90">{children}</td>;
}
