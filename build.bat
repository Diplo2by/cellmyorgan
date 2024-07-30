@echo off
start cmd /k "npx hardhat node"
timeout /t 5 /nobreak
npx hardhat run scripts\deploy.js --network localhost
npm run dev