#!/bin/sh

gnome-terminal -- npx hardhat node
sleep 5
npx hardhat run scripts/deploy.js --network localhost; npm run dev