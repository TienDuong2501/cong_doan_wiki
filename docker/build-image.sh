export IMAGE_VERSION=1.0.0
export IMAGE_NAME=opa-publisher-client

# build image opa-publisher-client
cd ..
docker build -t ${IMAGE_NAME}:${IMAGE_VERSION} .