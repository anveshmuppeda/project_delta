## INSTALLING AND SETUP FOR THE SPLUNK AND SPLUNK FORWARDER 
Splunk Logins: 
username: projectdelta 
Password : projectdelta@123 

#installing the splunk. 
```
sudo wget -O splunk-9.0.2-17e00c557dc1-Linux-x86_64.tgz "https://download.splunk.com/products/splunk/releases/9.0.2/linux/splunk-9.0.2-17e00c557dc1-Linux-x86_64.tgz"  
tar xvzf file.tgz -C /opt  
/opt/splunk/bin/splunk start --accept-license  
```

## Opening port 8000 for splunk since splunk is running on port 8000  
```
firewall-cmd --zone=public --add-port=8000/tcp --permanent
firewall-cmd --reload
```

## installing the splunk forward  
```
$wget -O splunkforwarder-9.0.2-17e00c557dc1-Linux-x86_64.tgz "https://download.splunk.com/products/universalforwarder/releases/9.0.2/linux/splunkforwarder-9.0.2-17e00c557dc1-Linux-x86_64.tgz"
$tar -xvzf splunkforwarder-9.0.2-17e00c557dc1-Linux-x86_64.tgz -C /opt/
$sudo /opt/splunkforwarder/bin/splunk start --accept-license
```
##### NOTE: 8089 already in use, so better use 8088
 
splunk has limit on disk space for root directory 
search not executed: The minimum free disk space (5000MB) reached for /opt/splunk/var/run/splunk/dispatch  
If we get above error, then we need to change the limit as required in below path  
```
$/opt/splunkforwarder/etc/system/default/server.conf 
```

#### Enable the boot start  
```
$/opt/splunkforwarder/bin/splunk enable boot-start
```

Add the Splunk IP where you want to forward the logs  
```
$/opt/splunkforwarder/bin/splunk add forward-server 18.117.242.146:9997
```

Sending logs to splunk  
```
$/opt/splunkforwarder/bin/splunk add monitor /etc/httpd/logs/access_log -index main
```

To check the above configuration
```
/opt/splunkforwarder/etc/apps/search/local/inputs.conf
```

Enable the forward ports  
```
$firewall-cmd --zone=public --permanent --add-port=9997/tcp  
$firewall-cmd --zone=public --permanent --add-port=9997/udp  
$firewall-cmd --zone=public --permanent --add-port=8088/tcp  
$firewall-cmd --zone=public --permanent --add-port=8088/udp  
```

### Add the IP on splunk   
Follow the below  
#### Settings -> Data -> Forwarding and Receiving -> Receive data  
Click on "+ Add new" Button  
Then add the 9997 port. 
Then restart the splunk and splunkglobalforwarder.  

Delete the index data from the splunk UI  
```
$index=main sourcetype=syslog | delete 
```

### After restart of the server.  
1. Restart the spunk on splunkforwarder  
2. Update the new IP 
    ``` 
    $/opt/splunkforwarder/bin/splunk add forward-server 18.117.242.146:9997  
    ```
3. Restart the splunk on splunkforwarder.  


### Reference.  
https://www.youtube.com/watch?v=c1t1QFTIGBg&t=389s


