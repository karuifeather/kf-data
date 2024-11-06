require('dotenv').config();

const matter = require('gray-matter');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload an image to Cloudinary
async function uploadImage(filePath, folderName) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folderName,
      use_filename: true,
      unique_filename: true,
    });
    return result.secure_url; // This is the Cloudinary URL
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}

// Function to update markdown with Cloudinary URLs
async function updateMarkdownWithCloudinaryURLs(markdownFilePath, folderName) {
  let markdownContent = fs.readFileSync(markdownFilePath, 'utf-8');

  // Parse the front matter and content
  const parsed = matter(markdownContent);
  const metadata = parsed.data;
  let updatedContent = markdownContent;

  // Array of image fields to check in front matter (thumbnail, blog_image)
  const imageFields = ['thumbnail', 'blog_image'];

  // upload meta images
  for (const field of imageFields) {
    if (metadata[field]) {
      const imagePath = path.join(
        path.dirname(markdownFilePath),
        metadata[field]
      );
      const uploadedImageUrl = await uploadImage(imagePath, folderName);
      if (uploadedImageUrl) {
        metadata[field] = uploadedImageUrl; // update metadata
      }
    }
  }

  // Upload images embedded in the content (images in ![alt text](image_path) syntax)
  const contentImages = updatedContent.match(/!\[.*\]\((.*?)\)/g); // Match all ![alt text](image_path)
  if (contentImages) {
    for (const img of contentImages) {
      const imagePath = img.match(/\((.*?)\)/)[1]; // Extract image path
      if (!imagePath.includes('http')) {
        // Only upload if it's a local path
        const uploadedImageUrl = await uploadImage(
          path.join(path.dirname(markdownFilePath), imagePath),
          folderName
        );
        if (uploadedImageUrl) {
          updatedContent = updatedContent.replace(imagePath, uploadedImageUrl); // Replace with Cloudinary URL
        }
      }
    }
  }

  const updatedMarkdown = matter.stringify(updatedContent, metadata);

  // Save the updated markdown content
  fs.writeFileSync(markdownFilePath, updatedMarkdown, 'utf-8');
  console.log(`Updated markdown file: ${markdownFilePath}`);
}

// check for argv
if (process.argv.length < 4) {
  console.log('Usage: node uploadIimages.js <markdownFilePath> <folderName>');
  process.exit(0);
}

// Get parameters from the command line
const markdownFilePath = process.argv[2]; // First argument is the markdown file path
const folderName = process.argv[3]; // Second argument is the folder name in Cloudinary

// Check if arguments were passed
if (!markdownFilePath || !folderName) {
  console.error(
    'Please provide both the markdown file path and Cloudinary folder name.'
  );
  process.exit(1); // Exit the script if required arguments are missing
}

// Call the function with arguments passed from the command line
updateMarkdownWithCloudinaryURLs(markdownFilePath, folderName);
