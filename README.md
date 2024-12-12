# realtime-typing-frontend: An app that lets users see what the other user is typing in real time

**realtime-typing-frontend**, now with a Node.js backend, allows users to see what the other user is typing in real time. The reason this app was created is because the end client, John Michael Reed (GitHub @JohnReedLOL), found himself unable to verbally articulate some things in talk therapy. He needed to be able to communicate in writing in real-time with his therapist. Thus, this Node app offers really real-time messaging.

## Instructions to run the project locally

First, download and install npm, Node Package Manager, and Node.js. You can Google "Download Node.js" and follow the instructions online.

Second, clone the project to your local device. The terminal command is "git clone \<repository URL\>", where \<repository URL\> is something like https://github.com/Druva-muga/realtime-typing-frontend .

After you download the project run on the root folder the command:
npm install

If you're just using the frontend you have to run "npm install vite" to get the Vite build tool for the frontend.

To run the server run the following command in the root of the project:  
npm run server  

To run the client run the following command in the root of the project:
npm run dev

The client should look like this in the terminal (the console, the command prompt): 

![Frontend terminal](https://i.imgur.com/ZLXqjLk.png)

To open the client in the browser (after you run the project), hit "o" in the above menu or visit:
http://localhost:5173/

It should look like this in the web browser, in this case Firefox: 

![Frontend Firefox](https://i.imgur.com/vyKpB1M.png)

To check its working, you have to open two windows(or two tabs : http://localhost:5173/ ) and type in each of the windows, you'll see the text of one appearing in the other in the respective textareas of the windows.

It should look like this on one computer, two web browsers: 

![Two clients](https://i.imgur.com/VLOZByj.png)

----------------------------------------------------

### Real time chatting between two devices on shared Wi-Fi

If there are two devices, A (the host where the frontend and WebSocket server are running) and B (another device on the same Wi-Fi network), here’s how the two devices can connect:

On Device A (Host Machine):
Frontend URL: http://localhost:5173 or http://<DeviceA-IP>:5173
WebSocket URL (used by the frontend): ws://localhost:8081 or ws://<DeviceA-IP>:8081
Note: On Device A, both localhost and <DeviceA-IP> will work.

On Device B (Connected Device):
Frontend URL: http://<DeviceA-IP>:5173
WebSocket URL (used by the frontend): ws://<DeviceA-IP>:8081
Device B cannot use localhost to connect to Device A’s servers, so it must use Device A's IP address instead. This allows it to connect to Device A, the server.

Example (Assuming Device A's IP is 192.168.1.10):
Device A Frontend URL: http://192.168.1.10:5173
Device A WebSocket URL: ws://192.168.1.10:8081

window.location.hostname gets us the ip of the host

Setting host: '0.0.0.0' allows other devices connected to the same WiFi or local network to access your server by entering the IP address of the host machine 

It should look like this on two different computer each running the client: 

![Two clients](https://i.imgur.com/4VOsF1a.jpeg) 

----------------------------------------------------

### Credits

Dimitrios - @dimitriost1 on GitHub - Frontend/client 

Druva Reddy - @Druva-muga  on GitHub - Backend/server 

John Michael Reed - @JohnReedLOL on GitHub - End client and PM (Project Manager) 
