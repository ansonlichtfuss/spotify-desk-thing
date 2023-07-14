FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Add pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate 

# Install deps
COPY package.json package.json
COPY pnpm-lock.json pnpm-lock.json
RUN pnpm i --frozen-lockfile

# Build
COPY . .
RUN pnpm build

CMD [ "pnpm", "start", "--port", "8787" ]

# docker stop spotify-desk-thing; docker rm spotify-desk-thing
# docker build -t spotify-desk-thing/latest --network host .
# docker run -d --network=host --name=spotify-desk-thing --restart=unless-stopped spotify-desk-thing/latest