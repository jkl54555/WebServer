const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const qrcode = require('qrcode-terminal');
const readline = require('readline');
const os = require('os');

dotenv.config();

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
   // 在動態路由處理程序中使用內聯CSS設定文字樣式
  const pageContent = `
<html>
<head>
   <style>
      body,
      html {
         width: 100%;
         height: 100%;
         margin: 0;
         padding: 0;
         overflow: hidden;
      }
      
      body {
         background-color: #141417;
         display: flex;
         flex-direction: column;
         justify-content: center;
         align-items: center;
         height: 100vh;
         /* 設定整個 body 高度為視窗高度 */
      }

      svg {
         max-width: 100%;
         height: auto;
      }

      h1 {
         color: #e0e0e0;
         font-size: 24px;
         margin-bottom: 20px;
         /* 添加底部間距 */
      }

      p {
         font-size: 18px;
         color: #b3b3b3;
      }

   </style>
</head>

<body>
   <h1>Jesse's Web Page</h1>
   <p>This is a simple example page.</p>
   <svg width="512" height="512" viewBox="0 0 512 512" fill="none" overflow="hidden" xmlns="http://www.w3.org/2000/svg">
      <use href="#cube" x="128" y="320" stroke-width="2" opacity="0.3">
         <animate attributeName="stroke" dur="6s" repeatCount="indefinite"
            values="#FF9AA2;#FFB7B2;#FFDAC1;#E2F0CB;#B5EAD7;#C7CEEA;#FF9AA2" />
      </use>

      <rect width="512" height="512" y="384" fill="url(#fade)" />
      <use href="#cube" x="128" y="128" stroke-width="2">
         <animate attributeName="stroke" dur="6s" repeatCount="indefinite"
            values="#FF9AA2;#FFB7B2;#FFDAC1;#E2F0CB;#B5EAD7;#C7CEEA;#FF9AA2" />
      </use>

      <defs>
         <!-- EVERYTHING TOGETHER -->
         <g id="cube">
            <use href="#cube_outline" stroke-linejoin="round" stroke-width="16" fill="url(#stars)" />
            <use href="#cube_base" stroke-width=".5" />
            <use href="#cube_outline" stroke-linejoin="round" stroke-width="6" stroke="#141417" />
         </g>

         <g id="cube_outline">
            <path>
               <animate attributeName="d" dur="1.5s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;0.5;1"
                  keySplines="0.8 0.2 0.6 0.9; 
                                  0.8 0.2 0.6 0.9; 
                                  0.8 0.2 0.6 0.9" values="M10 64 L128 0 L246 64 L246 192 L128 256 L10 192Z;
                              M40 20 L216 20 L216 108 L216 236 L40 236 L40 172Z;
                              M216 20 L40 20 L40 108 L40 236 L216 236 L216 172Z;
                              M246 64 L128 0 L10 64 L10 192 L128 256 L246 192Z" />
            </path>
         </g>

         <g id="cube_base">
            <path fill="#fff1"> <!-- TOP SIDE -->
               <animate attributeName="d" dur="1.5s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1"
                  keySplines="0.8 0.2 0.6 0.9; 
                                  0.8 0.2 0.6 0.9" values="M10 64 L128 0 L246 64 L128 128Z;
                              M40 20 L216 20 L216 108 L40 108Z;
                              M128 0 L246 64 L128 128 L10 64Z" />
            </path>
            <path> <!-- LEFT SIDE -->
               <animate attributeName="d" dur="1.5s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;0.5;1"
                  keySplines="0.8 0.2 0.6 0.9; 
                                  0.8 0.2 0.6 0.9; 
                                  0.8 0.2 0.6 0.9" values="M10 64 L128 128 L128 256 L10 192Z;
                              M40 20 L40 108 L40 236 L40 172Z;
                              M216 20 L216 108 L216 236 L216 172Z;
                              M246 64 L128 128 L128 256 L246 192Z" />
               <animate attributeName="fill" dur="1.5s" repeatCount="indefinite" keyTimes="0;0.5;0.5;1"
                  values="#fff0;#fff0;#fff2;#fff2" />
            </path>
            <path fill="#407080"> <!-- LEFT SIDE -->
               <animate attributeName="d" dur="1.5s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1"
                  keySplines="0.8 0.2 0.6 0.9; 
                                  0.8 0.2 0.6 0.9" values="M246 64 L128 128 L128 256 L246 192Z;
                              M216 108 L40 108 L40 236 L216 236Z;
                              M128 128 L10 64 L10 192 L128 256Z" />
               <animate attributeName="fill" dur="1.5s" repeatCount="indefinite" keyTimes="0;0.5;1"
                  values="#fff2;#fff1;#fff0" />
            </path>
         </g>
         <linearGradient id="fade" gradientTransform="rotate(90)">
            <stop offset="0" stop-color="#14141700" />
            <stop offset="0.25" stop-color="#141417ff" />
         </linearGradient>
         <linearGradient id="sky" gradientTransform="rotate(90)">
            <stop offset="0.5" stop-color="#141417" />
            <stop offset="1" stop-color="#40354a" />
         </linearGradient>

         <!-- STARS PATTERN -->
         <pattern id="stars" x="0" y="0" width="50%" height="50%" patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse">
            <rect width="256" height="256" fill="url(#sky)" />
            <use href="#star01" x="24" y="32" fill="white" />
            <use href="#star01" x="64" y="96" fill="#ad9dcb" transform="rotate(90 80 112)" />
            <use href="#star01" x="224" y="102" fill="#ad9dcb" />
            <use href="#star01" x="192" y="112" fill="#E0E8EA" transform="rotate(90 80 112)" />
            <use href="#star02" x="16" y="64" fill="#ad9dcb" />
            <use href="#star03" x="96" y="16" fill="#E0E8EA" />
            <use href="#star04" x="64" y="64" fill="white" />
            <use href="#star04" x="8" y="16" fill="#ad9dcb" />
            <use href="#star04" x="110" y="96" fill="#E0E8EA" />
            <use href="#star02" x="160" y="24" fill="#ad9dcb" />
            <use href="#star03" x="196" y="60" fill="#E0E8EA" />
            <use href="#star04" x="64" y="212" fill="white" />
            <use href="#star04" x="218" y="216" fill="#ad9dcb" />
            <use href="#star03" x="228" y="220" fill="#E0E8EA" />
            <use href="#star02" x="140" y="128" fill="#ad9dcb" />
            <use href="#star03" x="24" y="140" fill="#E0E8EA" />
            <use href="#star04" x="95" y="160" fill="white" />
            <use href="#star04" x="180" y="128" fill="#ad9dcb" />
            <use href="#star03" x="200" y="136" fill="#E0E8EA" />
            <use href="#star10" x="120" y="120" stroke="#E0E8EA" />
            <use href="#star11" x="48" y="64" stroke="#ad9dcb" />
         </pattern>
         <path id="star01" transform="scale(0.5)">
            <animate attributeName="d" dur="3s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1"
               keySplines="0.8 0.2 0.6 0.9; 0.8 0.2 0.6 0.9" values="M16 0 Q16 16 24 16 Q16 16 16 32 Q16 16 8 16 Q16 16 16 0Z;
                              M16 8 Q16 16 32 16 Q16 16 16 24 Q16 16 0 16 Q16 16 16 8Z;
                              M16 0 Q16 16 24 16 Q16 16 16 32 Q16 16 8 16 Q16 16 16 0Z" />
         </path>
         <circle id="star02">
            <animate attributeName="r" dur="3s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1"
               keySplines="0.8 0.2 0.6 0.9; 0.8 0.2 0.6 0.9" values="0;2;0" />
         </circle>
         <circle id="star03">
            <animate attributeName="r" dur="6s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1"
               keySplines="0.8 0.2 0.6 0.9; 0.8 0.2 0.6 0.9" values="3;1;3" />
         </circle>
         <circle id="star04" r="1" />

         <path id="star10" stroke-width="2">
            <animate attributeName="d" dur="5s" repeatCount="indefinite" keyTimes="0;0.90;0.97;1"
               keySplines="0 0.4 1 0.2; 0 0.4 1 0.2; 0 0.4 1 0.2"
               values="M64 0 L64 0Z; M64 0 L64 0Z; M48 12 L0 48Z; M0 48 L0 48Z" />
            <animate attributeName="opacity" dur="5s" repeatCount="indefinite" keyTimes="0;0.90;0.97;1"
               values="1; 1; 0.6; 0" />
         </path>
         <path id="star11" stroke-width="3">
            <animate attributeName="d" dur="6s" repeatCount="indefinite" delay="3s" keyTimes="0;0.90;0.95;1"
               keySplines="0 0.4 1 0.2; 0 0.4 1 0.2; 0 0.4 1 0.2"
               values="M64 0 L64 0Z; M64 0 L64 0Z; M48 12 L0 48Z; M0 48 L0 48Z" />
            <animate attributeName="opacity" dur="6s" repeatCount="indefinite" delay="3s" keyTimes="0;0.90;0.95;1"
               values="1; 1; 0.6; 0" />
         </path>
      </defs>
   </svg>
   <a href="https://github.com/jkl54555"><p>Welcome to my GitHub.</p></a>
   <a href="https://github.com/jkl54555">
   <svg width="50px" height="50px" viewBox="0 0 25 25" fill="none" overflow="hidden" xmlns="http://www.w3.org/2000/svg">
      <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -7559.000000)" fill="#ffffff">
         <g id="icons" transform="translate(56.000000, 160.000000)">
            <path
               d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"
               >
            </path>
         </g>
      </g>
   </svg>
</a>
</body>
</html>
  `;

  res.send(pageContent);
});

