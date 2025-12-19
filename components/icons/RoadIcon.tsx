
import React from 'react';

export const RoadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 19.5v-15a2.5 2.5 0 0 1 2.5-2.5h11A2.5 2.5 0 0 1 20 4.5v15" />
    <path d="M12 2v20" />
    <path d="M5 12h14" />
  </svg>
);
