#!/usr/bin/env bash

# build image
docker build -t mock:1.0 -f Dockerfile .

# create kind cluster
kind create cluster --name mock --config=./devops/deploy/kind-config.yaml

# add controller
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml

# load image into kind cluster
kind load docker-image mock:1.0 --name mock


# apply resources
kubectl apply -f ./devops/deploy/k8s/mock_namespace.yaml
kubectl apply -f ./devops/deploy/k8s/mock_config.yaml
kubectl apply -f ./devops/deploy/k8s/mock_secret.yaml
kubectl apply -f ./devops/deploy/k8s/mock_role.yaml
kubectl apply -f ./devops/deploy/k8s/mock_service_account.yaml
kubectl apply -f ./devops/deploy/k8s/mock_role_binding.yaml
kubectl apply -f ./devops/deploy/k8s/mock_deployment_inject_env.yaml
kubectl apply -f ./devops/deploy/k8s/mock_ingress.yaml



