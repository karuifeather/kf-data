# Blog & Portfolio Automation

This project automates the management of blog posts and portfolio content, including image uploads to Cloudinary, metadata extraction from markdown files, and syncing with Firebase.

## Workflow Overview

1. **Markdown Files**: Store blog and portfolio items in the `blog` and `portfolio` folders as markdown files with metadata.
2. **Cloudinary Image Upload**: Upload images to Cloudinary and replace local image paths with Cloudinary URLs.
3. **Firebase Sync**: Push metadata (title, description, tags, etc.) to Firebase Firestore for easy querying.

## Setup

### Installation

1. Clone the repo.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file for Cloudinary credentials:
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. Download the Firebase service account key (`firebase-admin-sdk.json`) and place it in the project directory. I have renamed it to `firebase.json`. Change the database url in `uploadMeta.js` script as needed.

## File Structure

```plaintext
/karuifeather-data
  ├── /blog              # Markdown files for blog posts
  │   ├── first-blog.md  # Example blog post markdown file
  │   └── another-post.md
  ├── /projects          # Markdown files for projects
  │   ├── first-project.md
  │   └── another-project.md
  ├── .env               # Cloudinary credentials
  ├── scripts
  │   ├── uploadImages.js # Run this before Meta to have update image paths
  │   └── uploadMeta.js   # Uploads to Firestore Database
  ├── .gitignore         # Git ignore file to exclude sensitive files
  └── README.md          # This README file
```

## Prepare Markdown Files

Organize your markdown files under the `blog/` or `projects/` directory. Ensure that each file includes front matter with metadata fields such as `title`, `slug`, `description`, and image paths.

## Run the Script

To upload metadata from a markdown file, run:

```
node scripts/uploadMeta.js <markdownFilePath>
```

To upload images from a markdown file, run:

```
node scripts/uploadImages.js <markdownFilePath> <folderNameInCloudinary>
```

### 5. Firebase Firestore Structure

The document stored in `posts` will look like:

```yml
title: Optimizing CloudFront for Automatic Cache Invalidation on AWS
slug: cloudfront-cache-invalidation
author: Aashaya Aryal
date: '2024-11-04'
modified_date: '2024-11-04'
keywords:
  - CloudFront
  - AWS
  - S3
  - Cache Invalidation
  - GitHub Actions
description: >-
  Learn how to set up automatic cache invalidations in AWS CloudFront, using
  GitHub Actions to automate the process and keep your S3-hosted content
  up-to-date.
thumbnail: >-
  https://res.cloudinary.com/drj6tdlhy/image/upload/v1730922317/blog/optimizing-cloudfront-thumbnail_qrk8jt.png
blog_image: >-
  https://res.cloudinary.com/drj6tdlhy/image/upload/v1730922318/blog/optimizing-cloudfront-main_qtiomi.png
content: /blog/cloudfront-cache-invalidation.md
category: software-engineering
tags:
  - CloudFront
  - AWS
  - Automation
  - Caching
  - GitHub Actions
```
