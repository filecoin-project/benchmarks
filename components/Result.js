const timeStringFromMs = (ms) => {
  const times = {
    HOUR: 1000 * 60 * 60,
    MINUTE: 1000 * 60,
    SECOND: 1000,
  };
  const hours = Math.floor(ms / times.HOUR);
  const minutes = Math.floor((ms - hours * times.HOUR) / times.MINUTE);
  const seconds = Math.floor(
    (ms - hours * times.HOUR - minutes * times.MINUTE) / times.SECOND
  );
  return `${hours ? hours + 'h' : ''} ${minutes ? minutes + 'm' : ''} ${
    seconds ? seconds + 's' : ''
  }`;
};

const Result = ({ benchmark }) => {
  return (
    <div className="result-wrapper">
      <div className="hardware">
        <span>
          <img src="cpu.svg" width="16" height="16" />
          {benchmark.cpu.brand} {benchmark.cpu.model}
        </span>
        <span>
          <img src="monitor.svg" width="16" height="16" />
          {benchmark.gpu.brand !== 'none'
            ? benchmark.gpu.brand + ' ' + benchmark.gpu.model
            : 'None'}
        </span>
        <span>
          <img src="ram.svg" width="16" height="16" />
          {benchmark.ram.amount} {benchmark.ram.speed}
        </span>
      </div>
      <div className="stat">
        <div className="stat-label">
          <h3>
            Seal <span>32GiB</span>
          </h3>
        </div>
        <span>{timeStringFromMs(benchmark.stats.sealTimeMs)}</span>
      </div>
      <div className="stat">
        <div className="stat-label">
          <h3>WinningPoSt</h3>
        </div>
        <span>{timeStringFromMs(benchmark.stats.winningPostTimeMs)}</span>
      </div>
      <div className="stat">
        <div className="stat-label">
          <h3>WindowPoSt</h3>
        </div>
        <span>{timeStringFromMs(benchmark.stats.windowPostTimeMs)}</span>
      </div>
      <style jsx>{`
        div.result-wrapper {
          padding: 1rem 1rem;
          margin-bottom: 0.5rem;
          border-radius: 2px;
          border: 1px solid hsl(206, 20%, 70%);
          display: flex;
          flex-wrap: wrap;
        }
        div.hardware {
          flex-basis: 100%;
          display: flex;
          justify-content: flex-start;
          margin-bottom: 1.5rem;
        }
        div.hardware > span {
          flex-basis: 33.3%;
        }
        div.hardware > span > img {
          position: relative;
          transform: translateY(2px);
          opacity: 0.8;
          margin-right: 0.5rem;
        }
        div.stat {
          flex-basis: 33.3%;
        }
        div.stat-label > h3 {
          color: hsl(206, 10%, 60%);
          margin: 0;
          font-size: 1.2rem;
          font-weight: 500;
          margin-bottom: 0.25rem;
        }
        div.stat-label span {
          font-size: 14px;
        }
        @media (max-width: 800px) {
          div.result-wrapper {
            display block;
          }
          div.hardware {
            display: block;
          }

          div.hardware > span {
            display: block;
            margin-bottom: 0.25rem;
          }
          div.stat > span {
            margin-bottom: 0.25rem;
          }
          div.stat {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;

          }
          div.stat > p {
            margin: 0 1rem 0 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Result;
