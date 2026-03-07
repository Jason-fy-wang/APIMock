#!/usr/bin/env bash

# create kind cluster
kind create cluster --name mock --config=./devops/deploy/kind-config.yaml

# add controller
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml

# load image into kind cluster
kind load docker-image mock:1.0 --name mock






