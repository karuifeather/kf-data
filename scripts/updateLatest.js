const fs = require('fs');
const path = require('path');

// Path to categories and latest.json
const blogDir = path.join(__dirname, '../blog');
const latestFilePath = path.join(blogDir, 'latest.json');

// Get all categories in the blog directory
const categories = fs.readdirSync(blogDir).filter((file) => {
  return fs.statSync(path.join(blogDir, file)).isDirectory();
});

// Collect all articles from category.json files
let articles = [];

categories.forEach((category) => {
  const categoryPath = path.join(blogDir, category, 'category.json');
  if (fs.existsSync(categoryPath)) {
    const categoryArticles = JSON.parse(fs.readFileSync(categoryPath, 'utf-8'));
    // Add category to each article's metadata
    categoryArticles.forEach((article) => {
      article.category = category;
      articles.push(article);
    });
  }
});

// Sort articles by date in descending order and get the latest 6
articles.sort((a, b) => new Date(b.date) - new Date(a.date));
const latestArticles = articles.slice(0, 6);

// Write to latest.json
fs.writeFileSync(latestFilePath, JSON.stringify(latestArticles, null, 2));

console.log('latest.json updated successfully!');
