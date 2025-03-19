# WebServer

---

## 下載


Http Server: [點擊下載](https://github.com/jkl54555/WebServer/releases/download/v1.0/WebServer-http.zip)  

Https Server: [點擊下載](https://github.com/jkl54555/WebServer/releases/download/v1.0/WebServer-https.zip)

---

## 選擇網卡

此選擇只影響運行時的Log顯示相關內容
![](/docs/images/01.png)  

## QR碼

顯示對應網路介面選項的QRcode
![](/docs/images/02.png)  

## 預設網站

當 public/index.html 無法正常開啟，引導至預設網頁  
![](/docs/images/web.png)  
這模板好久以前在codepen上找到的，忘存來源了，若知來源可以告知一下。  

## 設定檔

於".env"進行設定  
![](/docs/images/env.png)  

**PORT**  
連接端口  
以3000埠為例，設定方式為"PORT=3000"  
若無設定使用網路協定預設  
http使用80  
https使用430  
  
**INTERFACE**  
預設網路介面，  
以Wi-Fi為例，設定方式為"INTERFACE=Wi-Fi"  
若無設定運行程式時會要求選擇
