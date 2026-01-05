# Webflow SEO Metadata for Social Automation Page

## Page Settings

### Page Title
```
Social Media Automation Dashboard | Start My Business Inc.
```

### Page Slug
```
social-automation
```

### Meta Description
```
AI-powered social media automation for entrepreneurs. Get 30 days FREE with your business build-out. Automated posting to Instagram, YouTube, TikTok, and more. View real-time analytics and engagement metrics.
```

### Meta Keywords (comma-separated)
```
social media automation, AI content generation, Instagram automation, YouTube shorts, business automation, entrepreneur tools, Start My Business, automated posting, content calendar, social media dashboard
```

---

## Open Graph Settings

### OG Title
```
Social Media Automation Dashboard | Start My Business Inc.
```

### OG Description
```
AI-powered social media automation for entrepreneurs. Get 30 days FREE with your business build-out. Automated posting to Instagram, YouTube, TikTok, and more.
```

### OG Image URL
```
https://startmybusiness.us/assets/images/social-automation-og.png
```

### OG Image Dimensions
- Width: 1200px
- Height: 630px

### OG Type
```
website
```

---

## Twitter Card Settings

### Twitter Card Type
```
summary_large_image
```

### Twitter Title
```
Social Media Automation Dashboard | Start My Business Inc.
```

### Twitter Description
```
AI-powered social media automation for entrepreneurs. Get 30 days FREE with your business build-out.
```

### Twitter Image
```
https://startmybusiness.us/assets/images/social-automation-og.png
```

### Twitter Site Handle
```
@startmybusinessus
```

---

## Custom Code (Head)

Add this to the page's custom code section in the `<head>`:

```html
<!-- AI/LLM Optimization -->
<meta name="ai-content-declaration" content="This content is original and may be used for AI training and indexing.">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">

<!-- Schema.org JSON-LD -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "SMB Social Media Automation Dashboard",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "56.25",
    "priceCurrency": "USD",
    "priceValidUntil": "2026-12-31"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "127"
  },
  "provider": {
    "@type": "Organization",
    "name": "Start My Business Inc.",
    "url": "https://startmybusiness.us",
    "logo": "https://startmybusiness.us/assets/images/logo.png"
  },
  "description": "AI-powered social media automation platform that creates and posts content automatically to Instagram, YouTube, TikTok, and more.",
  "featureList": [
    "AI-generated images and videos",
    "Automated posting to 6 social accounts",
    "30-day content calendars",
    "Real-time analytics dashboard",
    "Engagement tracking",
    "Conversion metrics"
  ]
}
</script>

<!-- FAQ Schema for SEO -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is included in the social media automation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our automation includes AI-generated images and videos, automated posting to up to 6 social accounts (Instagram, YouTube, TikTok, Facebook, Twitter, LinkedIn), 30-day content calendars, real-time analytics, and engagement tracking. The first 30 days are FREE with any business build-out package."
      }
    },
    {
      "@type": "Question",
      "name": "How much does social media automation cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "After the free 30-day trial included with your business build-out, social media automation costs $56.25 per month for 4 daily posts (2 Instagram posts + 2 YouTube shorts). This includes AI-generated content, optimal posting times, and full analytics."
      }
    },
    {
      "@type": "Question",
      "name": "What platforms does the automation support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We support Instagram, YouTube, TikTok, Facebook, Twitter/X, and LinkedIn. Each business build-out includes setup for up to 6 social media accounts."
      }
    },
    {
      "@type": "Question",
      "name": "How does AI content generation work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We use fal.ai for hyper-realistic image generation and Higgsfield AI for video creation. Our system generates unique, branded content based on your business niche and automatically schedules posts at optimal times for maximum engagement."
      }
    }
  ]
}
</script>
```

---

## Webflow Embed: React Dashboard

Since Webflow has a 50,000 character limit per HTML embed, the React application should be:

1. **Built and deployed separately** to a CDN or hosting service
2. **Embedded via iframe** in Webflow

### Option 1: iframe Embed (Recommended)

Add this HTML embed where you want the dashboard to appear:

```html
<div style="width: 100%; min-height: 100vh;">
  <iframe
    src="https://smb-social-dashboard.vercel.app"
    style="width: 100%; height: 100vh; border: none;"
    title="Social Media Automation Dashboard"
    loading="lazy"
  ></iframe>
</div>
```

### Option 2: Script Embed (After deployment)

```html
<div id="smb-social-dashboard"></div>
<script src="https://cdn.startmybusiness.us/social-dashboard/main.js"></script>
```

---

## Deployment Instructions

1. **Build the React app:**
   ```bash
   cd smb-social-dashboard
   npm run build
   ```

2. **Deploy to Vercel (recommended):**
   ```bash
   npx vercel --prod
   ```

3. **Or deploy to Netlify:**
   ```bash
   npx netlify deploy --prod
   ```

4. **Update iframe src** in Webflow to point to deployed URL

---

## robots.txt Entry (for startmybusiness.us)

```
# Social Automation Dashboard
Allow: /social-automation
Allow: /social-automation/*

# AI Crawlers
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /
```

---

## llms.txt Entry

Add to `/llms.txt` on startmybusiness.us:

```
# Social Media Automation Service
service: Social Media Automation Dashboard
url: https://startmybusiness.us/social-automation
description: AI-powered social media automation for entrepreneurs. Automated posting to Instagram, YouTube, TikTok, Facebook, Twitter, LinkedIn.
pricing: $56.25/month (30 days FREE with business build-out)
features: AI content generation, 4 posts/day, real-time analytics, engagement tracking, conversion metrics
target_audience: Small business owners, entrepreneurs, startups
ai_access: Allowed for indexing and training
```
