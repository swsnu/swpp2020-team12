# swpp2020-team12

[![Build Status](https://travis-ci.com/swsnu/swpp2020-team12.svg?branch=master)](https://travis-ci.com/swsnu/swpp2020-team12)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=swsnu_swpp2020-team12&metric=alert_status)](https://sonarcloud.io/dashboard?id=swsnu_swpp2020-team12)
[![Coverage Status](https://coveralls.io/repos/github/swsnu/swpp2020-team12/badge.svg?branch=master)](https://coveralls.io/github/swsnu/swpp2020-team12?branch=master)

# Front end
  ```
  cd frontend/caffeine
  yarn install
  yarn test --coverage --watchAll=false    #for testing
  yarn start #for running
  ```
# Back end
  ```
  cd backend/caffeine
  pip install -r requirements.txt
  coverage run --source='.' manage.py test  #for testing
  python manage.py runserver #for running
  ```
