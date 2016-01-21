FROM cusspvz/node:5.1.1
MAINTAINER José Moreira <jose.moreira@findhit.com>

ARG NODE_ENV=production
ADD . /app
RUN npm install
CMD [ "start" ]
