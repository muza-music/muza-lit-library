#!/bin/bash

# Muza Lit Library - Build and Deploy Script
# This script builds the Docker image and pushes it to ECR

set -e

# Configuration
AWS_REGION=${AWS_REGION:-eu-west-1}
ECR_REPOSITORY=${ECR_REPOSITORY:-muza/frontend}
IMAGE_TAG=${IMAGE_TAG:-latest}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Helper functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed or not in PATH"
        exit 1
    fi
    
    if ! command -v aws &> /dev/null; then
        log_error "AWS CLI is not installed or not in PATH"
        exit 1
    fi
    
    # Check if AWS credentials are configured
    if ! aws sts get-caller-identity &> /dev/null; then
        log_error "AWS credentials are not configured"
        exit 1
    fi
    
    log_info "Prerequisites check passed"
}

# Get AWS account ID
get_aws_account_id() {
    AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
    log_info "AWS Account ID: $AWS_ACCOUNT_ID"
}

# Create ECR repository if it doesn't exist
create_ecr_repository() {
    log_info "Checking if ECR repository exists..."
    
    if aws ecr describe-repositories --repository-names $ECR_REPOSITORY --region $AWS_REGION &> /dev/null; then
        log_info "ECR repository $ECR_REPOSITORY already exists"
    else
        log_info "Creating ECR repository $ECR_REPOSITORY..."
        aws ecr create-repository --repository-name $ECR_REPOSITORY --region $AWS_REGION
        log_info "ECR repository created successfully"
    fi
}

# Login to ECR
login_to_ecr() {
    log_info "Logging in to ECR..."
    aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com
    log_info "Successfully logged in to ECR"
}

# Build Docker image
build_image() {
    log_info "Building Docker image..."
    docker build -t $ECR_REPOSITORY:$IMAGE_TAG .
    log_info "Docker image built successfully"
}

# Tag and push image
push_image() {
    local ecr_uri="$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:$IMAGE_TAG"
    
    log_info "Tagging image for ECR..."
    docker tag $ECR_REPOSITORY:$IMAGE_TAG $ecr_uri
    
    log_info "Pushing image to ECR..."
    docker push $ecr_uri
    
    log_info "Image pushed successfully to ECR"
    log_info "ECR URI: $ecr_uri"
}

# Main execution
main() {
    log_info "Starting build and deploy process for Muza Lit Library"
    
    check_prerequisites
    get_aws_account_id
    create_ecr_repository
    login_to_ecr
    build_image
    push_image
    
    log_info "Build and deploy process completed successfully!"
    log_info "You can now deploy to ECS using the image: $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:$IMAGE_TAG"
}

# Run main function
main "$@"
