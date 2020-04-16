## Adding a benchmark

Create a new file in the `benchmarks/{YOUR_VERSION}` folder. Copy the format of `benchmarks/template.yaml`.

## Dev server

`yarn dev` and you're off to the races.

## Build

Running `yarn parse-data` turns the YAML files into the JSON files used during the build process. Adding a new `.yaml` file does _not_ trigger a JSON rebuild automatically.

## Deploy

Any new push to `master` triggers a rebuild and deploy.
