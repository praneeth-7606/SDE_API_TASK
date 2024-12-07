# **SDE API Round - IRCTC**

A robust railway management system API for booking train tickets, checking train availability, and managing train details. The API includes real-time seat availability handling and race condition prevention during simultaneous bookings.

## **Features**
- User registration and login.
- Search for trains between stations.
- Book train tickets with real-time seat availability.
- Admin features to manage train details.
- Optimized for handling simultaneous bookings to prevent race conditions.

---

## **Setup Instructions**

### **Prerequisites**
1. **Node.js**: Version 16 or later.
2. **PostgreSQL**: A running instance of PostgreSQL database.
3. **npm**: Node.js package manager.
4. **Postman** (optional): For API testing.

### **Steps to Set Up**

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd server
2.  **Install Dependencies**

 - PORT=3000
 - DB_USER=dbusername
 - DB_PASSWORD=dbpassword
 - DB_NAME=dbname
 - JWT_SECRET=WRITESCRETEKEY
 - API_KEY=create admin key for admin operation
- DATABASE_URL=your_postgresql_connection_string
- JWT_SECRET=your_jwt_secret.
- API_KEY=your_admin_api_key.
3.  **Run Database Migrations command to  Set up the database schema**
  - npx sequelize-cli db:migrate
4. **Start Server**
  -  npm run dev
  -  The API will be available at http://localhost:3000.
## **User Authentication APIs**

### **1. User Registration**
- **Path**: `POST /api/auth/signup`
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "name": "enter name",
    "email": "enter email",
    "password": "enter password in double codes",
    "role": "user"   (it can be either admin or user)
  }
### **2. User login**
- **Path**: `POST /api/auth/signup`
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "email": "enter email",
    "password": "enter password in double codes",
  }
- **after this request generated token is useful for authentication
### **3. Admin api**
- **Path**: `POST /api/admin/trains`
- **Description**: Adds a new train to the system. Admin authentication required via x-api-key.
- **Headers** => x-api-key: <API_KEY>
- **Request Body**:
  ```json
  {
  "train_name": "Express",
  "source": "ongole",
  "destination": "kayamkulam",
  "total_seats": 500
   }

### **4. Get All Trains (Admin Only)**
- **Path**: `GET /api/admin/trains`
- **Description**: Retrieves a list of all trains. Admin authentication required via x-api-key.
- **Headers** =>x-api-key: <API_KEY>

### **5. Search Trains Between Stations**
- **Path**: `POST /api/user/trains`
- **Description**: Searches for trains between the specified source and destination.
- **Headers** =>Authorization: Bearer <JWT_TOKEN>
**Request Body**:
  ```json
   {
  "source": "ongole",
  "destination": "kayamkulam",
   }
### **6. Book a Seat**
- **Path**: `POST /api/user/book`
- **Description**: Books seats on a specified train.
- **Headers** =>Authorization: Bearer <JWT_TOKEN>
**Request Body**:
  ```json
   {
  "train_id": 1,
  "source": "ongole",
  "destination": "kayamkulam",
  "number_of_seats": 3
   }
### **7. Get User Bookings**
- **Path**: `GET /api/user/bookings`
- **Description**: Fetches all bookings made by the authenticated user.
- **Headers** =>Authorization: Bearer <JWT_TOKEN>
**Request Body**:
  ```json
   {
  "train_id": 1,
  "source": "ongole",
  "destination": "kayamkulam",
  "number_of_seats": 3
   }
### For all those above apis this is the EXAMPLE format  for signup http://localhost:3000//api/auth/signup

  


  
  
   
