# OPA-Publisher-CLient



/login

/admin

/admin/*
/admin/dashboard
/admin/students

Click login:
- call api
- success -> redirect admin
- failed -> show error

login
logout


//////

authSaga

loop
if logged in, watch LOGOUT,
else watch LOGIN

Login:
- call login api to get token, user
- set token
- redirect

Logout:
- Clear token
- redirect to login

setup login :

authSlice
authSaga