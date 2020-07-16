# Hardware benchmarks on the Filecoin testnet

This repo is a place to collect benchmarks collected from the Filecoin community. Submissions are reviewed manually, but we try to be quick. You can review the current benchmarks [here](https://filecoin-benchmarks.on.fleek.co/).

## Running a benchmark

**IT IS IMPORTANT TO BUILD LOTUS FROM SOURCE TO TAKE ADVANTAGE OF ALL AVAILABLE OPTIMIZATIONS**

The information below assumes you are already able to build lotus from source. The instructions below detail how to natively compile the filecoin-ffi when building lotus and its tools.

If you have not previosuly built lotus from source, please see the [lotus docs](https://docs.lotu.sh/en+install-lotus-ubuntu).

To build the filecoin-ffi from source you will need to have `rustup` installed. You can install it by following the instructions at [https://rustup.rs/](https://rustup.rs/).

You will need **600GB** of free disk space available, replace the value of `/storage` with an appropriate path in the last command.

**Build and Run**

```
$ git clone --branch master https://github.com/filecoin-project/lotus.git
$ cd lotus
$ env RUSTFLAGS="-C target-cpu=native -g" FFI_BUILD_FROM_SOURCE=1 make clean deps bench
$ env FIL_PROOFS_MAXIMIZE_CACHING=1 RUST_LOG=info TMPDIR=/storage ./bench sealing --storage-dir /storage/bench --sector-size 32GiB 2>&1 | tee bench.log
```

## Adding a benchmark to the list

- Fork the repo
- Create a new file in the `benchmarks/{YOUR_VERSION}` folder. Copy the format of `benchmarks/template.yaml`.
- Submit a pull request

## Dev server

If you want to test your addition locally or otherwise play around, `yarn dev` and you're off to the races.

## Build

Running `yarn parse-data` turns the YAML files into the JSON files used during the build process. Adding a new `.yaml` file does _not_ trigger a JSON rebuild automatically.

## Deploy

Any new push to `master` triggers a rebuild and deploy.
