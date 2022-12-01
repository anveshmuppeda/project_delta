#!/bin/bash
TO_ADDRESS="muppedaanvesh@gmail.com"
FROM_ADDRESS="project.delta@gmail.com"
SUBJECT="Alert From Project Delta Server"
BODY="Hey the traffic is increased on to the server, and resources are too low, please check the splunk visual reports from below link.
http://3.17.161.119:8000/en-US/app/search/search?q=search%20host%3D%22ip-172-31-18-221.us-east-2.compute.internal%22&sid=1669854313.68&display.page.search.mode=smart&dispatch.sample_ratio=1&workload_pool=&earliest=-24h%40h&latest=now&display.page.search.tab=visualizations"
CC_LIST="sarankumar@gmail.com,kashyaphemanth@gmail.com"

#Sending the mail to the user
echo ${BODY} | mail -s ${SUBJECT} -c ${CC_LIST} ${TO_ADDRESS} -- -r ${FROM_ADDRESS}

#Blocking the traffic from internet temporarily
aws ec2 create-network-acl-entry --network-acl-id acl-5fb85d36 --ingress --rule-number 120 --protocol tcp --port-range From=80,To=80 --ipv4-cidr-block 0.0.0.0/0 --rule-action allow

#Block the traffic for 30 min
sleep 1800

#Allowing access from the internet
aws ec2 delete-network-acl-entry --network-acl-id acl-5fb85d36 --ingress --rule-number 120