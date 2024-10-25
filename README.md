# Blog and Portfolio Repository

This repository contains a structured setup for a personal blog and portfolio website. It is designed to support categorized blog posts, detailed project information, and automated updates for the latest articles, all while using GitHub as a CMS.

## Table of Contents

- [Project Overview](#project-overview)
- [Directory Structure](#directory-structure)
- [Setup Instructions](#setup-instructions)
- [Content Management](#content-management)
- [Automation with GitHub Actions](#automation-with-github-actions)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This repository is built for a blog and portfolio website that:

- Features categorized blog posts with detailed metadata for SEO.
- Displays a portfolio of projects, each with summary and in-depth information.
- Allows easy updates to show the latest 6 articles on the sidebar using GitHub Actions.

## Directory Structure

```
/portfolio                        # Portfolio projects
  - portfolio.json                # Overview of portfolio projects
  - ProjectName.json              # Detailed info for each project
  /markdowns                      # Markdown descriptions for each project
    - ProjectName.md
  /images                         # Images related to portfolio projects

/blog                             # Blog content
  - categories.json               # Overview of all blog categories
  - latest.json                   # Metadata for the latest 6 articles
  /CategoryName                   # Folder for each blog category
    - category.json               # Overview of articles in the category
    - ArticleName.json            # Detailed info for each article
    /markdowns                    # Markdown descriptions for each article
      - ArticleName.md
    /images                       # Images related to blog articles
      - article-image1.jpg

/scripts                          # Automation scripts
  - update-latest.js              # Script to update latest.json

/.github/workflows                # GitHub Actions workflows
  - update-latest.yml             # Workflow to automate latest.json update
```

## Content Management

### Adding New Blog Articles

1. **Create a new JSON file** in the appropriate category folder under `/blog`, e.g., `/blog/LifeAndInterests`.
2. **Add Markdown content** to the respective `/markdowns` folder.
3. **Update `category.json`** in the category folder to include the new article.

### Adding New Portfolio Projects

1. **Add project details** to `portfolio.json` for a quick overview.
2. **Create a detailed JSON file** with additional metadata and links to images.
3. **Write project details** in Markdown format and place it in `/portfolio/markdowns`.

## Automation with GitHub Actions

This repository uses GitHub Actions to automate updating `latest.json` with metadata for the latest 6 blog articles.

- **Workflow**: Located at `.github/workflows/update-latest.yml`
- **Script**: `scripts/update-latest.js` scans all blog categories, sorts articles by date, and writes the latest 6 to `latest.json`.

To run this workflow:

- Push a new blog article or edit an existing one in `/blog`.
- The workflow will trigger automatically, update `latest.json`, and commit the change back to the repo.
