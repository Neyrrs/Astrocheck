### ✅ 1. **Register User**

#### Endpoint

```json
{
  "endpoint": "POST /user/register"
}
```

#### Request:

Content-Type: `multipart/form-data`

```json
{
  "nis": "string",
  "fullName": "string",
  "password": "string",
  "grade": "string",
  "status": "string",
  "generation": "number",
  "major_name": "string",
  "role": "string",
  "createdAt": "YYYY-MM-DD",
  "profilePicture": File (image/jpeg or image/png)
}
```

#### Response:

```json
{
  "message": "Akun berhasil dibuat!",
  "response": { ...userObject }
}
```

---

### ✅ 2. **Login User**

#### Endpoint

```json
{
  "endpoint": "POST /user/login"
}
```

#### Request body:

```json
{
  "nis": "string",
  "password": "string"
}
```

#### Response:

```json
{
  "message": "Login berhasil!",
  "token": "<JWT_TOKEN>",
  "user": {
    "nis": "string",
    "fullName": "string",
    "email": "string",
    "grade": "string",
    "idMajor": "string",
    "profilePicture": "url",
    "nickname": "string",
    "role": "string",
    "streak": 0
  }
}
```

---

### ✅ 3. **Get User Profile**

#### Endpoint

```json
{
  "endpoint": "GET /user/profile"
}
```

#### Headers:

```http
Authorization: Bearer <JWT_TOKEN>
```

#### Response:

```json
{
  "_id": "string",
  "nis": "string",
  "fullName": "string",
  "grade": "string",
  "idMajor": {
    "major_code": "string",
    "major_name": "string",
    "duration": number,
    "majorFullName": "string"
  },
  "profilePicture": "url",
  "nickname": "string",
  "role": "string",
  "streak": number,
  ...
}
```

---

### ✅ 4. **Update Profile**

#### Endpoint

```json
{
  "endpoint": "PUT /user/:id"
}
```

#### Headers:

```http
Authorization: Bearer <JWT_TOKEN>
Content-Type: multipart/form-data
```

#### Request Body:

```json
{
  "nis": "string",
  "fullName": "string",
  "grade": "string",
  "major": "string",
  "generation": "number",
  "status": "string",
  "createdAt": "YYYY-MM-DD",
  "role": "string",
  "profilePicture": File (optional)
}
```

#### Response:

```json
{
  "message": "Profil berhasil diperbarui",
  "user": { ...updatedUser }
}
```

---

### ✅ 5. **Get All Users (Admin only)**

#### Endpoint

```json
{
  "endpoint": "GET /user/profiles"
}
```

#### Headers:

```http
Authorization: Bearer <ADMIN_JWT_TOKEN>
```

#### Response:

```json
[
  {
    "_id": "string",
    "nis": "string",
    "fullName": "string",
    "grade": "string",
    "idMajor": {
      "major_code": "string",
      "major_name": "string"
    },
    "role": "string",
    "profilePicture": "url"
  },
  ...
]
```

---

### ✅ 6. **Delete User (Admin only)**

#### Endpoint

```json
{
  "endpoint": "DELETE /user/:id"
}
```

#### Headers:

```http
Authorization: Bearer <ADMIN_JWT_TOKEN>
```

#### Response:

```json
{
  "message": "Akun dan gambar profil berhasil dihapus"
}
```
