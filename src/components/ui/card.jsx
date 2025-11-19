import React from "react";

export function Card({ children, className = "" }) {
  return <div className={`bg-white p-4 rounded-lg shadow ${className}`}>{children}</div>;
}

export function CardHeader({ children, className = "" }) {
  return <div className={`mb-2 flex items-center justify-between ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }) {
  return <h3 className={`text-lg font-bold ${className}`}>{children}</h3>;
}

export function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}
