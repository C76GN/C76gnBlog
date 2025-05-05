SHELL := /bin/bash

VPS_USER := ca7d6mginn
VPS_HOST := 82.180.162.11
VPS_TARGET_DIR := /var/www/C76gnBlog
SOURCE_DIR := .vitepress/dist/

build:
	@echo "🚀 Starting build..."
	@npm run docs:build
	@echo "✅ Build finished."

deploy: build
	@echo "☁️ Deploying to VPS..."
	@rsync -avz --delete $(SOURCE_DIR) $(VPS_USER)@$(VPS_HOST):$(VPS_TARGET_DIR)
	@echo "🎉 Deployment complete!"

all: deploy

clean:
	@rm -rf .vitepress/dist

.PHONY: build deploy all clean