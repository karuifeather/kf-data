---
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
---

When I launched [karuifeather.com](https://karuifeather.com), I chose AWS S3 as the hosting solution, using it to store and serve the site’s content. Everything ran smoothly until I pushed updates to the site and realized that changes weren’t appearing live. To give some context, the site was built with React, which introduced a few intricacies when diagnosing the issue.

## The Problem

To get a clearer understanding, I started by inspecting my S3 objects directly. Accessing the link to `index.html` from S3, I found that everything was, in fact, up to date there—S3 was correctly serving the latest version of the site.

Confused, I checked the site at its public domain and still saw no updates. At this point, the problem became apparent: CloudFront was involved. But what exactly was causing the delay?

By inspecting the site served through CloudFront, I saw this:

![CloudFront cached content](https://res.cloudinary.com/drj6tdlhy/image/upload/v1730922319/blog/screenshot-index_udsw8s.png)

Notice the stale filenames for the JavaScript and CSS files. These files weren’t matching the latest build files in S3, as seen here:

![S3 updated files](https://res.cloudinary.com/drj6tdlhy/image/upload/v1730922319/blog/screenshot-s3_t924vs.png)

To clarify, the issue was that while S3 contained the correct files, CloudFront was still serving older cached versions.

## Understanding CloudFront’s Caching Behavior

This issue relates to how CloudFront manages its cache. When you set up a CloudFront distribution, it caches the files from your S3 bucket. While CloudFront notices new files added to the bucket, it doesn’t automatically update existing files in the cache if they’re modified. As a result, updates to existing files, like `index.html`, are often ignored unless you tell CloudFront to invalidate its cache.

### Solution: Invalidate the Cache

To solve this, you need to create an invalidation in CloudFront. You can do this manually by navigating to the `Invalidations` tab in your CloudFront distribution and adding an invalidation for `/*` to refresh all files, or specify individual paths if preferred.

![Invalidations Tab in CloudFront](https://res.cloudinary.com/drj6tdlhy/image/upload/v1730922319/blog/invalidations_lxsrwj.png)

This approach forces CloudFront to pull the updated files from S3, ensuring the latest changes are served to users.

## Automating Cache Invalidations

Manually creating invalidations can be tedious, especially if you’re frequently updating your site. Since my project is hosted on GitHub, I used GitHub Actions to automate this process. Here’s the workflow configuration that automatically triggers a CloudFront invalidation upon deployment. I adapted this from the [Amazon CloudFront Invalidation Action](https://github.com/marketplace/actions/amazon-cloudfront-create-invalidation-action-for-github-actions):

```yml
- name: Configure AWS credentials
  uses: aws-actions/configure-aws-credentials@v1
  with:
    aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
    aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    aws-region: us-east-1

- name: Create CloudFront invalidation
  uses: josemando/aws-cloudfront-create-invalidation@v1
  with:
    distribution-id: ${{ secrets.AWS_DISTRIBUTION_ID }}
    paths: /*
```

> **Note**: Ensure your environment variables are set up in your repository’s secrets (like `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `AWS_DISTRIBUTION_ID`). Refer to [GitHub’s documentation](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions) on securely managing secrets.

## Wrapping Up

Automating CloudFront invalidations resolved the caching issues for my site updates, allowing changes to go live without delay. This setup provides a seamless experience for both maintaining content and ensuring visitors always see the latest version. If you're managing an S3-hosted site with CloudFront, setting up automated invalidations can save you time and prevent potential confusion around stale content.
