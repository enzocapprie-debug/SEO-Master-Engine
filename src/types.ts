export interface MetaConfig {
  blogTitle: string;
  slogan: string;
  defaultLogo: string;
  dnsPrefetchList: string[];
  enableErrorRobots: boolean;
  enableArchiveRobots: boolean;
  enableOpenGraph: boolean;
}

export interface SchemaConfig {
  schemaType: 'BlogPosting' | 'WebSite' | 'Organization';
  canonicalUrl: string;
  title: string;
  description: string;
  featuredImage: string;
  authorName: string;
  authorProfileUrl: string;
  publisherName: string;
  publisherLogo: string;
}

export interface SpeedConfig {
  enableLazyLoad: boolean;
  enableWidgetDefer: boolean;
  deferDelay: number;
}

export interface RobotsConfig {
  domain: string;
  disallowPaths: string[];
  sitemaps: string[];
}

export interface BacklinkStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'success';
}
