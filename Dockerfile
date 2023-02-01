FROM node:18-alpine AS build

# Create app directory
WORKDIR /usr/src/app

# RUN npm install -g pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate 

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json pnpm-lock.yaml ./

# If you are building your code for production
RUN pnpm i --frozen-lockfile
RUN pnpm build
RUN rm -rf node_modules && RUN pnpm i --prod --frozen-lockfile 

# --- Prod ---
FROM node:18-alpine AS prod

EXPOSE 8787

RUN corepack enable && corepack prepare pnpm@latest --activate 

# copy app folder from previous image
COPY --from=build /usr/src/app /usr/src/app

# Bundle app source
COPY . .

CMD [ "pnpm", "start", "--port", "8787" ]