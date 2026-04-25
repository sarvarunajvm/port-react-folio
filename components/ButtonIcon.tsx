export type ButtonIconName = 'work' | 'resume' | 'email' | 'linkedin' | 'github';

const iconPaths: Record<ButtonIconName, React.ReactNode> = {
  work: (
    <>
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </>
  ),
  resume: (
    <>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v5h5" />
      <path d="M10 12h6M10 16h5" />
    </>
  ),
  email: (
    <>
      <rect x="3.5" y="6" width="17" height="12" rx="2" />
      <path d="m5 8 7 5 7-5" />
    </>
  ),
  linkedin: (
    <>
      <path d="M6.5 10v8M6.5 7v.01M11 18v-8M11 13.5c0-2.2 1.3-3.7 3.4-3.7 2 0 3.1 1.3 3.1 3.6V18" />
    </>
  ),
  github: (
    <>
      <path d="M9 19c-4 1.2-4-2-5.5-2.5" />
      <path d="M15 21v-3.1c0-.9-.3-1.5-.8-1.9 2.7-.3 5.6-1.4 5.6-6A4.6 4.6 0 0 0 18.5 6c.1-.3.5-1.7-.1-3.4 0 0-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.4 0C6.1 2.3 5 2.6 5 2.6 4.4 4.3 4.8 5.7 4.9 6a4.7 4.7 0 0 0-1.3 3.3c0 4.6 2.8 5.7 5.5 6-.4.3-.8 1-.8 2V21" />
    </>
  ),
};

export function ButtonIcon({ name }: { name: ButtonIconName }) {
  return (
    <svg
      className="button-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      {iconPaths[name]}
    </svg>
  );
}
