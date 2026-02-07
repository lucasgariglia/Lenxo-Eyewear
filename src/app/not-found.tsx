import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white font-sans">
      <h2 className="text-4xl font-display mb-4">Not Found</h2>
      <p className="mb-8 text-white/60">Could not find requested resource</p>
      <Link href="/" className="border-b border-[#C5A880] text-[#C5A880] pb-1 hover:text-white transition-colors uppercase tracking-widest text-xs">
        Return Home
      </Link>
    </div>
  )
}