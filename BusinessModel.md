## 1. Consumer

**Who They Are:**  
Consumers are typically buyers or end‑users interested in market data, reading educational content, and placing orders. They are not directly involved in managing crops or field operations.

**Accessible Features:**

- **User Management & Profile**  
  - _Access:_ Their own profile via:  
    - `GET /api/users/profile`  
    - `PUT /api/users/profile`  
  - **Note:** They do not have permission to view other users’ details.

- **Market Data**  
  - _Access:_ Full viewing of market information including:  
    - `GET /api/markets`  
    - `GET /api/markets/{marketId}`  
    - `GET /api/markets/{marketId}/prices`  
    - `GET /api/crops/{cropId}/prices`

- **Knowledge Hub (Guides & Articles)**  
  - _Access:_ Read‑only capabilities:  
    - `GET /api/guides`  
    - `GET /api/guides/{guideId}`  
    - `GET /api/guides/{uid}/user`  
  - **Note:** They cannot create, update, or delete guides.

- **Marketplace**  
  - _Access:_ As buyers, they can:  
    - Browse items:  
      - `GET /api/marketplace/items`  
      - `GET /api/marketplace/items/{itemId}`  
    - Place orders:  
      - `POST /api/marketplace/orders`  
      - View their orders via:  
        - `GET /api/marketplace/orders`  
        - `GET /api/marketplace/orders/{orderId}`  
  - **Note:** They do not typically create or manage listings.

- **Weather Data**  
  - _Access:_ General weather information:  
    - `GET /api/weather`  
    - `GET /api/weather/{region}`  
    - `GET /api/weather/history`

---

## 2. Farmer

**Who They Are:**  
Farmers are the primary field operators. They use the system to manage their profiles, get guidance on what to grow and which fertilizers to use, track the progress of their crops, optimize resources, and interact with market and marketplace data.

**Accessible Features:**

- **User Management & Profile**  
  - _Access:_ Their own profile (same as consumers):  
    - `GET /api/users/profile`  
    - `PUT /api/users/profile`

- **Crops & Crop Recommendations**  
  - _Access:_  
    - Browse crops:  
      - `GET /api/crops`  
      - `GET /api/crops/{cropId}`  
    - Access personalized crop recommendations:  
      - `GET /api/users/{userId}/crop-recommendations`
  - **Optional:** Depending on your design, they might be allowed to initiate the generation of recommendations (via `POST /api/users/{userId}/crop-recommendations`) or this might be reserved for experts.

- **Fertilizers & Fertilizer Recommendations**  
  - _Access:_  
    - View fertilizer details:  
      - `GET /api/fertilizers`  
      - `GET /api/fertilizers/{fertilizerId}`  
    - Get their own fertilizer recommendations:  
      - `GET /api/users/{userId}/fertilizer-recommendations`
  - **Optional:** Generation (`POST /api/users/{userId}/fertilizer-recommendations`) might be limited to expert input.

- **Market Data**  
  - _Access:_ Same as Consumers:  
    - `GET /api/markets` and related endpoints for market and crop prices.

- **Knowledge Hub**  
  - _Access:_ Read‑only access:  
    - `GET /api/guides`, `GET /api/guides/{guideId}`, etc.
  - **Note:** Farmers generally consume the content but do not create or modify guides.

- **Marketplace**  
  - _Access:_ Both as buyers and as sellers:
    - **For browsing and ordering:**  
      - `GET /api/marketplace/items`  
      - `GET /api/marketplace/items/{itemId}`  
      - `POST /api/marketplace/orders` (and related order retrieval endpoints)
    - **For listing their produce or supplies:**  
      - `POST /api/marketplace/items`  
      - `PUT /api/marketplace/items/{itemId}`  
      - `DELETE /api/marketplace/items/{itemId}`  
    - **For managing orders on their listings:**  
      - `PUT /api/marketplace/orders/{orderId}` (e.g., to update order status)

- **Crop Progress Tracking**  
  - _Access:_ Full management capabilities:
    - Manage progress records:  
      - `GET /api/users/{userId}/crop-progress`  
      - `GET /api/crop-progress/{progressId}`  
      - `POST /api/users/{userId}/crop-progress`  
      - `PUT /api/crop-progress/{progressId}`  
      - `DELETE /api/crop-progress/{progressId}`
    - Manage milestones:  
      - `GET /api/crop-progress/{progressId}/milestones`  
      - `POST /api/crop-progress/{progressId}/milestones`  
      - `PUT /api/milestones/{milestoneId}`

