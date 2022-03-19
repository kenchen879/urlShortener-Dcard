# This repo is for Dcard - URL Shortener API

## Criteria
1. **URL shortener has 2 APIs**
   - A RESTful API to upload a URL with its expired date and response with a shorten URL.   
   - An API to serve shorten URLs responded by upload API, and redirect to original URL. If URL is expired, please response with status 404.   

2. **Please feel free to use any external libs if needed.**
3. **External storage** 
   - **MongoDB**
   - 是一種文件導向的資料庫管理系統   
   - Schema-less : MongoDB 具較有彈性的 Schema，因此沒有使用類似於MySQL來實作這個專案。   
   - 容易擴展 : MongoDB 採水平擴展，很容易在多台伺服器之間進行數據分割。   
   - 有[SaaS](https://cloud.mongodb.com/v2/62346f8992925b716e04619f#metrics/replicaSet/62347113da869e5f2c83013f/explorer/myFirstDatabase/urls/find)可遠端存取，不須在本地端。   
4. **Constrains and error handling of these 2 APIs.**
5. **Don't need to consider auth**
6. **Many clients might access shorten URL simultaneously or try to access with non-existent shorten URL, please take performance into account.**
    - Url檢查
    ![constrains](./img/POSTApi_error.jpg)
    - 程式碼
        ```javascript
        function validateUrlFormat(url) {
            return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
            url);
        }
        ```
## API

### Shorten URL
[Postman](https://www.postman.com/) 測試 API

```http
  POST /api/urls
```
| Field | Type   | Description        |
| :-    | :-     | :-                 |
| Body  | `json` | Input original Url |
| Body  | `json` | Expired Time       |

**Example**
![constrains](./img/POSTApi_normal.jpg)

### Get
- GET http://localhost/<url_id> => REDIRECT to original URL   
- 判斷是否已經過期

```http
  GET /:id
```

| Parameter | Type     | Description |
| :-        | :-       | :-          |
| `id`      | `string` | url_id      |

**Example**
![constrains](./img/GETApi_normal.jpg)
![constrains](./img/POSTApi_error2.jpg)

## 在本地端執行

Clone the project

```bash
  git clone https://github.com/kenchen879/urlShortener-Dcard
```

Go to the project directory

```bash
  cd urlShortener-Dcard
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```
