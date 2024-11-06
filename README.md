# Instructions to run the project locally

to run the project run the following command in the root of the project:
npm run dev

to open it in the browser (after you run the project) visit:
http://localhost:5173/

to run the server :  
npm run server   

to check its working, you have to open two windows(or two tabs : http://localhost:5173/ ) and type in each of the windows, you'll see the text of one appearing in the other in the respective textareas of the windows.

----------------------------------------------------
real time chatting between two devices on shared Wi-Fi

If there are two devices, A (the host where the frontend and WebSocket server are running) and B (another device on the same network), here’s how each device can access the servers:

On Device A (Host Machine):
Frontend URL: http://localhost:5173 or http://<DeviceA-IP>:5173
WebSocket URL (used by the frontend): ws://localhost:8081 or ws://<DeviceA-IP>:8081
Note: On Device A, both localhost and <DeviceA-IP> will work.

On Device B (Connected Device):
Frontend URL: http://<DeviceA-IP>:5173
WebSocket URL (used by the frontend): ws://<DeviceA-IP>:8081
Device B cannot use localhost to connect to Device A’s servers, so it must use Device A's IP address instead.

Example (Assuming Device A's IP is 192.168.1.10):
Device A Frontend URL: http://192.168.1.10:5173
Device A WebSocket URL: ws://192.168.1.10:8081

window.location.hostname gets us the ip of the host

Setting host: '0.0.0.0' allows other devices connected to the same WiFi or local network to access your server by entering the IP address of the host machine 
