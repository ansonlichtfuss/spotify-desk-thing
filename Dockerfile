FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Add pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate 

# Copy source code in
COPY . .

# Install and build
RUN pnpm i --frozen-lockfile
RUN pnpm build

CMD [ "pnpm", "start", "--port", "8787" ]

# docker stop spotify-desk-thing; docker rm spotify-desk-thing
# docker build -t spotify-desk-thing/v2 --network host .
# docker run -d --network=host --name=spotify-desk-thing --restart=unless-stopped spotify-desk-thing/v3