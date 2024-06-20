FROM python:3.11

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY requirements.txt /app/requirements.txt
RUN pip install --upgrade pip && pip install -r requirements.txt

RUN apt-get update && \
  apt-get install -y --no-install-recommends \
  libreoffice \
  fonts-ipafont-gothic && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*


RUN mkdir -p /var/run/gunicorn

CMD ["gunicorn", "config.wsgi", "--bind=unix:/var/run/gunicorn/gunicorn.sock", "--reload"]
