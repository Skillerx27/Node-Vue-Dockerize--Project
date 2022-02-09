RUN docker-compose up -d for running the project 
Back is running 
on port 3030 for serving http request
on port 4040 for serving socket request
on port 5050 for testing socket pre-test-case 

for testing socket pre-test-case 
goto test directory folder and RUN mocha -R spec 

for updating product price Post request
http://localhost:3030/api/v1/auth/setBidLimit
{
    "id":2,
    "priceLimit":30
}
for login post request
http://localhost:3030/api/v1/auth/login
{
    "password":"1234",
    "email":"piash@gmail.com"
}
productList get request
http://localhost:3030/api/v1/auth/producList
required Authorization token 
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyQWNjZXNzIjoiMTcxY2JiMWYtZjhhMi00NDMyLWExNDAtZTllNjIwNDcyMTg4IiwiaWF0IjoxNjQ0Mzk3OTIyLCJleHAiOjE2NDQ0MDUxMjJ9.lKUjuMnxGGVaXThrJ_nr0aC0UjI9eqmobbx6uN6gFu4

