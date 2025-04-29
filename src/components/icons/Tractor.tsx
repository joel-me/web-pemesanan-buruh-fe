import type React from "react"
export const Tractor = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 4h9l1 7" />
      <path d="M4 11V4" />
      <path d="M8 10V4" />
      <path d="M18 18v-3a5 5 0 0 0-5-5h-1l-2 5" />
      <circle cx="7" cy="15" r="2" />
      <circle cx="16" cy="15" r="2" />
      <path d="M3 15h2" />
      <path d="M19 15h2" />
      <path d="M15 8h6" />
      <path d="M18 8v5" />
    </svg>
  )
}
