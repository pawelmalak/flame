docker buildx build \
  --platform linux/arm/v7,linux/arm64,linux/amd64 \
  -f .docker/Dockerfile.multiarch \
  -t pawelmalak/flame:multiarch \
  -t "pawelmalak/flame:multiarch$1" \
  --push .