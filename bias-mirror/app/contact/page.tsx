import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex gap-1 p-1 bg-white/60 backdrop-blur-md rounded-full border border-white/40 shadow-sm">
          <Link href="/" className="px-6 py-2 rounded-full text-sm font-medium text-slate-600 hover:bg-white hover:text-black transition-all">
            Home
          </Link>
          <Link href="/about" className="px-6 py-2 rounded-full text-sm font-medium text-slate-600 hover:bg-white hover:text-black transition-all">
            About
          </Link>
          <Link href="/contact" className="px-6 py-2 rounded-full text-sm font-medium bg-white text-black shadow-sm">
            Contact
          </Link>
        </div>
      </nav>

      <main className="max-w-xl mx-auto px-6 pt-16 pb-32">
        <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4 text-center">
          Get in Touch
        </h1>
        <p className="text-center text-slate-500 mb-12">
          Have feedback on the reflection engine? We'd love to hear from you.
        </p>

        <form className="space-y-6 bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50">
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2 ml-1">Name</label>
            <input 
              type="text" 
              id="name"
              className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
              placeholder="Your name"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2 ml-1">Email</label>
            <input 
              type="email" 
              id="email"
              className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-2 ml-1">Message</label>
            <textarea 
              id="message"
              rows={4}
              className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all resize-none"
              placeholder="Tell us what's on your mind..."
            ></textarea>
          </div>

          <button className="w-full bg-black text-white font-bold py-4 rounded-xl hover:scale-[1.02] transition-transform shadow-lg">
            Send Message
          </button>
        </form>

        <div className="mt-12 text-center">
            <p className="text-sm text-slate-400">Prefer email? Reach us at <br/> <a href="mailto:uttarapraveen2005@gmail.com" className="text-slate-900 font-medium hover:underline">uttarapraveen2005@gmail.com</a></p>
        </div>
      </main>
    </div>
  );
}