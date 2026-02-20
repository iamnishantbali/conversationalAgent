import { useState } from "react";

const NAV_LINKS = ["Work", "About", "Services", "Contact"];

const GALLERY_ITEMS = [
  { id: 1, src: "https://picsum.photos/seed/photo1/800/600", alt: "Portrait session", category: "Portrait", span: "col-span-2" },
  { id: 2, src: "https://picsum.photos/seed/photo2/600/600", alt: "Landscape shoot", category: "Landscape", span: "" },
  { id: 3, src: "https://picsum.photos/seed/photo3/600/600", alt: "Wedding ceremony", category: "Wedding", span: "" },
  { id: 4, src: "https://picsum.photos/seed/photo4/600/900", alt: "Street photography", category: "Street", span: "row-span-2" },
  { id: 5, src: "https://picsum.photos/seed/photo5/600/400", alt: "Editorial fashion", category: "Editorial", span: "" },
  { id: 6, src: "https://picsum.photos/seed/photo6/600/400", alt: "Nature macro", category: "Nature", span: "" },
  { id: 7, src: "https://picsum.photos/seed/photo7/800/500", alt: "Corporate event", category: "Event", span: "col-span-2" },
];

const SERVICES = [
  {
    title: "Portrait & Lifestyle",
    description: "Individual, couple, and family portraits that capture genuine emotion and personality.",
    icon: "◎",
  },
  {
    title: "Wedding & Events",
    description: "Full-day coverage of your most important moments, delivered as timeless images.",
    icon: "◇",
  },
  {
    title: "Commercial & Editorial",
    description: "Brand photography, product shots, and editorial spreads for print and digital media.",
    icon: "▣",
  },
  {
    title: "Landscape & Travel",
    description: "Fine art landscape prints and destination photography for private collectors.",
    icon: "△",
  },
];

const TESTIMONIALS = [
  {
    quote: "Alex captured our wedding day perfectly — every glance, every laugh. We couldn't be happier.",
    author: "Maya & Luca",
    role: "Wedding clients",
  },
  {
    quote: "The product shots transformed our entire brand presence. Truly world-class work.",
    author: "Sarah Chen",
    role: "Creative Director, Luma Studio",
  },
  {
    quote: "Working with Alex was effortless. The portraits felt natural, not staged — exactly what we wanted.",
    author: "James Hartley",
    role: "Portrait client",
  },
];

