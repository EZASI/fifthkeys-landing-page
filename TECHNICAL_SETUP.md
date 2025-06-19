# 🔧 FifthKeys Landing Page - Technical Setup Guide

**For Engineers & Developers**

This guide provides step-by-step technical instructions for setting up, developing, and deploying the FifthKeys landing page.

## 📋 Prerequisites

### Required Software
- **Git** 2.25+
- **Python** 3.6+ (for development server)
- **Node.js** 16+ (optional, for build tools)
- **Modern Browser** (Chrome 90+, Firefox 88+, Safari 14+)

### Development Environment
- **Code Editor:** VS Code, Sublime, or similar
- **Terminal:** Command line access
- **GitHub Account:** For repository access

## 🚀 Quick Setup (5 minutes)

### 1. Clone Repository
```bash
git clone https://github.com/EZASI/fifthkeys-landing-page.git
cd fifthkeys-landing-page
```

### 2. Start Development Server
```bash
cd landing-page
python3 -m http.server 8000
```

### 3. Access Application
```
http://localhost:8000
```

### 4. Verify Setup
- ✅ Homepage loads correctly
- ✅ Navigation menu works
- ✅ Forms are interactive
- ✅ Responsive design on mobile
- ✅ Dark/light theme toggle works

## 📁 Project Architecture

### Directory Structure
```
fifthkeys_ui_ux/
├── landing-page/              # Main website files
│   ├── index.html            # Homepage (entry point)
│   ├── features.html         # Feature pages
│   ├── solutions.html        # Solutions showcase
│   ├── pricing.html          # Pricing tables
│   ├── integrations.html     # Integration info
│   ├── resources.html        # Content hub
│   ├── contact.html          # Contact forms
│   ├── 404.html             # Error page
│   ├── ai-checker.html      # AI tool page
│   ├── styles.css           # Main stylesheet (5000+ lines)
│   ├── scripts.js           # JavaScript functionality
│   ├── manifest.json        # PWA manifest
│   ├── robots.txt           # SEO crawler rules
│   ├── sitemap.xml          # SEO sitemap
│   └── assets/              # Static resources
│       ├── *.svg            # Vector graphics & logos
│       ├── *.png            # Raster images
│       ├── *.jpg            # Photos & mockups
│       └── favicon.svg      # Site icon
├── admin-interface/          # Admin dashboard mockup
├── *.md                     # Documentation files
└── validation_report.md     # Code validation results
```

### Key Files Explained

**Core HTML Files:**
- `index.html` - Main landing page with hero section
- `features.html` - Product feature showcase
- `pricing.html` - Pricing tiers and calculator
- `contact.html` - Lead capture forms

**Styling & Assets:**
- `styles.css` - Complete CSS framework (grid, components, themes)
- `scripts.js` - Interactive functionality (forms, animations, calculators)
- `assets/` - All images, logos, and icons

## 🛠️ Development Workflow

### 1. Local Development Setup

#### Method A: Python Server (Recommended)
```bash
cd landing-page
python3 -m http.server 8000
# Access: http://localhost:8000
```

#### Method B: Node.js Server
```bash
cd landing-page
npx http-server -p 8000
# Access: http://localhost:8000
```

#### Method C: VS Code Live Server
1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

### 2. Development Best Practices

#### Code Organization
- **HTML:** Semantic markup, accessibility attributes
- **CSS:** BEM methodology, CSS custom properties
- **JavaScript:** Vanilla ES6+, modular functions
- **Images:** Optimized SVG for icons, WebP for photos

#### File Naming Conventions
- Use kebab-case: `dashboard-preview.svg`
- Descriptive names: `revenue-calculator.js`
- Consistent prefixes: `client-logo-1.svg`

### 3. Making Changes

#### HTML Updates
```bash
# Edit content in HTML files
vim landing-page/index.html

# Test changes immediately (auto-reload)
# Browser will show changes on save
```

#### CSS Modifications
```css
/* Update CSS variables in styles.css */
:root {
  --primary-500: #60a5fa;  /* Brand blue */
  --radius-lg: 12px;       /* Border radius */
}

/* Add custom components */
.custom-component {
  /* Your styles here */
}
```

