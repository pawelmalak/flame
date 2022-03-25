docker build -t pawelmalak/flame -t "pawelmalak/flame:$1" -f .docker/Dockerfile . \
  && docker push pawelmalak/flame && docker push "pawelmalak/flame:$1"