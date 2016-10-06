#!/bin/bash
# This script is supposed to run on the project root

token=$(<./scripts/lingohubToken)

rm ./locale/resources.json

npm run gettext:extract

ed -s ./locale/en.pot << 'EOF'
5a
"Language: en\n"
.
w
EOF

curl -X POST https://api.lingohub.com/v1/preoday/projects/webapp-v2/resources.json?auth_token=$token -F "file=@./locale/en.pot"

node ./scripts/getTranslations.js

npm run gettext:compile
