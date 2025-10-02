# Kube Todo

A simple full-stack todo app for Kubernetes with monitoring and CI/CD.

## Features
- Flask backend API (CRUD for todos)
- React frontend
- PostgreSQL database
- Kubernetes manifests for all components
- Monitoring: Prometheus, Grafana, Alertmanager
- GitHub Actions CI/CD workflow

## Quick Start

### 1. Build & Push Images
- Backend: `docker build -t ghcr.io/<your-gh-username>/kube-todo-backend:latest ./backend`
- Frontend: `docker build -t ghcr.io/<your-gh-username>/kube-todo-frontend:latest ./frontend`
- Push both images to GitHub Container Registry

### 2. Deploy to Kubernetes
- Ensure your `kubectl` context points to your cluster
- Apply manifests: `kubectl apply -f k8s/`

### 3. Access the App
- The frontend and backend are exposed via Ingress (see `k8s/ingress.yaml`)
- Default paths: `/` (frontend), `/api` (backend)

### 4. Monitoring
- Prometheus, Grafana, and Alertmanager are deployed under `k8s/monitoring/`
- Grafana dashboards: pod CPU/memory, request count
- Alertmanager: triggers alert if backend pod restarts >3 times in 10 minutes (configure email in `alertmanager-configmap.yaml`)

## GitHub Actions CI/CD
- On push to `main`, builds and pushes Docker images, then deploys to cluster
- Requires `KUBECONFIG` secret in repo for cluster access

---

Replace placeholder values (e.g., email, registry username) as needed.
# TD