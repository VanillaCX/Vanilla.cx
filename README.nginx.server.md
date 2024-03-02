server {
    listen 80;
    server_name leesbazaar.com *.leesbazaar.com api.leesbazaar.vanilla.cx;

    location / {
        proxy_set_header   X-Forwarded-For $remote_addr;
        proxy_set_header   Host $http_host;
        proxy_pass         http://localhost:8081;
    }
}

server {
    listen 80;
    server_name vanilla.cx *.vanilla.cx;

    location / {
        proxy_set_header   X-Forwarded-For $remote_addr;
        proxy_set_header   Host $http_host;
        proxy_pass         http://localhost:8081;
    }
}

server {
    listen 80;
    server_name matter.cx *.matter.cx;

    location / {
        proxy_set_header   X-Forwarded-For $remote_addr;
        proxy_set_header   Host $http_host;
        proxy_pass         http://localhost:8081;
    }
}

server {
    listen 80;
    server_name substance.cx *.substance.cx;

    location / {
        proxy_set_header   X-Forwarded-For $remote_addr;
        proxy_set_header   Host $http_host;
        proxy_pass         http://localhost:8081;
    }
}

server {
    listen 80;
    server_name surface.cx *.surface.cx;

    location / {
        proxy_set_header   X-Forwarded-For $remote_addr;
        proxy_set_header   Host $http_host;
        proxy_pass         http://localhost:8081;
    }
}

server {
    listen 80;
    server_name realms.cx *.realms.cx;

    location / {
        proxy_set_header   X-Forwarded-For $remote_addr;
        proxy_set_header   Host $http_host;
        proxy_pass         http://localhost:8081;
    }
}