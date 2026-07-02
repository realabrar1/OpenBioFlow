# Kubernetes Deployments via GitOps (ArgoCD)

This folder contains the declarative Kubernetes resources for the OpenBioFlow AI platform.

## Directory Structure

```
kubernetes/
├── base/                   # Baseline resource configurations (common config)
│   ├── kustomization.yaml
│   ├── gateway-deploy.yaml
│   └── web-deploy.yaml
└── overlays/               # Environment specific overrides
    ├── staging/
    │   └── kustomization.yaml
    └── production/
        └── kustomization.yaml
```

## Progressive Delivery
- **Staging Overlay:** Syncs automatically on merges to the `main` branch.
- **Production Overlay:** Rollouts require updates to tag overrides inside `overlays/production/kustomization.yaml` matching semantic version releases (e.g., updating images tags to `v1.2.0`). ArgoCD monitors this repository and applies updates via Canary rollouts.
