import React from "react";

export const Table: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <table className="min-w-full border border-gray-200 text-sm">{children}</table>
);

export const TableHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <thead className="bg-gray-100">{children}</thead>
);

export const TableBody: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <tbody>{children}</tbody>
);

export const TableRow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <tr className="border-b last:border-0 hover:bg-gray-50">{children}</tr>
);

export const TableHead: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ""
}) => <th className={`text-left px-3 py-2 font-semibold ${className}`}>{children}</th>;

export const TableCell: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ""
}) => <td className={`px-3 py-2 ${className}`}>{children}</td>;
