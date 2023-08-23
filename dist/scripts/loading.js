/**
 * loading 占位
 * 解决首次加载时白屏的问题
 */
(function () {
  const _root = document.querySelector('#root');
  if (_root && _root.innerHTML === '') {
    _root.innerHTML = `
      <style>
        html,
        body,
        #root {
          height: 100%;
          margin: 0;
          padding: 0;
          background: rgb(20, 20, 21);
        }
        #root {
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        h2 {
          color: #ccc;
          margin: 0;
          font: 14px verdana;
          text-transform: uppercase;
          letter-spacing: .1em;
        }
        
        .loading span {
          display: inline-block;
          vertical-align: middle;
          width: .6em;
          height: .6em;
          margin: .19em;
          background: #007DB6;
          border-radius: .6em;
          animation: loading 1s infinite alternate;
        }
        
        /*
         * Dots Colors
         * Smarter targeting vs nth-of-type?
         */
        .loading span:nth-of-type(2) {
          background: #008FB2;
          animation-delay: 0.2s;
        }
        .loading span:nth-of-type(3) {
          background: #009B9E;
          animation-delay: 0.4s;
        }
        .loading span:nth-of-type(4) {
          background: #00A77D;
          animation-delay: 0.6s;
        }
        .loading span:nth-of-type(5) {
          background: #00B247;
          animation-delay: 0.8s;
        }
        .loading span:nth-of-type(6) {
          background: #5AB027;
          animation-delay: 1.0s;
        }
        .loading span:nth-of-type(7) {
          background: #A0B61E;
          animation-delay: 1.2s;
        }
        
        /*
         * Animation keyframes
         * Use transition opacity instead of keyframes?
         */
        @keyframes loading {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      </style>

      <div class="loading">
        <h2>MUSKINS</h2>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;
  }
})();
