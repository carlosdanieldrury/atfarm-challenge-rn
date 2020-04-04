**Get Fields**
----

```http
GET https://api.steinhq.com/v1/storages/5e4279e25a823204986f3b62/fields
```

**Success Response:**
* **Code:** 200
```javascript
[{
  "name" : string,
  "area" : number,
  "cropType" : string, cotton|maize|oats|wheat
}, ...]
```


**Create Field**
----
```http
POST https://api.steinhq.com/v1/storages/5e4279e25a823204986f3b62/fields
```
**Data Params**
```javascript
[{
  "name" : string,
  "area" : number,
  "cropType" : string, cotton|maize|oats|wheat
}, ...]
```

**Success Response:**
* **Code:** 200

