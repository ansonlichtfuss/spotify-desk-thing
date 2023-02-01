FROM node:18-alpine AS build

# Create app directory
WORKDIR /usr/src/app

# Add pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate 

# Copy source code in
COPY . .

# Install and build
RUN pnpm i --frozen-lockfile
RUN pnpm build
RUN rm -rf node_modules

# --- Prod ---
FROM node:18-alpine AS prod

EXPOSE 8787

RUN corepack enable && corepack prepare pnpm@latest --activate 

# copy app folder from previous image
COPY --from=build /usr/src/app /usr/src/app

WORKDIR /usr/src/app
RUN pnpm i --prod --frozen-lockfile 

CMD [ "pnpm", "start", "--port", "8787" ]