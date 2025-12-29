interface BackButtonProps {
  onClick: () => void
}

export function BackButton({ onClick }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label="Voltar"
      title="Voltar"
      className="w-8 h-8 md:w-10 md:h-10 border-2 border-neutral-800 flex items-center justify-center hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-800 rounded"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
