up:
	mkdir -p apps/frontend/dist
	docker compose -f compose.yaml -f compose.dev.yaml up -d
build:
	docker compose build

django-install:
	docker compose -f compose.yaml -f compose.dev.yaml run --rm app-back sh -c "django-admin startproject config ."
	docker compose -f compose.yaml -f compose.dev.yaml run --rm app-back sh -c "python manage.py startapp app"

react-install:
	docker compose run --rm app-front sh -c 'npm create vite@latest . -- --template react-ts'

local-pip-install:
	pip install -r docker/backend/python/requirements.txt

local-venv-active:
	python3 -m venv venv
	source venv/bin/activate.fish

local-venv:
	@make local-venv-active
	@make local-pip-install

create-project:
	mkdir -p apps
	@make build
	@make django-install
	@make react-install
	@make init

init:
	@make build
	@make up

remake:
	@make destroy
	@make init
stop:
	docker compose stop
down:
	docker compose down --remove-orphans
down-v:
	docker compose down --remove-orphans --volumes
restart:
	@make stop
	@make up
destroy:
	docker compose down --rmi all --volumes --remove-orphans
ps:
	docker compose ps
logs:
	docker compose logs
logs-watch:
	docker compose logs --follow
log-web:
	docker compose logs web-back
log-web-watch:
	docker compose logs --follow web-back
log-app-front:
	docker compose logs app-front
log-app-front-watch:
	docker compose logs --follow app-front
log-app-back:
	docker compose logs app-back
log-app-back-watch:
	docker compose logs --follow app-back
app-back:
	docker compose exec app-back bash
web-back:
	docker compose exec web-back bash

migrate:
	docker compose exec app-back python manage.py makemigrations
	docker compose exec app-back python manage.py migrate

createsuperuser:
	docker compose exec app-back python manage.py createsuperuser

dmp:
	docker compose exec app-back python manage.py dumpdata
	
db:
	docker compose exec db bash
sql:
	docker compose exec db bash -c 'mysql -u $$MYSQL_USER -p$$MYSQL_PASSWORD $$MYSQL_DATABASE'
app-front:
	docker compose exec app-front sh
npm-install:
	docker compose exec app-front npm install
npm-package-upgrade:
	docker compose run --rm app-front sh -c "npm i -g ncu"
	docker compose run --rm app-front sh -c "ncu --target minor"
	docker compose run --rm app-front sh -c "ncu u --target minor"
npm-dev:
	docker compose exec app npm run dev
npm-dev-build:
	cp .env.dev apps/frontend/.env
	docker compose run --rm app-front sh -c 'npm run build'
npm-prod-build:
	docker compose -f compose.yaml -f compose.prod.yaml up -d
	docker compose exec app-front npm run build
npm-test:
	docker compose run --rm app-front sh -c 'npm run test'
npm-tsc:
	docker compose run --rm app-front sh -c 'npm run tsc'


restart-back:
	docker compose stop app-back
	docker compose up -d app-back

remigrate:
	docker compose exec app-back python manage.py migrate
	docker compose exec app-back python manage.py dumpdata -o dump.json app
	@make seed
	docker compose exec app-back rm -rf dump.json
	
seed:
	docker compose exec app-back python manage.py migrate --fake app zero
	docker compose exec app-back python manage.py makemigrations
	docker compose exec db mysql -u root -p -e "DROP DATABASE django; CREATE DATABASE django;"
	docker compose exec app-back python manage.py migrate
	docker compose exec app-back python manage.py loaddata dump.json
