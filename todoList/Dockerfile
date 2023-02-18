# 使用官方 Node.js 鏡像作為基礎
FROM node:18.14.0

# 將工作目錄設置為 /app
WORKDIR /app

# 將當前目錄中的所有文件複製到容器中的 /app 目錄下
COPY package*.json ./

# 安裝 Node.js 依賴
RUN npm install

#複製所有應用程式代碼到容器的 /app 目錄下
COPY . .

# 在容器啟動時運行應用
CMD ["npm", "run", "dev"]