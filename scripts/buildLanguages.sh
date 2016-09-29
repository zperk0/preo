#!/bin/bash
# This script is supposed to run on the project root

rm ./locale/resources.json

npm run gettext:extract

ed -s ./locale/en.pot << 'EOF'
5a
"Language: en\n"
.
w
EOF

curl -X POST https://api.lingohub.com/v1/preoday/projects/webapp-v2/resources.json?auth_token=c9d4101fe920a7cf9a4fc53f9ba95d6ce555f72d4551f6754523b533890e96d5 -F "file=@./locale/en.pot"

node ./scripts/getTranslations.js

npm run gettext:compile