#### JavaScript Features
```javascript
// Add to scripts.js
function newFeature() {
  // Implementation
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', newFeature);
```

## 🎨 Customization Guide

### 1. Branding Updates

#### Logo Replacement
```bash
# Replace logo files
cp your-logo.svg landing-page/assets/fifthkeys-logo.svg
cp your-logo-dark.svg landing-page/assets/fifthkeys-logo-dark.svg
```

#### Color Scheme
```css
/* Update in styles.css */
:root {
  --primary-500: #YOUR_COLOR;
  --primary-600: #YOUR_DARKER_COLOR;
  /* Update all color variables */
}
```

### 2. Content Updates

#### Text Content
```html
<!-- Update in respective HTML files -->
<h1>Your Company Name</h1>
<p>Your value proposition</p>
```

#### Pricing Plans
```html
<!-- Edit pricing.html -->
<div class="pricing-card">
  <h3>Your Plan Name</h3>
  <div class="price">$XX</div>
  <!-- Update features list -->
</div>
```

### 3. Feature Configuration

#### Contact Forms
```html
<!-- Update form action in contact.html -->
<form action="YOUR_FORM_HANDLER" method="POST">
  <!-- Form fields -->
</form>
```

#### Analytics Integration
```html
<!-- Add to <head> in all HTML files -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 🚀 Deployment Options

### Option 1: GitHub Pages (Free)

#### Setup Steps:
1. **Enable GitHub Pages:**
   ```
   Repository Settings → Pages → Source: Deploy from branch
   Branch: main → Folder: /landing-page
   ```

2. **Custom Domain (Optional):**
   ```bash
   echo "yourdomain.com" > landing-page/CNAME
   git add . && git commit -m "Add custom domain"
   git push
   ```

3. **Access Site:**
   ```
   https://yourusername.github.io/fifthkeys-landing-page/
   ```

### Option 2: Netlify (Recommended)

#### Automatic Deployment:
```bash
# 1. Connect GitHub repo to Netlify
# 2. Build settings:
#    Base directory: (leave empty)
#    Publish directory: landing-page
#    Build command: (leave empty - no build needed)

# 3. Environment variables (if needed):
CONTACT_FORM_URL=https://your-form-handler.com
```

#### Custom Domain:
```bash
# In Netlify dashboard:
# Domain settings → Add custom domain → yourdomain.com
# Configure DNS: CNAME → netlify-subdomain.netlify.app
```

### Option 3: Vercel

#### Deploy Command:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
vercel --prod

# Configuration:
# Framework: Other
# Root Directory: landing-page
# Build Command: (leave empty)
# Output Directory: (leave empty)
```

### Option 4: AWS S3 + CloudFront

#### S3 Setup:
```bash
# Create S3 bucket
aws s3 mb s3://your-bucket-name

# Upload files
aws s3 sync landing-page/ s3://your-bucket-name --delete

# Configure bucket for website hosting
aws s3 website s3://your-bucket-name --index-document index.html --error-document 404.html
```

#### CloudFront Distribution:
```json
{
  "Origins": {
    "DomainName": "your-bucket-name.s3-website-region.amazonaws.com",
    "OriginPath": "",
    "CustomOriginConfig": {
      "HTTPPort": 80,
      "HTTPSPort": 443,
      "OriginProtocolPolicy": "http-only"
    }
  }
}
```

## 🔧 Advanced Configuration

### 1. Performance Optimization

#### Image Optimization
```bash
# Install optimization tools
npm install -g imagemin-cli

# Optimize images
imagemin landing-page/assets/*.png --out-dir=landing-page/assets/optimized
```

#### CSS Minification
```bash
# Install cssnano
npm install -g cssnano-cli

# Minify CSS
cssnano landing-page/styles.css landing-page/styles.min.css
```

### 2. SEO Configuration

#### Meta Tags Update
```html
<!-- Update in all HTML files -->
<title>Your Company | Your Value Proposition</title>
<meta name="description" content="Your SEO description">
<meta property="og:title" content="Your Company">
<meta property="og:description" content="Your social media description">
<meta property="og:image" content="https://yourdomain.com/assets/og-image.jpg">
```

