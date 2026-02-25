
# kind create cluster
kind create cluster --name mock-cluster --config devops/k8s/kind-config.yaml

# nginx ingress controller
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml

kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=90s

# load image into kind
kind load docker-image mock:1.0 --name mock-cluster

# check kind images
docker exec -it mock-control-plane crictl images


