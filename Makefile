dev:
	docker-compose up -d

clean:
	docker-compose down
	
setup:
	docker-compose exec server bash -c "\
		bundle install &&\
		rake db:create &&\
		rake db:migrate" &&\
	docker-compose exec client yarn install