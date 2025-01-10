# Cambridge Exam Backend

This project is a NestJS-based backend for managing product data stored in a CSV file. The API provides endpoints for CRUD operations and querying product types.

---

## Prerequisites

1. **Node.js**: Ensure Node.js (v16 or higher) is installed on your system. You can download it from [Node.js Official Website](https://nodejs.org/).
2. **npm**: npm comes bundled with Node.js. Use it to install dependencies.
3. **Nest CLI**: Install NestJS CLI globally if you don't already have it:

   ```bash
   npm install -g @nestjs/cli
   ```

4. **CSV File**: The project requires a `products.csv` file inside the `data` directory. Ensure the file is present with appropriate headers and data.

---

## Setup and Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/JuncentCrispino/cambridge-exam-backend.git
   cd cambridge-exam-backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   - Create a `.env` file in the root directory (if required).
   - Define `PORT` (default: 3000) if you wish to run the server on a custom port.

4. **Run the development server**:
   ```bash
   npm run start:dev
   ```

   The server will start at `http://localhost:3000` by default.

5. **Build for production**:
   ```bash
   npm run build
   ```

6. **Run in production**:
   ```bash
   npm run start:prod
   ```

---

## API Endpoints

The base URL for all endpoints is `/api`.

### 1. Get Distinct Product Types
**Endpoint:** `GET /api/product-types`

**Description:** Retrieves a list of distinct product types.

**Response:**
```json
{
  "productTypes": ["type1", "type2", ...]
}
```

---

### 2. Get All Products
**Endpoint:** `GET /api/products`

**Description:** Retrieves all products.

**Response:**
```json
{
  "products": [
    {
      "id": "1",
      "name": "Product A",
      "type": "type1"
    },
    ...
  ]
}
```

---

### 3. Get a Product by ID
**Endpoint:** `GET /api/products/:id`

**Description:** Retrieves details of a product by its ID.

**Path Parameter:**
- `id`: ID of the product to retrieve.

**Response:**
```json
{
  "id": "1",
  "name": "Product A",
  "type": "type1"
}
```

**Error Response:**
```json
{
  "statusCode": 404,
  "message": "Product not found.",
  "error": "Not Found"
}
```

---

### 4. Create a New Product
**Endpoint:** `POST /api/product`

**Description:** Adds a new product.

**Request Body:**
```json
{
  "id": "3",
  "name": "Product C",
  "type": "type3"
}
```

**Response:**
```json
{
  "message": "Product added successfully"
}
```

**Error Response:**
```json
{
  "statusCode": 400,
  "message": "Product with id 3 already exists.",
  "error": "Bad Request"
}
```

---

### 5. Update a Product
**Endpoint:** `PUT /api/:id`

**Description:** Updates an existing product by its ID.

**Path Parameter:**
- `id`: ID of the product to update.

**Request Body:**
```json
{
  "name": "Updated Product Name",
  "type": "updatedType"
}
```

**Response:**
```json
{
  "message": "Product updated successfully"
}
```

---

### 6. Delete a Product
**Endpoint:** `DELETE /api/product/:id`

**Description:** Deletes a product by its ID.

**Path Parameter:**
- `id`: ID of the product to delete.

**Response:**
```json
{
  "message": "Product deleted successfully"
}
```

---

## Project Structure

```
.
├── src
│   ├── app.module.ts           # Main application module
│   ├── main.ts                 # Application entry point
│   ├── products.controller.ts  # Products Controller
│   ├── products.service.ts     # Products Service
│   ├── products.dto.ts         # DTOs for validation
├── data
│   └── products.csv            # CSV file storing product data
├── package.json                # Project metadata and scripts
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation
```

---

## Notes

- **Validation:** The project uses `class-validator` and `class-transformer` for request validation.
- **Error Handling:** Standard NestJS exceptions like `BadRequestException` and `NotFoundException` are used.
- **CSV Storage:** Data is stored in `products.csv`. Ensure proper permissions for reading and writing to this file.
- **CORS:** CORS is enabled for all origins by default.

---

## Testing

1. **Run Unit Tests:**
   ```bash
   npm run test
   ```

2. **Run Coverage Report:**
   ```bash
   npm run test:cov
   ```

---