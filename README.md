## Prerequisites

- Docker installed on your machine
- Minikube installed on your machine
- kubectl installed on your machine

## Docker Commands

### Build Docker Images

```bash
# Navigate to the directory of each service and build the Docker images
cd path/to/api-gateway
docker build -t 20i0964/mlops_a2:api-gateway .

cd path/to/auth-service
docker build -t 20i0964/mlops_a2:auth-service .

cd path/to/database-service
docker build -t 20i0964/mlops_a2:database-service .

cd path/to/frontend
docker build -t 20i0964/mlops_a2:frontend .
```

### Push Docker Images to Docker Hub

```bash
# Push each image to Docker Hub
docker push 20i0964/mlops_a2:api-gateway
docker push 20i0964/mlops_a2:auth-service
docker push 20i0964/mlops_a2:database-service
docker push 20i0964/mlops_a2:frontend
```

## Kubernetes Commands

### Start Minikube

```bash
minikube start
```

### Create Deployment for Each Service

```bash
# Create deployments for each service
kubectl apply -f path/to/api-gateway/deployment.yaml
kubectl apply -f path/to/auth-service/deployment.yaml
kubectl apply -f path/to/database-service/deployment.yaml
kubectl apply -f path/to/frontend/deployment.yaml
```

### Create Service for Each Deployment

```bash
# Expose services
kubectl apply -f path/to/api-gateway/service.yaml
kubectl apply -f path/to/auth-service/service.yaml
kubectl apply -f path/to/database-service/service.yaml
kubectl apply -f path/to/frontend/service.yaml
```

### Check the Status of Deployments and Pods

```bash
# Get the status of the deployments and pods
kubectl get deployments
kubectl get pods
```

### Access Services

```bash
# Get the NodePort for the frontend service
kubectl get services frontend

# Access the frontend application using the NodePort (replace <NodePort> with actual port)
http://<minikube_ip>:<NodePort>
```

### Scale Deployments

```bash
# Scale deployments to maintain 3 replicas
kubectl scale deployment api-gateway --replicas=3
kubectl scale deployment auth-service --replicas=3
kubectl scale deployment database-service --replicas=3
kubectl scale deployment frontend --replicas=3
```

### Clean Up

```bash
# Delete all deployments and services
kubectl delete -f path/to/api-gateway/deployment.yaml
kubectl delete -f path/to/auth-service/deployment.yaml
kubectl delete -f path/to/database-service/deployment.yaml
kubectl delete -f path/to/frontend/deployment.yaml

kubectl delete -f path/to/api-gateway/service.yaml
kubectl delete -f path/to/auth-service/service.yaml
kubectl delete -f path/to/database-service/service.yaml
kubectl delete -f path/to/frontend/service.yaml

