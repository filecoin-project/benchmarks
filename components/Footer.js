const Footer = () => {
  return (
    <div>
      <footer>
        <a
          href="https://github.com/filecoin-project/benchmarks"
          target="_blank"
        >
          Submit a pull request to add your benchmarks &rarr;
        </a>
      </footer>
      <style jsx>{`
        footer {
          width: 100vw;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default Footer;
