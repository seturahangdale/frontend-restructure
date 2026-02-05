'use client'

export function SubsidyContent() {
  return (
    <main className="pt-24 pb-32 bg-background">
      <section className="max-w-5xl mx-auto px-6">
        <h1 className="text-5xl font-display font-bold mb-6">
          Madhya Pradesh Film Shoot Subsidy
        </h1>

        <p className="text-lg text-muted-foreground mb-10">
          Madhya Pradesh has emerged as one of India’s most film-friendly states,
          offering attractive film shooting subsidies and incentives to encourage
          national and international productions.
        </p>

        <h3 className="text-2xl font-semibold mb-4">
          Why Choose Madhya Pradesh for Film Shooting?
        </h3>

        <ul className="list-disc pl-6 space-y-2 mb-10">
          <li>Heritage monuments, forests, rivers & landscapes</li>
          <li>Single-window facilitation</li>
          <li>Support for films, OTT, TV & ads</li>
          <li>Cost-effective production</li>
          <li>Trained local crew & artists</li>
        </ul>

        <h3 className="text-2xl font-semibold mb-4">
          Film Shooting Subsidy & Incentives
        </h3>

        <p className="mb-6">
          Subsidy on eligible production expenses, incentives for promoting MP’s
          culture, benefits for local employment and OTT projects.
        </p>

        <h3 className="text-2xl font-semibold mb-4">
          Eligible Projects
        </h3>

        <ul className="list-disc pl-6 space-y-2 mb-12">
          <li>Feature Films</li>
          <li>Web Series & OTT Content</li>
          <li>TV Serials & Reality Shows</li>
          <li>Documentaries & Short Films</li>
          <li>Advertisement & Corporate Films</li>
        </ul>

        {/* ✅ DOWNLOAD BUTTON (FIXED) */}
        <a
          href="/forms/Subsidy_Form_2025_CA_Certificate.pdf"
          target="_blank"
          rel="noopener noreferrer"
          download
          className="inline-flex items-center justify-center px-8 py-4 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition"
        >
          Download Subsidy Form
        </a>
      </section>
    </main>
  )
}

