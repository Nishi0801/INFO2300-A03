# Agricultural Management System APIs

## 1. User Management and Profile
### Profile Operations
- `GET /api/users/profile` - Retrieve current user's profile details
- `PUT /api/users/profile` - Update current user's profile information
- `GET /api/users/{userId}` - Retrieve specific user details (admin access)

## 2. Crops & Crop Recommendations
### Crop Management
- `GET /api/crops` - List all crops
- `GET /api/crops/{cropId}` - Get specific crop details

### Recommendations
- `GET /api/users/{userId}/crop-recommendations` - Get personalized crop recommendations
- `POST /api/users/{userId}/crop-recommendations` - Generate/add crop recommendations

## 3. Fertilizers & Fertilizer Recommendations
### Fertilizer Management
- `GET /api/fertilizers` - List all fertilizers
- `GET /api/fertilizers/{fertilizerId}` - Get specific fertilizer details

### Recommendations
- `GET /api/users/{userId}/fertilizer-recommendations` - Get personalized recommendations
- `POST /api/users/{userId}/fertilizer-recommendations` - Generate recommendations

## 4. Market Data
### Market Information
- `GET /api/markets` - List market directories
- `GET /api/markets/{marketId}` - Get specific market details
- `GET /api/markets/{marketId}/prices` - Get market price trends
- `GET /api/crops/{cropId}/prices` - Get crop prices across markets

## 5. Knowledge Hub
### Guide Management
- `GET /api/guides` - List guides/articles
- `GET /api/guides/{guideId}` - Get specific guide content
- `GET /api/guides/{uid}/user` - Get user's guides
- `POST /api/guides` - Create guide (restricted)
- `PUT /api/guides/{guideId}` - Update guide
- `DELETE /api/guides/{guideId}` - Delete guide

## 6. Marketplace
### Item Management
- `GET /api/marketplace/items` - List marketplace items
- `GET /api/marketplace/items/{itemId}` - Get item details
- `POST /api/marketplace/items` - Create listing
- `PUT /api/marketplace/items/{itemId}` - Update listing
- `DELETE /api/marketplace/items/{itemId}` - Remove listing

### Order Management
- `POST /api/marketplace/orders` - Place order
- `GET /api/marketplace/orders` - List user orders
- `GET /api/marketplace/orders/{orderId}` - Get order details
- `PUT /api/marketplace/orders/{orderId}` - Update order status

## 7. Crop Progress Tracking
### Progress Management
- `GET /api/users/{userId}/crop-progress` - List progress records
- `GET /api/crop-progress/{progressId}` - Get progress details
- `POST /api/users/{userId}/crop-progress` - Create progress record
- `PUT /api/crop-progress/{progressId}` - Update progress
- `DELETE /api/crop-progress/{progressId}` - Remove progress record

### Milestones
- `GET /api/crop-progress/{progressId}/milestones` - List milestones
- `POST /api/crop-progress/{progressId}/milestones` - Add milestone
- `PUT /api/milestones/{milestoneId}` - Update milestone

## 8. Resource Optimization
### Irrigation Management
- `GET /api/users/{userId}/irrigation-logs` - Get irrigation logs
- `POST /api/users/{userId}/irrigation-logs` - Create irrigation log
- `PUT /api/irrigation-logs/{logId}` - Update irrigation log

### Soil Management
- `GET /api/users/{userId}/soil-measurements` - Get soil measurements
- `POST /api/users/{userId}/soil-measurements` - Create measurement
- `PUT /api/soil-measurements/{measurementId}` - Update measurement

## 9. Weather Data
### Weather Information
- `GET /api/weather` - Get latest weather updates
- `GET /api/weather/{region}` - Get regional weather
- `GET /api/weather/history` - Get historical weather data
