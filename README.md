# swpp2020-team12

# https://caffeine-camera.shop/

[![Build Status](https://travis-ci.org/swsnu/swpp2020-team12.svg?branch=master)](https://travis-ci.org/swsnu/swpp2020-team12)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=swsnu_swpp2020-team12&metric=alert_status)](https://sonarcloud.io/dashboard?id=swsnu_swpp2020-team12)

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
  python manage.py migrate
  python manage.py runserver #for running
  ```