- **Resource Optimization**  
  - _Access:_ Full control over their own logs/measurements:
    - **Irrigation Logs:**  
      - `GET /api/users/{userId}/irrigation-logs`  
      - `POST /api/users/{userId}/irrigation-logs`  
      - `PUT /api/irrigation-logs/{logId}`
    - **Soil Measurements:**  
      - `GET /api/users/{userId}/soil-measurements`  
      - `POST /api/users/{userId}/soil-measurements`  
      - `PUT /api/soil-measurements/{measurementId}`

- **Weather Data**  
  - _Access:_ As with other roles:
    - `GET /api/weather`, etc.

---

## 3. Agricultural Expert

**Who They Are:**  
Agricultural experts act as advisors, content creators, and (in some cases) elevated users with oversight functions. They can view and generate recommendations, manage educational content, and—even if not directly farming—can review progress and resource data to guide farmers.

**Accessible Features:**

- **User Management & Profile**  
  - _Access:_  
    - Their own profile:  
      - `GET /api/users/profile`  
      - `PUT /api/users/profile`
    - **Elevated Access:** Ability to retrieve details of other users via:  
      - `GET /api/users/{userId}`

- **Crops & Crop Recommendations**  
  - _Access:_  
    - Browse crop information (same as others):  
      - `GET /api/crops` and `GET /api/crops/{cropId}`
    - **Advisory Tools:**  
      - View personalized recommendations:  
        - `GET /api/users/{userId}/crop-recommendations`
      - **Generate/Add Recommendations:**  
        - `POST /api/users/{userId}/crop-recommendations`

- **Fertilizers & Fertilizer Recommendations**  
  - _Access:_  
    - View fertilizer listings:  
      - `GET /api/fertilizers` and `GET /api/fertilizers/{fertilizerId}`
    - **Advisory Tools:**  
      - View recommendations:  
        - `GET /api/users/{userId}/fertilizer-recommendations`
      - **Generate/Add Recommendations:**  
        - `POST /api/users/{userId}/fertilizer-recommendations`

- **Market Data**  
  - _Access:_ Full market information as with other roles.

- **Knowledge Hub**  
  - _Access:_ Elevated permissions for content management:
    - **Read:**  
      - `GET /api/guides`, `GET /api/guides/{guideId}`, `GET /api/guides/{uid}/user`
    - **Create/Modify:**  
      - `POST /api/guides`  
      - `PUT /api/guides/{guideId}`  
      - `DELETE /api/guides/{guideId}`

- **Marketplace**  
  - _Access:_  
    - **Viewing & Ordering:**  
      - `GET /api/marketplace/items` and related endpoints  
      - `POST /api/marketplace/orders` (if acting as a buyer)
    - **Listing Management:**  
      - May create and manage listings (via `POST`, `PUT`, and `DELETE` on items) if they participate as vendors.
    - **Order Management:**  
      - `PUT /api/marketplace/orders/{orderId}` (for updating order status on their own listings)

- **Crop Progress Tracking**  
  - _Access:_  
    - **Advisory/Review:**  
      - View farmers’ crop progress:  
        - `GET /api/users/{userId}/crop-progress`  
        - `GET /api/crop-progress/{progressId}`
      - **Note:** Typically, the creation, update, and deletion of progress records and milestones are performed by farmers. However, experts might be granted additional write access if your workflow requires collaborative management.

- **Resource Optimization**  
  - _Access:_  
    - **Advisory/Review:**  
      - View irrigation logs:  
        - `GET /api/users/{userId}/irrigation-logs`  
      - View soil measurements:  
        - `GET /api/users/{userId}/soil-measurements`
    - **Note:** Direct creation or modification is usually left to farmers, unless experts are tasked with managing these data for advisory purposes.

- **Weather Data**  
  - _Access:_  
    - `GET /api/weather`, `GET /api/weather/{region}`, and `GET /api/weather/history`

---

## Final Thoughts

- **Overlapping Endpoints:**  
  Many endpoints (such as market data and weather information) are general and accessible by all roles.

- **Role‑Specific Permissions:**  
  – The _creation_ of recommendations and guides is reserved for Agricultural Experts.  
  – _Crop Progress_ and _Resource Optimization_ functions are core to a farmer’s workflow, while experts generally use these as advisory inputs.  
  – In the marketplace, while all roles may browse and place orders, creating/managing listings is typically a farmer’s responsibility (or an expert’s if they act as vendors).
