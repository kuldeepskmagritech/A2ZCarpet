import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Projects — A2Z Carpet',
  description: 'Handpicked A2Z projects delivered across India and worldwide.',
}

export default function ProjectsPage() {
  const projects = [
    { title: 'The Oberoi Suite', subtitle: 'Luxury Hotel · New Delhi', image: '/assets/hero-carpet-BmZYYtIC.jpg' },
    { title: 'Corporate HQ Lobby', subtitle: 'Office · Mumbai', image: '/assets/wall-to-wall-BQ7JoY9c.jpg' },
    { title: 'Heritage Residence', subtitle: 'Residential · Lucknow', image: '/assets/hero-carpet-BmZYYtIC.jpg' },
    { title: 'Grand Banquet Hall', subtitle: 'Banquet · Jaipur', image: '/assets/wall-to-wall-BQ7JoY9c.jpg' },
    { title: 'Boutique Hotel', subtitle: 'Hospitality · Udaipur', image: '/assets/hero-carpet-BmZYYtIC.jpg' },
    { title: 'Presidential Suite', subtitle: 'Luxury Hotel · Dubai', image: '/assets/wall-to-wall-BQ7JoY9c.jpg' },
  ]

  return (
    <section className="container mx-auto px-4 md:px-8 py-16">
      <div className="text-center mb-10">
        <div className="text-primary text-xs uppercase tracking-[0.22em] font-medium mb-3">Featured Work</div>
        <h1 className="font-serif text-3xl md:text-4xl text-foreground">Our Projects</h1>
        <div className="mt-3 mx-auto w-12 h-[2px] bg-primary rounded-[2px]" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <div key={i} className="group relative aspect-[4/3] overflow-hidden rounded-md border border-border">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white z-10">
              <h3 className="font-serif text-xl">{project.title}</h3>
              <div className="text-xs text-white/80 tracking-wider mt-1">{project.subtitle}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 bg-card p-10 md:p-12 text-center rounded-xl border border-border">
        <h2 className="text-3xl font-serif mb-3">Start Your Next Project</h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto text-sm leading-relaxed">
          Partner with A2Z Carpet for unparalleled craftsmanship, custom colorways, and professional site installation services.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-primary hover:bg-primary-hover text-white px-8 py-3 text-xs tracking-widest uppercase font-medium transition-colors"
        >
          Contact Our Team
        </Link>
      </div>
    </section>
  )
}
