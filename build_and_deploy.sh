#!/bin/bash
yarn install --ignore-engines
yarn run build
gcloud app deploy