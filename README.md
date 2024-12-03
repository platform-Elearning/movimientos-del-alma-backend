# API Documentation

## Base URL

The base URL for all API endpoints is:
http://your-api-domain.com/

## Endpoints TEST

### 1. **Test GET and POST**

- **Endpoint:** `/test`

- **Method:**
  - `GET` - Responds with a success message.
  - `POST` - Responds with a success message.
- **Description:** A basic test route for testing GET and POST requests.
- **GET Request Example:**

  ```http
  GET /test
  ```

- **Response Example (GET):**

  ```json
  {
    "status": "success",
    "message": "GET request successful"
  }
  ```

- **POST Request Example:**
  ```http
  POST /test
  ```

---

### 2. **Function Test**

- **Endpoint:** `/test/function`
- **Method:** `POST`
- **Description:** A test route for executing the `changePasswordController` function.
- **POST Request Example:**
  ```http
  POST /test/function
  ```

---

### 3. **Protected Route Test**

- **Endpoint:** `/test/protected`
- **Method:** `GET`
- **Description:** A test route to verify the functionality of a protected route with token authentication.
- **Authentication Required:** Yes (Requires a valid JWT token in the `Authorization` header).
- **GET Request Example:**

  ```http
  GET /test/protected
  Authorization: Bearer <your-token-here>
  ```

- **Response Example (Authenticated):**
  ```json
  {
    "status": "success",
    "message": "PROTECTED ROUTE IS OK"
  }
  ```

---

## Endpoints USERS

### 1. **Create Complete Student**

- **Endpoint:** `/users/createCompleteStudent`
- **Method:** `POST`
- **Description:** Creates a new student along with a user account and password.
- **Parameters:**
  - `identification_number` (VARCHAR) - Unique identification number of the student.
  - `name` (VARCHAR) - First name of the student.
  - `lastname` (VARCHAR) - Last name of the student.
  - `nationality` (VARCHAR) - Nationality of the student.
  - `email` (VARCHAR) - Email address of the student (unique).
- **Request Example:**
  ```json
  {
    "identification_number": "123456789",
    "name": "John",
    "lastname": "Doe",
    "nationality": "American",
    "email": "john.doe@example.com"
  }
  ```

---

### 2. **Create Complete Teacher**

- **Endpoint:** `/users/createCompleteTeacher`
- **Method:** `POST`
- **Description:** Creates a new teacher with their account information.
- **Parameters:**

  - `name` (VARCHAR) - First name of the teacher.
  - `lastname` (VARCHAR) - Last name of the teacher.
  - `identification_number` (VARCHAR) - Unique identification number of the teacher.
  - `email` (VARCHAR) - Email address of the teacher (unique).

- **Request Example:**
  ```json
  {
    "name": "Jane",
    "lastname": "Smith",
    "identification_number": "987654321",
    "email": "jane.smith@example.com"
  }
  ```

---

### 3. **Login**

- **Endpoint:** `/users/login`
- **Method:** `POST`
- **Description:** Allows a user (student, teacher, or admin) to log in using their username (email) and password.
- **Parameters:**

  - `email` (VARCHAR) - The email address of the user.
  - `password` (VARCHAR) - The password of the user.

- **Request Example:**
  ```json
  {
    "email": "john.doe@example.com",
    "password": "userpassword123"
  }
  ```

---

### 4. **Change Password**

- **Endpoint:** `/users/changePassword`
- **Method:** `POST`
- **Description:** Allows a user to change their password.
- **Parameters:**

  - `email` (VARCHAR) - The email address of the user.
  - `password` (VARCHAR) - The current password of the user.
  - `newPassword1` (VARCHAR) - The new password.
  - `newPassword2` (VARCHAR) - The new password (confirmation).

- **Request Example:**
  ```json
  {
    "email": "john.doe@example.com",
    "password": "oldpassword123",
    "newPassword1": "newpassword456",
    "newPassword2": "newpassword456"
  }
  ```

---

### 5. **Create Admin**

- **Endpoint:** `/users/createAdmin`
- **Method:** `POST`
- **Description:** Creates a superuser (admin) with an ID, email, and password.
- **Parameters:**

  - `id` (INTEGER) - The unique ID of the admin user.
  - `email` (VARCHAR) - The email address of the admin.
  - `password` (VARCHAR) - The password for the admin.

- **Request Example:**
  ```json
  {
    "id": 1,
    "email": "admin@example.com",
    "password": "adminpassword123"
  }
  ```

---

## Endpoints COURSES

### 1. **Create Course**

- **Endpoint:** `/courses/createCourse`
- **Method:** `POST`
- **Description:** Creates a new course with the provided details.
- **Parameters:**
  - `name` (VARCHAR) - The name of the course.
  - `duration_months` (INT) - Duration of the course in months.
  - `quantity_lessons` (INT) - Number of lessons in the course.
  - `quantity_videos` (INT) - Number of videos included in the course.
  - `enrollment_fee` (INT) - Enrollment fee for the course (in local currency).
  - `enrollment_fee_usd` (INT) - Enrollment fee for the course (in USD).
  - `monthly_fee` (INT) - Monthly fee for the course (in local currency).
  - `monthly_fee_usd` (INT) - Monthly fee for the course (in USD).
- **Request Example:**
  ```json
  {
    "name": "Introduction to Programming",
    "duration_months": 6,
    "quantity_lessons": 24,
    "quantity_videos": 12,
    "enrollment_fee": 150,
    "enrollment_fee_usd": 20,
    "monthly_fee": 50,
    "monthly_fee_usd": 8
  }
  ```

---

### 2. **Register to Course**

- **Endpoint:** `/courses/registerToCourse`
- **Method:** `POST`
- **Description:** Registers a student to a course.
- **Parameters:**

  - `student_id` (INT) - The unique ID of the student.
  - `course_id` (INT) - The unique ID of the course.
  - `enrollment_status` (VARCHAR) - The enrollment status (e.g., "active", "pending").
  - `notes` (VARCHAR) - Additional notes related to the registration (optional).

- **Request Example:**
  ```json
  {
    "student_id": 123,
    "course_id": 456,
    "enrollment_status": "active",
    "notes": "Needs assistance with course materials"
  }
  ```

---

### 3. **Get Courses by Student ID**

- **Endpoint:** `/courses/getCoursesById`
- **Method:** `GET`
- **Description:** Retrieves the courses that a student is enrolled in, using their student ID.
- **Parameters:**

  - `student_id` (INT) - The unique ID of the student.

- **Request Example:**
  ```json
  {
    "student_id": 123
  }
  ```

---
