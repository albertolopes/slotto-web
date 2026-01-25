interface BackButtonProps {
  onClick: () => void
}

export function BackButton({ onClick }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label="Voltar"
      title="Voltar"
      className="w-10 h-10 bg-white/90 backdrop-blur-sm border border-neutral-200/50 rounded-full flex items-center justify-center shadow-md hover:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-800 transition-all active:scale-95"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
