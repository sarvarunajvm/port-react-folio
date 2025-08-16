/**
 * SEO Utilities and Meta Tags Management
 * Comprehensive SEO optimization for better search engine visibility
 */
// SEO React Hook
import { useEffect } from 'react';

import { personalInfo, statistics } from '../../data/portfolio.data';

interface MetaTags {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  image?: string;
  url?: string;
  type?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterCreator?: string;
  ogType?: string;
  ogLocale?: string;
  canonicalUrl?: string;
}

interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: unknown;
}

export class SEOManager {
  private static instance: SEOManager;
  private baseUrl: string;
  private defaultMeta: MetaTags;

  private constructor() {
    this.baseUrl = import.meta.env.VITE_BASE_URL || 'https://portfolio.example.com';
    this.defaultMeta = {
      title: `${personalInfo.firstname} ${personalInfo.lastname} - Senior Software Engineer`,
      description: `${personalInfo.firstname} ${personalInfo.lastname} is a Senior Software Engineer with ${statistics.yearsOfExperience}+ years of experience in full-stack development, specializing in React, TypeScript, and modern web technologies.`,
      keywords: [
        'Software Engineer',
        'Full Stack Developer',
        'React Developer',
        'TypeScript',
        'JavaScript',
        'Web Development',
        'Portfolio',
        personalInfo.firstname,
        personalInfo.lastname,
        'Senior Developer',
        'Frontend Engineer',
        'Backend Developer',
      ],
      author: `${personalInfo.firstname} ${personalInfo.lastname}`,
      image: `${this.baseUrl}/og-image.png`,
      url: this.baseUrl,
      type: 'website',
      twitterCard: 'summary_large_image',
      ogType: 'website',
      ogLocale: 'en_US',
    };
  }

  static getInstance(): SEOManager {
    if (!SEOManager.instance) {
      SEOManager.instance = new SEOManager();
    }
    return SEOManager.instance;
  }

  /**
   * Update document meta tags
   */
  updateMetaTags(meta: Partial<MetaTags>): void {
    const finalMeta = { ...this.defaultMeta, ...meta };

    // Update title
    document.title = finalMeta.title;
    this.setMetaTag('description', finalMeta.description);
    this.setMetaTag('keywords', finalMeta.keywords.join(', '));
    this.setMetaTag('author', finalMeta.author);

    // Open Graph tags
    this.setMetaTag('og:title', finalMeta.title, 'property');
    this.setMetaTag('og:description', finalMeta.description, 'property');
    this.setMetaTag('og:image', finalMeta.image, 'property');
    this.setMetaTag('og:url', finalMeta.url, 'property');
    this.setMetaTag('og:type', finalMeta.ogType, 'property');
    this.setMetaTag('og:locale', finalMeta.ogLocale, 'property');

    // Twitter Card tags
    this.setMetaTag('twitter:card', finalMeta.twitterCard);
    this.setMetaTag('twitter:title', finalMeta.title);
    this.setMetaTag('twitter:description', finalMeta.description);
    this.setMetaTag('twitter:image', finalMeta.image);
    if (finalMeta.twitterCreator) {
      this.setMetaTag('twitter:creator', finalMeta.twitterCreator);
    }

    // Canonical URL
    if (finalMeta.canonicalUrl) {
      this.setLinkTag('canonical', finalMeta.canonicalUrl);
    }
  }

