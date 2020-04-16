import { useState } from 'react';
import Head from 'next/head';
import Result from '../components/Result';
import Footer from '../components/Footer';

import v25 from '../data/v25.json';

export default function Home() {
  const [activeVersion, setActiveVersion] = useState('v25');
  const [filterBy, setFilterBy] = useState('sealing');

  return (
    <div className="container">
      <Head>
        <title>Filecoin Benchmarks</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Filecoin Benchmarks</h1>

        <p className="description">
          Hardware performance comparisons from the Filecoin community
        </p>
        <p className="subtitle">
          v25 proofs, last updated {new Date().toLocaleDateString('en-us')}
        </p>

        <p className="warning">
          Filecoin is under active development and hardware combinations will
          change after future upgrades.
        </p>

        <p className="filters">
          <span>&uarr;&darr;</span>
          <a
            className="filter-button"
            aria-current={filterBy == 'sealing' ? 'page' : null}
            onClick={() => setFilterBy('sealing')}
          >
            Sealing
          </a>
          <a
            className="filter-button"
            aria-current={filterBy == 'winningPost' ? 'page' : null}
            onClick={() => setFilterBy('winningPost')}
          >
            WinningPoST
          </a>
          <a
            className="filter-button"
            aria-current={filterBy == 'windowPost' ? 'page' : null}
            onClick={() => setFilterBy('windowPost')}
          >
            WindowPoST
          </a>
        </p>

        <div className="grid">
          {v25
            .filter((benchmark) => benchmark.stats.version === activeVersion)
            .sort((a, b) => {
              if (filterBy == 'sealing')
                return a.stats.sealTimeMs - b.stats.sealTimeMs;
              if (filterBy == 'winningPost')
                return a.stats.winningPostTimeMs - b.stats.winningPostTimeMs;
              if (filterBy == 'windowPost')
                return a.stats.windowPostTimeMs - b.stats.windowPostTimeMs;
            })
            .map((benchmark) => (
              <Result benchmark={benchmark} key={benchmark.index} />
            ))}
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 1rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .title {
          margin: 0;
          line-height: 1;
          font-size: 3.5rem;
          color: hsl(206, 100%, 10%);
        }

        .description {
          line-height: 1.2;
          font-size: 1.5rem;
          margin-bottom: 0;
        }
        p.subtitle {
          margin-top: 0.5rem;
          margin-bottom: 2rem;
          color: hsl(206, 20%, 40%);
        }

        p.warning {
          margin-top: 0.5rem;
          margin-bottom: 2rem;
          color: #ed4c4d;
        }

        p.filters {
          margin-top: 0.5rem;
          color: hsl(206, 20%, 40%);
        }

        a.filter-button {
          border-bottom: 2px solid transparent;
          display: inline-block;
          padding-bottom: 3px;
        }

        a.filter-button:not(:first-child) {
          margin-left: 1rem;
        }

        a.filter-button:hover {
          color: hsl(206, 20%, 12%);
        }

        a.filter-button[aria-current] {
          color: hsl(206, 20%, 12%);
          border-color: hsl(206, 100%, 50%);
        }

        .warning {
          color: #ed4c4d;
        }
        @media (max-width: 600px) {
          main {
            padding: 2rem 0;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          color: hsl(206, 100%, 12%);
        }
        a {
          color: inherit;
          text-decoration: none;
        }
        a:hover,
        a.link {
          color: hsl(206, 100%, 50%);
          cursor: pointer;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
