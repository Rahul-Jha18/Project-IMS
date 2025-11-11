# 📦 Project IMS — Inventory Management System

## 📘 Overview
**Project IMS** is a full-stack **Inventory Management System** built with **React (frontend)**, **Node.js/Express (backend)**, and **MySQL (database)** using Sequelize ORM.

It allows organizations to manage **branches** and **devices**, with **role-based access control** so only admins can add, edit, or delete records, while normal users can view data only.

---

## 🚀 Features

### 👥 User Roles
| Role | Permissions |
|------|--------------|
| **Admin** | Add, edit, and delete branches/devices |
| **User** | View-only access |

### 🏢 Branch Management
- Add and manage branches  
- Assign devices to branches  
- Search and filter branches  

### 💻 Device Management
- Add and manage devices  
- Filter by branch  
- Search devices by name or IP  
- Device status (Active/Inactive)

### 🔒 Authentication
- JWT-based secure login  
- Role-based access control  

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React.js, Axios, Context API |
| Backend | Node.js, Express.js |
| Database | MySQL |
| ORM | Sequelize |
| Auth | JWT |
| Styling | CSS (Pages.css / custom) |

---

