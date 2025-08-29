export function PersonJsonLd() {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Saravanan Kalimuthu',
    jobTitle: 'Senior Software Engineer',
    email: 'mailto:sarvaruna@outlook.com',
    url: 'https://example.com',
    sameAs: [
      'https://github.com/sarvarunajvm',
      'https://www.linkedin.com/in/saravanan-kalimuthu-01a0a9113',
    ],
  }
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
  )
}
