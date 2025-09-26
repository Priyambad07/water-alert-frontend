# 🚰 Water Supply Alert System

A cloud-enabled web application to **report and broadcast water supply alerts**.  
This project integrates **Firebase** and **5 AWS services** to demonstrate a full-stack, cloud-native solution.

---

## 🌟 Features
- ✅ Submit water supply alerts (Name, Area, Message, Contact Info)  
- ✅ Alerts stored in **Firebase Realtime Database** for instant updates  
- ✅ Alerts broadcasted via **SMS using AWS SNS**  
- ✅ Web app hosted on **AWS S3 + CloudFront** for global access  
- ✅ **AWS Lambda** function to process alerts and send SMS  
- ✅ Secure roles and permissions via **AWS IAM**  

---

## 🏗️ Architecture
React Frontend (Hosted on S3 + CloudFront)
↓
Firebase Realtime DB (Stores alerts)
↓
AWS Lambda (Triggered by API Gateway)
↓
AWS SNS (Sends SMS to users)

---

## 🛠️ Tech Stack
- **Frontend:** React (JavaScript, CSS)  
- **Backend:** AWS Lambda (Python)  
- **Database:** Firebase Realtime Database  
- **Cloud Hosting:** AWS S3 + CloudFront  
- **Notifications:** AWS SNS (SMS)  
- **Security:** AWS IAM  


