# A Modern Web App Built with Angular, NestJS, and AWS

Welcome to **Featherly**! This project is a modern web application that offers an intuitive interface for exploring and booking tours. The frontend is built using Angular, while the backend is powered by NestJS. Deployed on AWS, Featherly uses services like Lambda, API Gateway, S3, CloudFront, and Route 53 for efficient performance, scalability, and global reach.

## **Overview of the Architecture**

### **Frontend (Angular Application - `client`)**

The frontend is the heart of Featherly, providing users with a seamless experience for browsing tours and booking activities.

- I’ve used **Angular** for the frontend, with **Nx** for enhanced development capabilities.
- The static website is hosted on **AWS S3**, providing scalable storage and fast delivery.
- To ensure a smooth global user experience, we use **AWS CloudFront** for content distribution.
- **Route 53** handles DNS, routing the traffic to `featherly.karuifeather.com`.
- Displays detailed tour listings, booking options, and user reviews.
- Integrates with the backend via API calls for dynamic data.
- Built using the `production` configuration, optimizing performance and security.
- Every push to the `main` branch triggers deployment through **GitHub Actions**, ensuring the site is always up-to-date.

For more details, check out the [client documentation](https://github.com/karuifeather/featherly/tree/main/docs/client.md).

### **Backend (NestJS Application - `server`)**

The backend powers the business logic and handles data storage, user authentication, and more.

- **Framework**: Built with **NestJS**, a powerful framework that promotes modular architecture.
- The backend is deployed serverlessly using **AWS Lambda**.
- We package the backend into a Docker image and host it on **AWS ECR**, which Lambda pulls during execution.
- The custom domain `api.featherly.karuifeather.com` is managed by **AWS API Gateway**, which securely routes requests to Lambda.
- CORS is configured to ensure secure communication between the frontend and backend.
- **API Documentation**: Detailed API docs are available through Swagger at [API Docs](https://api.featherly.karuifeather.com/docs).

For further information, visit the [server documentation](https://github.com/karuifeather/featherly/tree/main/docs/server.md).

## **Deployment Process: A Seamless CI/CD Pipeline**

The deployment of Featherly follows a continuous integration and continuous delivery (CI/CD) pipeline to ensure rapid and reliable updates.

- The Angular application is built using the Nx build pipeline and deployed to **AWS S3**.
- After the backend is Dockerized, the image is pushed to **AWS ECR**, and Lambda is updated to use the latest version.
- **GitHub Actions** handles the build and deployment process. Every push to the `main` branch triggers the deployment of both the frontend and backend applications.

## **Current Features**

Here’s a quick overview of what’s currently available in Featherly:

- Beautifully designed user interface built with **Tailwind CSS**.
- Tour listings with filters, booking options, and user reviews.
- API endpoints to fetch data stored in **MongoDB**.
- Handles user authentication, payment processing, and tour data management.

## **How Featherly Comes Together in Production**

- Users can visit `https://featherly.karuifeather.com` to access the Angular app hosted on S3 and delivered via CloudFront.
- API requests (such as fetching tours or making bookings) are routed through `https://api.featherly.karuifeather.com`, managed by API Gateway and Lambda.
- API Gateway routes requests to Lambda, where business logic like payment processing and data fetching occurs.
- **GitHub Actions** ensures that changes to the frontend and backend are deployed seamlessly, with Lambda updates and S3 deployments automatically triggered after each push to `main`.
  
- CloudFront caches the frontend for fast, low-latency delivery across the globe.
- API Gateway manages scalable access to Lambda functions for handling user interactions.

---

## **Conclusion**

Featherly is a highly scalable and performant web application, leveraging modern technologies like Angular, NestJS, and AWS to deliver a smooth experience for both users and developers. Whether you’re browsing tours or handling bookings, the combination of serverless architecture and a fully automated CI/CD pipeline ensures that Featherly runs efficiently and reliably. 

Check out the project on [GitHub](https://github.com/karuifeather/featherly) to learn more about how it all works or contribute to the project!
