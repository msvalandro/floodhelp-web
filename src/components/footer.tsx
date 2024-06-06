export function Footer() {
  return (
    <footer className="mx-10 flex h-[100px] w-full max-w-[1180px] items-center justify-between border-t border-border px-5">
      <p className="text-muted-foreground">&copy; 2024 FloodHelp, Inc.</p>

      <div className="flex gap-4">
        <a href="/" className="text-muted-foreground">
          Ajudar
        </a>
        <a href="/create" className="text-muted-foreground">
          Pedir Ajuda
        </a>
      </div>
    </footer>
  )
}
