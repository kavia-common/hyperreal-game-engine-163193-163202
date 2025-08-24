#!/bin/bash
cd /home/kavia/workspace/code-generation/hyperreal-game-engine-163193-163202/frontend_client
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

