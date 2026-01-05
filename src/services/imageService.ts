// Image service for fetching from GitHub repo
const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/AiMagic5000/smb-social-images/main';

export interface ImageManifest {
  version: string;
  lastUpdated: string;
  baseUrl: string;
  posts: Record<string, {
    imageUrl: string;
    platform: string;
    uploadedAt: string;
  }>;
}

// Cache the manifest to avoid repeated fetches
let manifestCache: ImageManifest | null = null;
let manifestFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function fetchImageManifest(): Promise<ImageManifest | null> {
  const now = Date.now();
  
  // Return cached manifest if still valid
  if (manifestCache && (now - manifestFetchTime) < CACHE_DURATION) {
    return manifestCache;
  }

  try {
    const response = await fetch(GITHUB_RAW_BASE + '/manifest.json?t=' + now);
    if (!response.ok) return null;
    
    manifestCache = await response.json();
    manifestFetchTime = now;
    return manifestCache;
  } catch (error) {
    console.error('Failed to fetch image manifest:', error);
    return null;
  }
}

export function getImageUrl(postId: string, platform: string, status: string, scheduledDate: string): string {
  // For scheduled/future posts, always show placeholder
  const postDate = new Date(scheduledDate);
  const now = new Date();
  
  if (status === 'scheduled' || postDate > now) {
    return getPlaceholderUrl('scheduled', platform);
  }

  // For posted content, try to get from GitHub
  // The image path follows pattern: platform/YYYY-MM-DD-postId.png
  const dateStr = postDate.toISOString().split('T')[0];
  const githubImageUrl = GITHUB_RAW_BASE + '/' + platform + '/' + dateStr + '-' + postId + '.png';
  
  return githubImageUrl;
}

export function getPlaceholderUrl(type: 'scheduled' | 'error' | 'loading', platform: string): string {
  const colors: Record<string, string> = {
    instagram: 'E4405F',
    youtube: 'FF0000'
  };
  
  const color = colors[platform] || '2563eb';
  
  const messages: Record<string, string> = {
    scheduled: 'AI-Generated+Content%0A%0AThis+content+will+be%0Agenerated+and+posted%0Aon+the+scheduled+date%0A%0APowered+by+fal.ai',
    error: 'Image+Not+Found%0A%0AThis+post+may+not%0Ahave+been+published+yet',
    loading: 'Loading...'
  };

  return 'https://placehold.co/1080x1920/' + color + '/ffffff?text=' + messages[type];
}

// Check if an image exists at the GitHub URL
export async function checkImageExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}
