class DNS {
    static #user_domain_names;
    static #user_host_names;
    static #service_host_names;
    static #system_api;
    static #system_apps;

    static refresh_cache(){
        const fake_db_request = {
            userDomainNames: ["leesbazaar.com"],
            userHostNames: ["leesbazaar"],
            serviceHostNames: ["vanilla", "substance", "matter", "surface", "realms"],
            
            systemAPI: "api.vanilla.cx",
            systemApps: ["vanilla.cx", "matter.cx", "substance.cx", "surface.cx", "realms.cx"]
        };

        this.#user_host_names = fake_db_request.userHostNames;
        this.#service_host_names = fake_db_request.serviceHostNames;
        
        this.#user_domain_names = fake_db_request.userDomainNames;

        this.#system_api = fake_db_request.systemAPI
        this.#system_apps = fake_db_request.systemApps
    }

    static isSystemAPI(value) {
        return value === this.#system_api
    }

    static isSystemApp(value) {
        return this.#system_apps.includes(value)
    }

    static isUserDomain(value) {
        console.log("checking :", value)
        return this.#user_domain_names.includes(value)
    }

    static isUserHostname(value) {
        return this.#user_host_names.includes(value)
    }

    static isServiceHostname(value) {
        return this.#service_host_names.includes(value)
    }

    static parseHostname (value) {
        const path = value.split(".");

        path.reverse();

        return {
            tld: path.shift(),
            sld: path.shift(),
            subdomains: path 
        }
    }

    


   
}

DNS.refresh_cache()


module.exports = {DNS}