docker exec -it opa-publisher-client yarn -cwd app/client build
docker stop opa-publisher-client
docker start opa-publisher-client


