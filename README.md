# COWSERVE
Serve cowsay messages over http and https
### Usage   
Serve a cowsay message over https on localhost:4443
```    
$ docker run -it -d -p 4443:8080 sabellas/cowserve   
$ curl -k http://localhost:4443/
 ____________________________ 
< Cowserve by samuelesabella >
 ---------------------------- 
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```
Cowsay messages are set using the request path (e.g. retrieving *https://localhost/abc* will return a cowsay "abc" message).
**cowserve** supports default messages by specifiying the environment variable *msg* 
```    
$ docker run -it -p 4443:8080 --rm -e msg="Hello, cowsay!" sabellas/cowserve    
```
The container also supports http by setting the *::http::* tag inside the default message  
```    
$ docker run -it -p 80:8080 --rm -e msg="::http:: Hello, http cowsay!" sabellas/cowserve 
```
### Build the image    
```    
$ sudo docker build . -t sabellas/cowserve    
``` 
