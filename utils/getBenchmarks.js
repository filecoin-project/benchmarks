const yaml = require('yaml');

const {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} = require('fs');

const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

const getFiles = (dir) => readdirSync(dir);

const getTime = (bench) => {
  // total ms represented by human readable benchmark time
  const getMicroseconds = (b) => {
    const res = /([0-9\.]+)µs/.exec(b);
    return (res && parseFloat(res[1]) / 1000) || 0;
  };
  const getMilliseconds = (b) => {
    const res = /([0-9\.]+)ms/.exec(b);
    return (res && parseFloat(res[1])) || 0;
  };
  const getSeconds = (b) => {
    const res = /([0-9\.]+)s/.exec(b);
    return (res && parseFloat(res[1]) * 1000) || 0;
  };
  const getMinutes = (b) => {
    const res = /([0-9\.]+)m[^s]/.exec(b);
    return (res && parseFloat(res[1]) * 1000 * 60) || 0;
  };
  const getHours = (b) => {
    const res = /([0-9\.]+)h/.exec(b);
    return (res && parseFloat(res[1]) * 1000 * 60 * 60) || 0;
  };
  return [getMicroseconds, getMilliseconds, getSeconds, getMinutes, getHours]
    .map((fn) => fn(bench))
    .reduce((sum, acc) => sum + acc, 0);
};

const parseStats = (rawBench) => {
  const lines = rawBench.split('\n');
  const version = lines[0].split(' ')[1].slice(1, 4);

  const sealLines = [1, 2, 3, 4, 5, 6];
  const winningPostLines = [8, 9];
  const windowPostLines = [13];

  const sealTimeMs = sealLines
    .map((line) => getTime(lines[line]))
    .reduce((sum, acc) => sum + acc);

  const winningPostTimeMs = winningPostLines
    .map((line) => getTime(lines[line]))
    .reduce((sum, acc) => sum + acc);

  const windowPostTimeMs = windowPostLines
    .map((line) => getTime(lines[line]))
    .reduce((sum, acc) => sum + acc);

  return {
    version,
    sealTimeMs,
    winningPostTimeMs,
    windowPostTimeMs,
  };
};

getDirectories('benchmarks').forEach((dir) => {
  const files = getFiles(`benchmarks/${dir}`)
    .map((file) => readFileSync(`benchmarks/${dir}/${file}`).toString())
    .map((contents) => yaml.parse(contents))
    .map((benchmark, index) => ({
      index,
      ...benchmark,
      stats: parseStats(benchmark.rawBench),
    }));
  if (!existsSync('data')) {
    mkdirSync('data');
  }
  writeFileSync(`data/${dir}.json`, JSON.stringify(files));
});
