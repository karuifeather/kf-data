const fs = require('fs');
const path = require('path');

// Path to categories and latest.json
const blogDir = path.join(__dirname, '../blog');
const latestFilePath = path.join(blogDir, 'latest.json');

// Get all categories in the blog directory
const categories = fs.readdirSync(blogDir).filter((file) => {
  return fs.statSync(path.join(blogDir, file)).isDirectory();
});

// Collect all articles from JSON files in each category
let articles = [];

// Wrap each readdir and file read in a promise
const categoryPromises = categories.map((category) => {
  const blogPath = path.join(blogDir, category);

  return new Promise((resolve, reject) => {
    fs.readdir(blogPath, (err, files) => {
      if (err) {
        console.log('Unable to scan directory: ' + err);
        reject(err);
      } else {
        const filePromises = files.map((file, i) => {
          const filePath = path.join(blogPath, file);

          if (i != 0) {
            return new Promise((fileResolve, fileReject) => {
              fs.readFile(filePath, 'utf-8', (readErr, content) => {
                if (readErr) {
                  console.log('Unable to read file: ' + file);
                  fileReject(readErr);
                } else {
                  try {
                    const articleData = JSON.parse(content);
                    articles.push({
                      title: articleData.title,
                      keywords: articleData.keywords,
                      tags: articleData.tags,
                      thumbnail: articleData.thumbnail,
                      category,
                      date: new Date(articleData.date), // Convert to Date for sorting
                    });
                    fileResolve();
                  } catch (parseErr) {
                    console.log('Error parsing JSON in file: ' + file);
                    fileReject(parseErr);
                  }
                }
              });
            });
          }
        });

        // Wait for all files in this category to be read
        Promise.all(filePromises).then(resolve).catch(reject);
      }
    });
  });
});

// Wait for all category read promises to complete
Promise.all(categoryPromises)
  .then(() => {
    // Sort articles by date in descending order
    articles.sort((a, b) => b.date - a.date);

    // Get the latest 6 articles
    const latestArticles = articles.slice(0, 6);

    // Write to latest.json
    fs.writeFileSync(latestFilePath, JSON.stringify(latestArticles, null, 2));
    console.log('latest.json updated successfully!');
  })
  .catch((err) => console.error('Error reading directories or files:', err));
