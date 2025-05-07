# Étape 1 : Développement (avec les deps complètes)
FROM node:20-alpine AS development

RUN npm install -g pnpm

WORKDIR /usr/src/app

# Copie et installation
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copie du reste du projet
COPY . .

# ⚠️ Ne pas utiliser USER node ici, sinon la build échoue à cause des droits
RUN pnpm run build


# Étape 2 : Build final (production only)
FROM node:20-alpine AS production

WORKDIR /usr/src/app

# Copie des fichiers nécessaires depuis la phase précédente
COPY --from=development /usr/src/app/package.json ./
COPY --from=development /usr/src/app/node_modules ./node_modules
COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/index.js"]
