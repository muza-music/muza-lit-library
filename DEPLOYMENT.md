# Muza Lit Library - ECS Deployment Guide

This guide explains how to deploy the Muza Lit Library React Router SSR application to AWS ECS using GitHub Actions and Terraform.

## Prerequisites

- GitHub repository with proper permissions
- AWS infrastructure managed by Terraform
- ECR repository: `muza/frontend`
- ECS cluster and service configured via Terraform

## Environment Variables

The application requires the following environment variables:

```bash
# Application Configuration
NODE_ENV=production
PORT=3000

# API Configuration
API_BASE_URL=https://your-api-domain.com
GRAPHQL_ENDPOINT=https://your-api-domain.com/metadata/graphql
AUDIO_FILES_ENDPOINT=https://your-api-domain.com/upload/files
IMG_FILES_ENDPOINT=https://your-api-domain.com/upload/files
```

## Local Testing

1. Build and test locally:

```bash
# Build the Docker image
docker build -t muza-lit-library .

# Run with docker-compose
docker-compose up --build

# Or run directly
docker run -p 3000:3000 \
  -e API_BASE_URL=http://localhost:8000 \
  -e GRAPHQL_ENDPOINT=http://localhost:8000/metadata/graphql \
  -e AUDIO_FILES_ENDPOINT=http://localhost:8000/upload/files \
  -e IMG_FILES_ENDPOINT=http://localhost:8000/upload/files \
  muza-lit-library
```

## GitHub Actions Deployment

The application is automatically deployed via GitHub Actions when you push to `main` or `develop` branches:

### Automatic Deployment

- **`develop` branch** → Deploys to **staging** environment
- **`main` branch** → Deploys to **production** environment

### Manual Deployment

You can also trigger manual deployments via GitHub Actions:

1. Go to Actions tab in your repository
2. Select "Build and Deploy Frontend" workflow
3. Click "Run workflow"
4. Choose the environment (staging/production)

### Deployment Process

1. **Build**: Docker image is built and pushed to ECR (`muza/frontend`)
2. **Update**: ECS task definition is updated with new image
3. **Deploy**: ECS service is updated with new task definition
4. **Health Check**: Application health is verified via `/staticData/allData.json`

## Infrastructure Management

The AWS infrastructure is managed via Terraform in the `muza-infra` directory:

### Terraform Configuration

- **Staging**: `muza-infra/environments/staging/`
- **Production**: `muza-infra/environments/production/`

### Key Resources

- **ECR Repository**: `muza/frontend`
- **ECS Cluster**: `muza-{environment}-cluster`
- **ECS Service**: `muza-{environment}-frontend`
- **ALB**: Routes traffic to frontend service on port 3000

### Environment Variables (Managed by Terraform)

The frontend service receives these environment variables from Terraform:

- `NODE_ENV`: Set to environment name (staging/production)
- `API_BASE_URL`: Points to the ALB for API access

## Manual ECS Deployment (Alternative)

If you need to deploy manually outside of GitHub Actions:

### 1. Build and Push to ECR

```bash
# Use the provided build script
./build-and-deploy.sh

# Or manually:
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
AWS_REGION=eu-west-1
ECR_REPOSITORY=muza/frontend

# Login to ECR
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# Build and tag image
docker build -t $ECR_REPOSITORY .
docker tag $ECR_REPOSITORY:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:latest

# Push to ECR
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:latest
```

### 2. Update ECS Service

The task definition is managed by Terraform, so you can update the service directly:

```bash
# Update the ECS service with new image
aws ecs update-service \
  --cluster muza-staging-cluster \
  --service muza-staging-frontend \
  --force-new-deployment
```

## Troubleshooting

### Common Issues

1. **Build fails in GitHub Actions**

   - Check that all dependencies are properly listed in `package.json`
   - Verify the Dockerfile syntax and build context
   - Check GitHub Actions logs for specific error messages

2. **Container won't start**

   - Verify environment variables are correctly set in Terraform
   - Check ECS task logs in CloudWatch
   - Ensure the application can bind to port 3000

3. **Health check fails**

   - Verify the `/staticData/allData.json` endpoint is accessible
   - Check if API endpoints are reachable from the container
   - Review application logs for errors

4. **Memory issues**
   - Increase memory allocation in Terraform ECS service configuration
   - Monitor CloudWatch metrics for memory usage

### Debugging Commands

```bash
# Check ECS service status
aws ecs describe-services \
  --cluster muza-staging-cluster \
  --services muza-staging-frontend

# View task logs
aws logs tail /ecs/muza-staging-frontend --follow

# Check container health
aws ecs describe-tasks \
  --cluster muza-staging-cluster \
  --tasks $(aws ecs list-tasks --cluster muza-staging-cluster --service-name muza-staging-frontend --query 'taskArns[]' --output text)
```

## Health Checks

The application includes a health check endpoint at `/staticData/allData.json` that:

- Returns 200 if the application is healthy
- Returns 500 if there's an internal error
- The Docker health check runs every 30 seconds

## Monitoring

- CloudWatch Logs: `/ecs/muza-lit-library`
- Application metrics available at `/staticData/allData.json`
- Container health status in ECS console

## Troubleshooting

1. **Build fails**: Ensure all dependencies are properly installed
2. **Container won't start**: Check environment variables and port configuration
3. **Health check fails**: Verify the API endpoints are accessible
4. **Memory issues**: Increase memory allocation in task definition

## Security Considerations

- Use IAM roles for ECS tasks
- Store sensitive environment variables in AWS Systems Manager Parameter Store
- Enable VPC flow logs for network monitoring
- Use security groups to restrict access
