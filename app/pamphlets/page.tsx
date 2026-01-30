import { LayoutWrapper } from '@/components/layout-wrapper'
import { FileText, Download } from 'lucide-react'

export const metadata = {
  title: 'Project Pamphlets | Film Industry MP',
  description: 'Download project pamphlets and documentation from Film Industry MP',
}

export default function PamphletsPage() {
  const pamphlets = [
    {
      title: 'Pamphlet 1',
      description: 'Project overview and key information',
      file: '/pamphlet-1.jpg',
    },
    {
      title: 'Pamphlet 2',
      description: 'Services and facilities documentation',
      file: '/pamphlet-2.jpg',
    },
    {
      title: 'Pamphlet 3',
      description: 'Subsidy schemes and benefits guide',
      file: '/pamphlet-3.jpg',
    },
     {
      title: 'Pamphlet 4',
      description: 'Visiting Card',
      file: '/pamphlet-4.jpg',
    },
  ]

  return (
    <LayoutWrapper>
      <main className="min-h-screen pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Project Pamphlets
            </h1>
            <p className="text-lg text-foreground/70">
              Download our comprehensive guides and documentation
            </p>
          </div>

          {/* Pamphlets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pamphlets.map((pamphlet, index) => (
              <a
                key={index}
                href={pamphlet.file}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="h-full bg-background border border-foreground/10 rounded-lg p-8 hover:border-primary hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer">
                  <FileText className="w-16 h-16 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                    {pamphlet.title}
                  </h3>
                  <p className="text-foreground/60 mb-6">
                    {pamphlet.description}
                  </p>
                  <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
    </LayoutWrapper>
  )
}
