'use client'

import { motion } from 'framer-motion'

interface AdminContentProps {
  activeSection: string
}

export function AdminContent({ activeSection }: AdminContentProps) {
  const renderContent = () => {
    switch (activeSection) {
      case 'logo':
        return (
          <div className="space-y-6">
            <h3 className="text-3xl font-display font-bold">Logo</h3>
            <div className="bg-foreground/5 rounded-lg p-8 border border-foreground/10">
              <p className="text-foreground/70 mb-6">Current logo file: /logo.png</p>
              <p className="text-sm text-foreground/60">
                Replace the logo by uploading a new file named "logo.png" to the public folder.
              </p>
            </div>
          </div>
        )

      case 'homepage-video':
        return (
          <div className="space-y-6">
            <h3 className="text-3xl font-display font-bold">Homepage Video</h3>
            <div className="bg-foreground/5 rounded-lg p-8 border border-foreground/10">
              <p className="text-foreground/70 mb-6">Current video file: /hero.mp4</p>
              <p className="text-sm text-foreground/60">
                Replace the homepage video by uploading a new file named "hero.mp4" to the public folder.
              </p>
            </div>
          </div>
        )

      case 'images':
        return (
          <div className="space-y-6">
            <h3 className="text-3xl font-display font-bold">Images</h3>
            <div className="space-y-4">
              {[
                { name: '/banner.jpg', description: 'Subsidy page banner image' },
                { name: '/section-image.jpg', description: 'General section image placeholder' },
              ].map((image) => (
                <div key={image.name} className="bg-foreground/5 rounded-lg p-6 border border-foreground/10">
                  <p className="font-semibold text-foreground">{image.name}</p>
                  <p className="text-sm text-foreground/60 mt-2">{image.description}</p>
                </div>
              ))}
            </div>
          </div>
        )

      case 'pamphlets':
        return (
          <div className="space-y-6">
            <h3 className="text-3xl font-display font-bold">Pamphlets</h3>
            <div className="space-y-4">
              {[
                { name: '/pamphlet-1.pdf', description: 'Pamphlet 1' },
                { name: '/pamphlet-2.pdf', description: 'Pamphlet 2' },
                { name: '/pamphlet-3.pdf', description: 'Pamphlet 3' },
              ].map((pamphlet) => (
                <div key={pamphlet.name} className="bg-foreground/5 rounded-lg p-6 border border-foreground/10">
                  <p className="font-semibold text-foreground">{pamphlet.name}</p>
                  <p className="text-sm text-foreground/60 mt-2">{pamphlet.description}</p>
                </div>
              ))}
            </div>
          </div>
        )

      case 'text-content':
        return (
          <div className="space-y-6">
            <h3 className="text-3xl font-display font-bold">Text Content</h3>
            <div className="bg-foreground/5 rounded-lg p-8 border border-foreground/10">
              <p className="text-foreground/70 mb-4">
                Text content is managed in the source code components:
              </p>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li>• Hero section: /components/hero-section.tsx</li>
                <li>• Text banner: /components/text-banner.tsx</li>
                <li>• Benefits section: /components/benefits-section.tsx</li>
                <li>• Home sections: /components/home-preview-sections.tsx</li>
              </ul>
            </div>
          </div>
        )

      case 'film-categories':
        return (
          <div className="space-y-6">
            <h3 className="text-3xl font-display font-bold">Film Categories</h3>
            <div className="bg-foreground/5 rounded-lg p-8 border border-foreground/10">
              <p className="text-foreground/70 mb-4">Current film categories:</p>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li>• Period Drama</li>
                <li>• Bollywood Movie</li>
                <li>• Tollywood Movie</li>
                <li>• Web Series</li>
                <li>• TV Serials</li>
                <li>• TV Ads</li>
                <li>• Movie Promotion</li>
              </ul>
              <p className="text-sm text-foreground/60 mt-4">
                Edit categories in: /components/projects-content.tsx
              </p>
            </div>
          </div>
        )

      case 'projects':
        return (
          <div className="space-y-6">
            <h3 className="text-3xl font-display font-bold">Projects</h3>
            <div className="bg-foreground/5 rounded-lg p-8 border border-foreground/10">
              <p className="text-foreground/70">
                Project data is managed in the source code. Each category page displays the section image placeholder.
              </p>
              <p className="text-sm text-foreground/60 mt-4">
                Edit project details in: /app/categories/[slug]/page.tsx
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <main className="flex-1 p-12 bg-background overflow-y-auto">
      <motion.div
        key={activeSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderContent()}
      </motion.div>
    </main>
  )
}