function NavBar({ activeSection }: { activeSection: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-serif text-xl font-semibold tracking-tight text-stone-900">
          Alex Monroe
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <button
                onClick={() => scrollTo(link)}
                className={`text-sm tracking-wide transition-colors ${
                  activeSection === link.toLowerCase()
                    ? "text-stone-900 font-medium"
                    : "text-stone-500 hover:text-stone-900"
                }`}
              >
                {link}
              </button>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); scrollTo("Contact"); }}
          className="hidden md:inline-flex items-center gap-2 bg-stone-900 text-white text-sm px-5 py-2.5 rounded-full hover:bg-stone-700 transition-colors"
        >
          Book a session
        </a>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 text-stone-600"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <div className="w-5 flex flex-col gap-1">
            <span className={`block h-0.5 bg-stone-700 transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`block h-0.5 bg-stone-700 transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 bg-stone-700 transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-left text-stone-700 text-sm py-1"
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => scrollTo("Contact")}
            className="bg-stone-900 text-white text-sm px-5 py-2.5 rounded-full text-center"
          >
            Book a session
          </button>
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-end pb-24 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://picsum.photos/seed/hero-portrait/1600/900"
          alt="Hero background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <p className="text-stone-300 text-sm tracking-[0.2em] uppercase mb-4">
          Photographer & Visual Storyteller
        </p>
        <h1 className="font-serif text-5xl md:text-7xl font-semibold text-white leading-tight mb-6 max-w-3xl">
          Light, Emotion,<br />Moments Kept.
        </h1>
        <p className="text-stone-300 text-lg max-w-xl mb-10 leading-relaxed">
          Based in New York. Available worldwide. I photograph weddings, portraits,
          and commercial projects with honesty and quiet attention to detail.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="#work"
            onClick={(e) => { e.preventDefault(); document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-flex items-center gap-2 bg-white text-stone-900 text-sm font-medium px-6 py-3 rounded-full hover:bg-stone-100 transition-colors"
          >
            View my work
            <span>→</span>
          </a>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-flex items-center gap-2 border border-white/50 text-white text-sm px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
          >
            Get in touch
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 flex flex-wrap gap-10">
          {[["12+", "Years experience"], ["800+", "Sessions completed"], ["40+", "Weddings captured"]].map(([num, label]) => (
            <div key={label}>
              <p className="font-serif text-3xl font-semibold text-white">{num}</p>
              <p className="text-stone-400 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const categories = ["All", "Portrait", "Wedding", "Landscape", "Editorial"];

  const filtered = activeFilter === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <section id="work" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-stone-400 text-sm tracking-widest uppercase mb-2">Portfolio</p>
            <h2 className="font-serif text-4xl font-semibold text-stone-900">Selected work</h2>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`text-sm px-4 py-1.5 rounded-full border transition-colors ${
                  activeFilter === cat
                    ? "bg-stone-900 text-white border-stone-900"
                    : "border-stone-200 text-stone-600 hover:border-stone-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-3 auto-rows-[220px] gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-xl bg-stone-100 ${item.span}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/40 transition-colors duration-300 flex items-end p-4">
                <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-[10px] text-stone-300 uppercase tracking-widest block">{item.category}</span>
                  <span className="text-white text-sm font-medium">{item.alt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button className="inline-flex items-center gap-2 text-stone-600 text-sm border border-stone-200 px-6 py-2.5 rounded-full hover:border-stone-400 transition-colors">
            View full portfolio
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-24 bg-stone-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-stone-200">
              <img
                src="https://picsum.photos/seed/photographer/600/750"
                alt="Alex Monroe"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-lg max-w-[180px]">
              <p className="font-serif text-3xl font-semibold text-stone-900">12</p>
              <p className="text-stone-500 text-sm">Years capturing life's best moments</p>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="text-stone-400 text-sm tracking-widest uppercase mb-3">About me</p>
            <h2 className="font-serif text-4xl font-semibold text-stone-900 mb-6 leading-tight">
              I believe every frame<br />tells a true story.
            </h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              Hi, I'm Alex Monroe — a New York-based photographer specializing in weddings, portraits,
              and commercial work. My approach is rooted in patience and observation: I wait for the
              real moments rather than directing them.
            </p>
            <p className="text-stone-600 leading-relaxed mb-8">
              My work has been published in Vogue, Kinfolk, and The New York Times. I've had the
              privilege of shooting in over 30 countries, always with the same kit and the same quiet
              intention.
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {["Nikon Z9", "Natural light", "Studio", "35mm film", "Medium format"].map((tag) => (
                <span
                  key={tag}
                  className="text-sm text-stone-600 bg-stone-100 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 bg-stone-900 text-white text-sm px-6 py-3 rounded-full hover:bg-stone-700 transition-colors"
            >
              Work with me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-stone-400 text-sm tracking-widest uppercase mb-2">What I offer</p>
          <h2 className="font-serif text-4xl font-semibold text-stone-900">Services</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="group border border-stone-200 rounded-2xl p-8 hover:border-stone-400 hover:bg-stone-50 transition-all"
            >
              <span className="text-3xl block mb-5 text-stone-400 group-hover:text-stone-700 transition-colors">
                {service.icon}
              </span>
              <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3">{service.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Pricing note */}
        <div className="mt-12 bg-stone-900 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl font-semibold text-white mb-2">
              Custom packages available
            </h3>
            <p className="text-stone-400 text-sm max-w-md">
              Every project is unique. Reach out and I'll put together a tailored quote based on your needs, timeline, and location.
            </p>
          </div>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="shrink-0 inline-flex items-center gap-2 bg-white text-stone-900 text-sm font-medium px-6 py-3 rounded-full hover:bg-stone-100 transition-colors whitespace-nowrap"
          >
            Request a quote →
          </a>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-24 bg-stone-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-stone-400 text-sm tracking-widest uppercase mb-2">Kind words</p>
          <h2 className="font-serif text-4xl font-semibold text-stone-900">Client stories</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.author} className="bg-white rounded-2xl p-8 border border-stone-100">
              <p className="text-stone-500 text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
              <div>
                <p className="font-semibold text-stone-900 text-sm">{t.author}</p>
                <p className="text-stone-400 text-xs mt-0.5">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <p className="text-stone-400 text-sm tracking-widest uppercase mb-3">Get in touch</p>
            <h2 className="font-serif text-4xl font-semibold text-stone-900 mb-6 leading-tight">
              Let's create something<br />beautiful together.
            </h2>
            <p className="text-stone-500 leading-relaxed mb-10">
              Whether you're planning a wedding, need brand imagery, or just want to talk cameras —
              I'd love to hear from you. I typically respond within 24 hours.
            </p>

            <div className="space-y-4">
              {[
                { label: "Email", value: "hello@alexmonroe.photo" },
                { label: "Phone", value: "+1 (212) 555-0148" },
                { label: "Based in", value: "New York, NY — available worldwide" },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-4">
                  <span className="text-stone-400 text-sm w-20 shrink-0">{label}</span>
                  <span className="text-stone-700 text-sm">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div>
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center text-2xl mb-4">✓</div>
                <h3 className="font-serif text-2xl font-semibold text-stone-900 mb-2">Message received</h3>
                <p className="text-stone-500 text-sm">I'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-stone-500 mb-1.5">Your name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Smith"
                      className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:border-stone-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-stone-500 mb-1.5">Email address</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:border-stone-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-stone-500 mb-1.5">Service</label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 focus:outline-none focus:border-stone-400 transition-colors bg-white"
                  >
                    <option value="">Select a service…</option>
                    {SERVICES.map((s) => (
                      <option key={s.title} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-stone-500 mb-1.5">Tell me about your project</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your vision, date, location, and anything else that's relevant…"
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:border-stone-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-stone-900 text-white text-sm font-medium py-3.5 rounded-xl hover:bg-stone-700 transition-colors"
                >
                  Send message →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10 bg-stone-900 text-stone-400">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-serif text-white text-lg font-semibold">Alex Monroe</p>

        <div className="flex items-center gap-8 text-sm">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
              className="hover:text-white transition-colors"
            >
              {link}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {["Instagram", "LinkedIn", "Behance"].map((platform) => (
            <a
              key={platform}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-sm hover:text-white transition-colors"
            >
              {platform}
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-8 pt-6 border-t border-stone-800 flex flex-col md:flex-row justify-between gap-2 text-xs text-stone-600">
        <p>© 2026 Alex Monroe Photography. All rights reserved.</p>
        <p>New York · London · Tokyo</p>
      </div>
    </footer>
  );
}

export default function App() {
  const [activeSection] = useState("hero");

  return (
    <div className="min-h-screen font-sans antialiased">
      <NavBar activeSection={activeSection} />
      <HeroSection />
      <WorkSection />
      <AboutSection />
      <ServicesSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
