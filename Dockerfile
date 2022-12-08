FROM node:16.13.0

WORKDIR /usr/src/app

# time setting
#RUN ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime

# language setting
RUN apt-get update && apt-get install -y \
  locales \
  vim \
  jq

RUN locale-gen C.UTF-8
ENV LC_ALL C.UTF-8
RUN apt-get install fonts-nanum
RUN fc-cache -fv

COPY . .

RUN npm ci 
RUN npm run build

EXPOSE 3010

