# COWSERVE
Serve cowsay messages over http and https
### Usage   
Serve a cowsay message over http on localhost
```    
$ docker run -it -d -p 8080:8080 samuelesabella/cowserve   
$ curl --insecure http://localhost/
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
$ docker run -it -p 80:8080 --rm -e msg="Hello, cowsay!" samuelesabella/cowserve    
```
The container also supports https by setting the *::https::* tag inside the default message  
```    
$ docker run -it -p 80:8080 --rm -e msg="::https:: Hello, https cowsay!" samuelesabella/cowserve 
```
### Build the image    
```    
$ sudo docker build . -t cowserve    
``` 