  /**
   * Set individual meta tag
   */
  private setMetaTag(
    name: string,
    content?: string,
    attribute: 'name' | 'property' = 'name'
  ): void {
    if (!content) return;

    let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;

    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, name);
      document.head.appendChild(element);
    }

    element.content = content;
  }

  /**
   * Set link tag
   */
  private setLinkTag(rel: string, href: string): void {
    let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;

    if (!element) {
      element = document.createElement('link');
      element.rel = rel;
      document.head.appendChild(element);
    }

    element.href = href;
  }

  /**
   * Generate structured data for rich snippets
   */
  generateStructuredData(): StructuredData[] {
    const person: StructuredData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: `${personalInfo.firstname} ${personalInfo.lastname}`,
      url: this.baseUrl,
      email: personalInfo.email,
      jobTitle: 'Senior Software Engineer',
      worksFor: {
        '@type': 'Organization',
        name: 'PayPal',
      },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'University of Madras',
      },
      knowsAbout: [
        'Software Engineering',
        'Web Development',
        'React',
        'TypeScript',
        'Java',
        'Spring Boot',
        'Cloud Computing',
        'Microservices',
      ],
      sameAs: [
        personalInfo.social.github,
        personalInfo.social.linkedin,
        personalInfo.social.stackoverflow || '',
        personalInfo.social.devto || '',
      ].filter(Boolean),
    };

    const website: StructuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: `${personalInfo.firstname} ${personalInfo.lastname} Portfolio`,
      url: this.baseUrl,
      author: {
        '@type': 'Person',
        name: `${personalInfo.firstname} ${personalInfo.lastname}`,
      },
      description: this.defaultMeta.description,
      keywords: this.defaultMeta.keywords.join(', '),
    };

    const breadcrumb: StructuredData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: this.baseUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Portfolio',
          item: `${this.baseUrl}/portfolio`,
        },
      ],
    };

    return [person, website, breadcrumb];
  }

  /**
   * Inject structured data into page
   */
  injectStructuredData(): void {
    const data = this.generateStructuredData();

    data.forEach((schema, index) => {
      const scriptId = `structured-data-${index}`;
      let script = document.getElementById(scriptId);

      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        (script as HTMLScriptElement).type = 'application/ld+json';
        document.head.appendChild(script);
      }

      script.textContent = JSON.stringify(schema);
    });
  }

  /**
   * Generate sitemap entries
   */
  generateSitemapEntries(): string[] {
    const pages = ['', '/about', '/experience', '/projects', '/skills', '/contact'];

    return pages.map((page) => `${this.baseUrl}${page}`);
  }

  /**
   * Preload critical resources
   */
  preloadResources(): void {
    const resources = [
      { href: '/fonts/inter-var.woff2', as: 'font', type: 'font/woff2' },
      { href: '/photo.png', as: 'image' },
    ];

    resources.forEach((resource) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      if (resource.type) {
        link.type = resource.type;
      }
      if (resource.as === 'font') {
        link.crossOrigin = 'anonymous';
      }
      document.head.appendChild(link);
    });
  }

  /**
   * Set page-specific meta tags
   */
  setPageMeta(page: 'home' | 'about' | 'experience' | 'projects' | 'skills' | 'contact'): void {
    const pageMeta: Record<string, Partial<MetaTags>> = {
      home: {
        title: `${personalInfo.firstname} ${personalInfo.lastname} - Senior Software Engineer Portfolio`,
        description: `Welcome to the portfolio of ${personalInfo.firstname} ${personalInfo.lastname}, a Senior Software Engineer with ${statistics.yearsOfExperience}+ years of experience.`,
      },
      about: {
        title: `About ${personalInfo.firstname} ${personalInfo.lastname} - Senior Software Engineer`,
        description: `Learn more about ${personalInfo.firstname} ${personalInfo.lastname}, a passionate Senior Software Engineer specializing in full-stack development.`,
      },
      experience: {
        title: `Experience - ${personalInfo.firstname} ${personalInfo.lastname}`,
        description: `Professional experience of ${personalInfo.firstname} ${personalInfo.lastname}, including work at PayPal and other leading tech companies.`,
      },
      projects: {
        title: `Projects - ${personalInfo.firstname} ${personalInfo.lastname}`,
        description: `Explore the portfolio of projects built by ${personalInfo.firstname} ${personalInfo.lastname}, including open source contributions and enterprise applications.`,
      },
      skills: {
        title: `Skills & Technologies - ${personalInfo.firstname} ${personalInfo.lastname}`,
        description: `Technical skills and expertise of ${personalInfo.firstname} ${personalInfo.lastname} in React, TypeScript, Java, and modern web technologies.`,
      },
      contact: {
        title: `Contact ${personalInfo.firstname} ${personalInfo.lastname}`,
        description: `Get in touch with ${personalInfo.firstname} ${personalInfo.lastname} for collaboration, opportunities, or technical discussions.`,
      },
    };

    if (pageMeta[page]) {
      this.updateMetaTags(pageMeta[page]);
    }
  }
}

// Export singleton instance
export const seoManager = SEOManager.getInstance();

export const useSEO = (
  page?: 'home' | 'about' | 'experience' | 'projects' | 'skills' | 'contact'
) => {
  useEffect(() => {
    const manager = SEOManager.getInstance();

    if (page) {
      manager.setPageMeta(page);
    }

    manager.injectStructuredData();
    manager.preloadResources();

    return () => {
      // Cleanup if needed
    };
  }, [page]);
};
