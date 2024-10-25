# Photo AI

## Project Overview

Photo AI is an AI-driven tool for photographers that automates the categorization and tagging of photos, saving time and increasing organization for large photo libraries.

## Project Architecture

The project follows a microservices architecture. The core model, trained with TensorFlow, is deployed as a standalone API, allowing the frontend to interact with it independently. Images are processed on the backend, and results are returned to the frontend for user display.

## Design Philosophy

The design prioritizes ease of access, with a simple upload interface and drag-and-drop functionality. Tagging is automated but allows user editing, balancing automation with user control.

## Technologies Used

- **AI Model**: TensorFlow
- **Frontend**: React
- **Image Processing**: OpenCV

## Problems Faced

Handling image files efficiently proved challenging. Initial versions struggled with performance, especially with large image sizes. After optimization, batch processing and file compression reduced lag significantly.

## Results

Photo AI has successfully automated the categorization process, and feedback indicates it reduces organization time by over 50% compared to manual tagging.
