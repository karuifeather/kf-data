const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Initialize Firebase Admin SDK with the service account
const serviceAccount = require('../firebase.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://karuifeather.firebaseio.com',
});

// Get Firestore reference
const db = admin.firestore();

// Function to upload metadata to Firebase
async function uploadMetadataToFirebase(markdownFilePath) {
  // Read the markdown file
  const markdownContent = fs.readFileSync(markdownFilePath, 'utf-8');

  // Parse the front matter
  const parsed = matter(markdownContent);
  const metadata = parsed.data; // This contains the front matter as a JSON object

  // Get the collection reference (e.g., 'posts' or 'projects')
  const collectionRef = markdownFilePath.startsWith('./blog')
    ? db.collection('posts') // For blog posts
    : db.collection('projects'); // For projects

  try {
    // Add a document with auto-generated ID
    const docRef = await collectionRef.add(metadata);
    console.log(
      `Successfully uploaded metadata for ${markdownFilePath} to Firebase with ID: ${docRef.id}`
    );
  } catch (error) {
    console.error(`Error uploading metadata for ${markdownFilePath}:`, error);
  }
}

if (process.argv.length < 3) {
  console.log('Usage: node uploadMeta.js <markdownFilePath>');
  process.exit(0);
}

// Get the markdown file path from the terminal arguments
const markdownFilePath = process.argv[2];

if (!markdownFilePath) {
  console.error('Please provide the markdown file path.');
  process.exit(1);
}

// Upload metadata to Firebase
uploadMetadataToFirebase(markdownFilePath);
