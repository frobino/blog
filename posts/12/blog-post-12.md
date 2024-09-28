---
title: Minikube tutorial.
description: Minikube tutorial.
date: 2024-09-28
tags:
- k8s
layout: "layouts/post.njk"
---

## Install minikube

```
mkdir Tools_installation_files
cd Tools_installation_files/
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

## Install docker (dependency for minikube)

```
sudo apt-get install     ca-certificates     curl     gnupg     lsb-release
sudo mkdir -m 0755 -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo   "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
minikube start
sudo usermod -aG docker $USER
newgrp docker
```

## Start minikube

```
minikube start
minikube kubectl -- get po -A
emacs ~/.bashrc
minikube stop
kubectl get all
```

## Reset minikube

```
minikube delete --all
```

## Install ArgoCD

```
kubectl get services -A
minikube delete --all
minikube start
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
$ kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo
kubectl port-forward svc/argocd-server -n argocd 8080:443
kubectl create namespace argocd-apps
```

## Create and start a POD

```
minikube start
kubectl get pods
kubectl get services
kubectl run my-ng1 --image=nginx --restart=Never
kubectl get pods
kubectl exec --stdin --tty my-ng1 -- /bin/bash
touch rbac.yaml
emacs rbac.yaml
kubectl apply -f rbac.yaml
kubectl exec --stdin --tty my-ng1 -- /bin/bash
```

## Enable a pod in a namespace to create pods in another namespace

```
kubectl create namespace spawner
kubectl create namespace pool
kubectl apply -f rbac.yaml (read/write auth to spawner)
kubectl get clusterrole
kubectl exec --stdin --tty my-ng1 -n spawner -- /bin/bash
kubectl get pods
kubectl get pods -n spawner
kubectl get pods -n pool
kubectl delete pod busybox-test -n pool
kubectl get pods -n pool
```