const port = process.env.PORT || 80;
const httpServer = http.createServer(app);

httpServer.listen(port, () => {
    const currentTime = new Date().toLocaleString();
    const networkInterfaces = os.networkInterfaces();

    const selectedInterface = process.env.INTERFACE;
    let ipAddress = 'localhost';

    if (selectedInterface && networkInterfaces[selectedInterface]) {
        ipAddress = getLocalIpAddress(selectedInterface);
    } else {
        const availableInterfaces = Object.keys(networkInterfaces)
            .filter(interfaceName => networkInterfaces[interfaceName].some(entry => entry.family === 'IPv4' && !entry.internal));

        if (availableInterfaces.length === 1) {
            ipAddress = getLocalIpAddress(availableInterfaces[0]);
        } else {
            console.log('可用的網卡接口和對應的 IP 地址：');
            Object.keys(networkInterfaces).forEach((interfaceName, index) => {
                networkInterfaces[interfaceName].forEach((entry) => {
                    if (entry.family === 'IPv4' && !entry.internal) {
                        console.log(`  ${index + 1}. ${interfaceName}: ${entry.address}`);
                    }
                });
            });

            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            function askForInterface() {
                rl.question('請輸入要使用的網卡序號：', (selectedIndex) => {
                    const selected = Object.keys(networkInterfaces)[parseInt(selectedIndex, 10) - 1];
                    if (selected) {
                        ipAddress = getLocalIpAddress(selected);
                        rl.close();
                        logServerInfo();
                    } else {
                        console.log('\x1b[31m%s\x1b[0m', '無效的網卡序號。請重新輸入。');
                        askForInterface();
                    }
                });
            }

            askForInterface();
            return;
        }
    }

    logServerInfo();

    function logServerInfo() {
        console.log(`Running time: \n   \x1b[94m- ${currentTime}\x1b[0m`);
        console.log(`Server is running at:\n   \x1b[32m- http://localhost:${port}\n   - http://${ipAddress}:${port}\x1b[0m`);

        const qrContent = `http://${ipAddress}:${port}`;
        console.log('\nQR Code:');
        qrcode.generate(qrContent, { small: true });
        console.log('\n', watermark);
    }
});

function getLocalIpAddress(selectedInterface) {
    const networkInterfaces = os.networkInterfaces();
    const targetInterface = networkInterfaces[selectedInterface];

    if (targetInterface) {
        const targetAddress = targetInterface.find(entry => entry.family === 'IPv4' && !entry.internal);
        return targetAddress ? targetAddress.address : 'localhost';
    }
    return 'localhost';
}

const watermark = `
████████╗ ███████╗  ███████╗  ███████╗  ███████╗
╚══██╔══╝ ██╔════╝  ██╔════╝  ██╔════╝  ██╔════╝
   ██║    █████╗    ███████╗  ███████╗  █████╗
   ██║    ██╔══╝    ╚════██║  ╚════██║  ██╔══╝
█████║    ███████╗  ███████║  ███████║  ███████╗
╚════╝    ╚══════╝  ╚══════╝  ╚══════╝  ╚══════╝  
`;
