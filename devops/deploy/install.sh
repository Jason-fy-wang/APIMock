
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

# ingress-controller logs
kubectl logs -n ingress-nginx deploy/ingress-nginx-controller -f

# jump into k8s cluter and test service
## 
kubectl run tmp --rm -it --image=busybox -- sh
## wget -O- http://mockapi.mockspace.svc.cluster.local:8080/hello

# k8s port-forward
kubectl port-forward -n mockspace svc/mockservice 8080:80

#create config from cmd
kubectl create configmap mock-config --from-literal=key=value -n mockspace

#create secret from cmd
kubectl create secret generic mock-secret --from-literal=username=admin --from-literal=password=secret -n mockspace

# set namespace config:
kubectl config set-context --current --namespace=mockspace

## debug service account access
kubectl run tmp --rm -it --image=busybox --serviceaccount=mock-sa -- sh    # run specific account
kubectl auth can-i <VERB> <RESOURCE> --as=system:serviceaccount:<NAMESPACE>:<SERVICE_ACCOUNT_NAME>
kubectl auth can-i delete deployment --as=system:serviceaccount:mockspace:mock-sa
kubectl auth can-i get deployment --as=system:serviceaccount:mockspace:mock-sa

## create sericeaccount token
kubectl create token <service_name>  --duration=24h -n <namespace>
curl -H "Authorization: Bearer <token>" -k https://<cluster_ip>:6443/api/v1/namespaces/<namespace>/pods
