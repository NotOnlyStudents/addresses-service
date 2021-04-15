---
title: EmporioLambda Backend v0.1.0
language_tabs:
  - shell: curl
language_clients:
  - shell: ""
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="emporiolambda-backend">EmporioLambda Backend v0.1.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

REST interfaces for EmporioLambda Backend

Base URLs:

* <a href="https://app.swaggerhub.com/apis/NotOnlyStudents/Backend/0.0.1">https://app.swaggerhub.com/apis/NotOnlyStudents/Backend/0.0.1</a>

* <a href="http://localhost:3000/dev">http://localhost:3000/dev</a>

* <a href="http://api.annoiato.net/test">http://api.annoiato.net/test</a>

* <a href="http://api.annoiato.net/staging">http://api.annoiato.net/staging</a>

# Authentication

- oAuth2 authentication. This API uses OAuth2.0 with implicit flow.

    - Flow: implicit
    - Authorization URL = [https://emporiolambda.auth.eu-west-1.amazoncognito.com/oauth2/authorize](https://emporiolambda.auth.eu-west-1.amazoncognito.com/oauth2/authorize)

|Scope|Scope Description|
|---|---|
|read|read for customers and admins|
|readAdmin|read only for admins|
|writeUser|edit data only for users|
|writeAdmin|edit data only for admins|

<h1 id="emporiolambda-backend-addresses">addresses</h1>

The addresses service

## get__addresses

> Code samples

```shell
# You can also use wget
curl -X GET https://app.swaggerhub.com/apis/NotOnlyStudents/Backend/0.0.1/addresses \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

`GET /addresses`

Return the list of all delivery addresses

> Example responses

> 200 Response

```json
{
  "data": [
    {
      "id": "string",
      "nation": "string",
      "city": "string",
      "address": "string",
      "cap": 0
    }
  ]
}
```

<h3 id="get__addresses-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successfully get the list of all delivery addresses|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request, {username} must be a string.|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Authorization information is missing or invalid.|Inline|
|5XX|Unknown|Unexpected error.|Inline|

<h3 id="get__addresses-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» data|[[#/paths/~1addresses/get/responses/200/content/application~1json/schema/properties/data/items](#schema#/paths/~1addresses/get/responses/200/content/application~1json/schema/properties/data/items)]|false|none|none|
|»» id|string|true|none|none|
|»» nation|string|true|none|none|
|»» city|string|true|none|none|
|»» address|string|true|none|none|
|»» cap|number|true|none|none|

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|true|none|none|

Status Code **401**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|true|none|none|

Status Code **5XX**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|true|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oAuth ( Scopes: read )
</aside>

## post__addresses

> Code samples

```shell
# You can also use wget
curl -X POST https://app.swaggerhub.com/apis/NotOnlyStudents/Backend/0.0.1/addresses \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

`POST /addresses`

Create a new delivery address belongs to a user

> Body parameter

```json
{
  "nation": "string",
  "city": "string",
  "address": "string",
  "cap": 0
}
```

<h3 id="post__addresses-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|Delivery address to create|
|» nation|body|string|true|none|
|» city|body|string|true|none|
|» address|body|string|true|none|
|» cap|body|number|true|none|

> Example responses

> 201 Response

```json
{
  "data": {
    "id": "string",
    "nation": "string",
    "city": "string",
    "address": "string",
    "cap": 0
  }
}
```

<h3 id="post__addresses-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successfully created a new delivery address|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request.|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Authorization information is missing or invalid.|Inline|
|5XX|Unknown|Unexpected error.|Inline|

<h3 id="post__addresses-responseschema">Response Schema</h3>

Status Code **201**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» data|[#/paths/~1addresses/get/responses/200/content/application~1json/schema/properties/data/items](#schema#/paths/~1addresses/get/responses/200/content/application~1json/schema/properties/data/items)|false|none|none|
|»» id|string|true|none|none|
|»» nation|string|true|none|none|
|»» city|string|true|none|none|
|»» address|string|true|none|none|
|»» cap|number|true|none|none|

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|true|none|none|

Status Code **401**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|true|none|none|

Status Code **5XX**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|true|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oAuth ( Scopes: writeUser )
</aside>

## get__addresses_{addressId}

> Code samples

```shell
# You can also use wget
curl -X GET https://app.swaggerhub.com/apis/NotOnlyStudents/Backend/0.0.1/addresses/{addressId} \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

`GET /addresses/{addressId}`

Get the delivery address with the specified {ID}

<h3 id="get__addresses_{addressid}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|addressId|path|string|true|none|

> Example responses

> 200 Response

```json
{
  "data": {
    "id": "string",
    "nation": "string",
    "city": "string",
    "address": "string",
    "cap": 0
  }
}
```

<h3 id="get__addresses_{addressid}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Return the delivery address with the specified {ID}|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request, {ID} must be a string.|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Authorization information is missing or invalid.|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|A delivery address with the specified {ID} was not found.|Inline|
|5XX|Unknown|Unexpected error.|Inline|

<h3 id="get__addresses_{addressid}-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» data|[#/paths/~1addresses/get/responses/200/content/application~1json/schema/properties/data/items](#schema#/paths/~1addresses/get/responses/200/content/application~1json/schema/properties/data/items)|false|none|none|
|»» id|string|true|none|none|
|»» nation|string|true|none|none|
|»» city|string|true|none|none|
|»» address|string|true|none|none|
|»» cap|number|true|none|none|

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|true|none|none|

Status Code **401**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|true|none|none|

Status Code **404**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|true|none|none|

Status Code **5XX**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|true|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oAuth ( Scopes: read )
</aside>

## patch__addresses_{addressId}

> Code samples

```shell
# You can also use wget
curl -X PATCH https://app.swaggerhub.com/apis/NotOnlyStudents/Backend/0.0.1/addresses/{addressId} \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

`PATCH /addresses/{addressId}`

Modify the delivery address with the specified {ID}

> Body parameter

```json
{
  "nation": "string",
  "city": "string",
  "address": "string",
  "cap": 0
}
```

<h3 id="patch__addresses_{addressid}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|addressId|path|string|true|none|
|body|body|object|true|Delivery address' fields to be changend|
|» nation|body|string|false|none|
|» city|body|string|false|none|
|» address|body|string|false|none|
|» cap|body|number|false|none|

> Example responses

> 200 Response

```json
{
  "data": {
    "id": "string",
    "nation": "string",
    "city": "string",
    "address": "string",
    "cap": 0
  }
}
```

<h3 id="patch__addresses_{addressid}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Return the modified delivery address with the specified {ID}|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request, {ID} must be a string.|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Authorization information is missing or invalid.|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|A delivery address with the specified {ID} was not found.|Inline|
|5XX|Unknown|Unexpected error.|Inline|

<h3 id="patch__addresses_{addressid}-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» data|[#/paths/~1addresses/get/responses/200/content/application~1json/schema/properties/data/items](#schema#/paths/~1addresses/get/responses/200/content/application~1json/schema/properties/data/items)|false|none|none|
|»» id|string|true|none|none|
|»» nation|string|true|none|none|
|»» city|string|true|none|none|
|»» address|string|true|none|none|
|»» cap|number|true|none|none|

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|true|none|none|

Status Code **401**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|true|none|none|

Status Code **404**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|true|none|none|

Status Code **5XX**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|true|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oAuth ( Scopes: writeUser )
</aside>

## delete__addresses_{addressId}

> Code samples

```shell
# You can also use wget
curl -X DELETE https://app.swaggerhub.com/apis/NotOnlyStudents/Backend/0.0.1/addresses/{addressId} \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

`DELETE /addresses/{addressId}`

delete the delivery address with the specified {ID}

<h3 id="delete__addresses_{addressid}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|addressId|path|string|true|none|

> Example responses

> 400 Response

```json
{
  "message": "string"
}
```

<h3 id="delete__addresses_{addressid}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successfully delete the delivery address with the specified {ID}|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request, {ID} must be a string.|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Authorization information is missing or invalid.|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|A delivery address with the specified {ID} was not found.|Inline|
|5XX|Unknown|Unexpected error.|Inline|

<h3 id="delete__addresses_{addressid}-responseschema">Response Schema</h3>

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|true|none|none|

Status Code **401**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|true|none|none|

Status Code **404**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|true|none|none|

Status Code **5XX**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|true|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oAuth ( Scopes: writeUser )
</aside>

