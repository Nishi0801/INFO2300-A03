-- 1. Users Table
-- Stores additional user details. The Firebase UID is stored as a unique identifier.
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firebase_uid VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    role VARCHAR(50) CHECK (role IN ('farmer', 'agricultural_expert', 'consumer')) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 2. Crops Table
-- Lists the crops supported by the system.
CREATE TABLE crops (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    optimal_season VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Fertilizers Table
-- Contains information about fertilizers.
CREATE TABLE fertilizers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    composition TEXT,
    usage_instructions TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Crop Recommendations Table
-- Stores personalized crop recommendations for users.
CREATE TABLE crop_recommendations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    crop_id INTEGER NOT NULL REFERENCES crops(id) ON DELETE CASCADE,
    recommendation_score DECIMAL(5,2),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 5. Fertilizer Recommendations Table
-- Stores personalized fertilizer recommendations for users.
CREATE TABLE fertilizer_recommendations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    fertilizer_id INTEGER NOT NULL REFERENCES fertilizers(id) ON DELETE CASCADE,
    recommendation_score DECIMAL(5,2),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 6. Markets Table
-- Contains market directories with location details.
CREATE TABLE markets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    region VARCHAR(100),
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 7. Market Prices Table
-- Logs market price trends for specific crops.
CREATE TABLE market_prices (
    id SERIAL PRIMARY KEY,
    market_id INTEGER NOT NULL REFERENCES markets(id) ON DELETE CASCADE,
    crop_id INTEGER NOT NULL REFERENCES crops(id) ON DELETE CASCADE,
    price NUMERIC(10,2) NOT NULL,
    price_date DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 8. Guides Table
-- Represents the knowledge hub articles or guides for sustainable practices.
CREATE TABLE guides (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    region VARCHAR(100),
    category VARCHAR(100),
    author_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 9. Marketplace Items Table
-- Items listed for sale by farmers (seeds, tools, produce).
CREATE TABLE marketplace_items (
    id SERIAL PRIMARY KEY,
    seller_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category VARCHAR(50) CHECK (category IN ('seed', 'tool', 'produce')) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    status VARCHAR(50) DEFAULT 'available',  -- e.g., available, sold, etc.
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 10. Marketplace Orders Table
-- Captures orders/transactions for marketplace items.
CREATE TABLE marketplace_orders (
    id SERIAL PRIMARY KEY,
    buyer_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    item_id INTEGER NOT NULL REFERENCES marketplace_items(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    total_price NUMERIC(10,2) NOT NULL,
    order_status VARCHAR(50) DEFAULT 'pending',  -- e.g., pending, completed, cancelled
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 11. Crop Progress Table
-- Tracks a farmer’s crop progress.
CREATE TABLE crop_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    crop_id INTEGER NOT NULL REFERENCES crops(id) ON DELETE CASCADE,
    planting_date DATE,
    expected_harvest_date DATE,
    status VARCHAR(50) DEFAULT 'in_progress',  -- e.g., in_progress, completed
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 12. Crop Progress Milestones Table
-- Logs milestones for each crop progress record.
CREATE TABLE crop_progress_milestones (
    id SERIAL PRIMARY KEY,
    crop_progress_id INTEGER NOT NULL REFERENCES crop_progress(id) ON DELETE CASCADE,
    milestone_description TEXT NOT NULL,
    achieved BOOLEAN DEFAULT FALSE,
    achieved_date DATE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 13. Irrigation Logs Table
-- Records details about irrigation events for resource optimization.
CREATE TABLE irrigation_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    field_identifier VARCHAR(100),  -- Identifier for the specific field or area
    water_used NUMERIC(10,2),         -- e.g., in liters
    irrigation_date DATE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 14. Soil Measurements Table
-- Stores soil data including pH and nutrient levels.
CREATE TABLE soil_measurements (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    field_identifier VARCHAR(100),
    soil_ph NUMERIC(3,2),
    nutrient_levels JSONB,  -- Example format: {"nitrogen": 10, "phosphorus": 5, "potassium": 8}
    measurement_date DATE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 15. Weather Updates Table
-- Contains real-time weather updates for regions.
CREATE TABLE weather_updates (
    id SERIAL PRIMARY KEY,
    region VARCHAR(100),
    temperature NUMERIC(5,2),  -- In degrees Celsius (or as appropriate)
    humidity NUMERIC(5,2),     -- As a percentage
    rainfall NUMERIC(10,2),    -- e.g., in mm
    wind_speed NUMERIC(5,2),   -- e.g., in km/h
    update_time TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