#### Sitemap Generation
```xml
<!-- Update sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2025-06-19</lastmod>
    <priority>1.0</priority>
  </url>
  <!-- Add all pages -->
</urlset>
```

### 3. Form Integration

#### Netlify Forms
```html
<!-- Add to forms in HTML -->
<form name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact">
  <!-- Form fields -->
</form>
```

#### Formspree Integration
```html
<!-- Update form action -->
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <!-- Form fields -->
</form>
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Server Won't Start
```bash
# Check if port is in use
lsof -i :8000

# Kill existing process
kill -9 $(lsof -ti:8000)

# Use different port
python3 -m http.server 8080
```

#### 2. Images Not Loading
```bash
# Check file paths (case sensitive)
ls -la landing-page/assets/

# Verify image references in HTML
grep -r "assets/" landing-page/*.html
```

#### 3. CSS Not Applied
```bash
# Check CSS file path
ls -la landing-page/styles.css

# Verify CSS link in HTML
grep "styles.css" landing-page/*.html

# Clear browser cache: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
```

#### 4. JavaScript Errors
```javascript
// Open browser console (F12)
// Check for JavaScript errors
// Common fix: ensure scripts.js is loaded
```

### Performance Issues

#### Large File Sizes
```bash
# Check file sizes
du -h landing-page/assets/*

# Compress images
# Use online tools: tinypng.com, squoosh.app
```

#### Slow Loading
```bash
# Enable gzip compression on server
# Optimize images
# Minify CSS/JS files
# Use CDN for assets
```

## 📊 Testing & Validation

### 1. Browser Testing
```bash
# Test in multiple browsers:
# - Chrome (desktop/mobile)
# - Firefox (desktop/mobile)
# - Safari (desktop/mobile)
# - Edge (desktop)

# Use browser dev tools for responsive testing
```

### 2. Performance Testing
```bash
# Google PageSpeed Insights
# https://pagespeed.web.dev/

# Lighthouse audit (Chrome DevTools)
# F12 → Lighthouse tab → Generate report
```

### 3. Accessibility Testing
```bash
# Wave Web Accessibility Evaluator
# https://wave.webaim.org/

# Check color contrast ratios
# Verify keyboard navigation
# Test with screen readers
```

### 4. HTML/CSS Validation
```bash
# W3C HTML Validator
# https://validator.w3.org/

# W3C CSS Validator
# https://jigsaw.w3.org/css-validator/
```

## 🔐 Security Considerations

### 1. Form Security
```html
<!-- Add CSRF protection -->
<input type="hidden" name="_token" value="CSRF_TOKEN">

<!-- Validate on server side -->
<!-- Sanitize all inputs -->
```

### 2. Content Security Policy
```html
<!-- Add to <head> -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;">
```

### 3. HTTPS Enforcement
```javascript
// Redirect HTTP to HTTPS
if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
  location.replace(`https:${location.href.substring(location.protocol.length)}`);
}
```

## 📞 Support & Maintenance

### Getting Help
- **GitHub Issues:** Report bugs or request features
- **Documentation:** Check README.md for general info
- **Code Comments:** Inline documentation in CSS/JS files

### Regular Maintenance
```bash
# Weekly tasks:
# - Update dependencies
# - Check broken links
# - Monitor performance
# - Review analytics

# Monthly tasks:
# - Update content
# - Check SEO rankings
# - Security updates
# - Backup files
```

### Version Control
```bash
# Create feature branches
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature: description"

# Push and create PR
git push origin feature/new-feature
```

---

## 📝 Quick Reference

### Essential Commands
```bash
# Start development server
python3 -m http.server 8000

# Git workflow
git add .
git commit -m "Your message"
git push

# Check file structure
tree landing-page/
# or
find landing-page/ -type f | head -20
```

### Important File Paths
- Entry point: `landing-page/index.html`
- Styles: `landing-page/styles.css`
- Scripts: `landing-page/scripts.js`
- Assets: `landing-page/assets/`

### Contact for Technical Issues
- 📧 **Email:** dev@fifthkeys.com
- 🐛 **Bug Reports:** GitHub Issues
- 📚 **Documentation:** This file + README.md

---

**Last Updated:** June 2025  
**Version:** 1.0  
**Compatible With:** Modern browsers, Python 3.6+ 