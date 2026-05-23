# Guide: Integrating React with a Python Backend & Database

This guide explains how to make your downloaded project work locally and how to connect it to a Python backend with a database.

---

## 1. How to Make the Project Work Locally

To run the React frontend on your computer, follow these steps:

### Prerequisites
- Install **Node.js** (Version 18 or higher) from [nodejs.org](https://nodejs.org/).

### Steps
1. **Unzip the project** into a folder.
2. **Open a Terminal** (Command Prompt or VS Code Terminal) in that folder.
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```
5. **Open your browser** to the URL shown in the terminal (usually `http://localhost:3000`).

---

## 2. Integrating with a Python Backend ("Paython")

To move beyond `localStorage` and use a real database, you need a Python backend. We recommend using **FastAPI** because it is modern, fast, and easy to use with React.

### Recommended Stack
- **Backend Framework**: FastAPI (Python)
- **Database**: PostgreSQL (Production) or SQLite (Simple/Development)
- **ORM (Database Connector)**: SQLAlchemy or SQLModel

### Simple FastAPI Example (`main.py`)
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

# CRITICAL: Allow React to talk to Python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Property(BaseModel):
    id: str
    title: str
    description: str
    price: float
    type: str # 'rent' or 'sale'
    category: str # 'home', 'land', etc.
    location: str
    image: str
    area: float

# Mock Database
db = []

@app.get("/api/properties", response_model=List[Property])
def get_properties():
    return db

@app.post("/api/properties")
def create_property(prop: Property):
    db.append(prop)
    return {"message": "Property saved!"}
```

---

## 3. Implementing the Database

To save data permanently, you should use a database instead of a Python list.

1. **Install SQLAlchemy**: `pip install sqlalchemy`
2. **Create a Database Model**: Match the fields in your React `src/types.ts`.
3. **Connect to SQLite (Easiest)**: Create a file named `database.db` automatically using SQLAlchemy.

Example Database Connection:
```python
from sqlalchemy import create_url, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "sqlite:///./real_estate.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
```

---

## 4. Connecting React to your Python API

Currently, your app uses `localStorage` in `src/lib/storage.ts`. To connect to Python, you need to change those functions to use `fetch`.

### Example: Updating `src/lib/storage.ts`
```typescript
const API_URL = "http://localhost:8000/api";

export const getProperties = async (): Promise<Property[]> => {
  const response = await fetch(`${API_URL}/properties`);
  return await response.json();
};

export const saveProperty = async (property: Property) => {
  await fetch(`${API_URL}/properties`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(property),
  });
};
```

---

## 5. Summary Checklist
1. [ ] Run `npm install` and `npm run dev` for the frontend.
2. [ ] Create a Python environment (`python -m venv venv`).
3. [ ] Install FastAPI and Uvicorn (`pip install fastapi uvicorn`).
4. [ ] Build your API endpoints to match the React data needs.
5. [ ] Configure **CORS** in Python so React can access the data.
6. [ ] Replace the mock storage in React with `fetch` calls to your Python server.