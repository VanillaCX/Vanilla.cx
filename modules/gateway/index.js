const {DNS} = require("../dns");

const apps = require("./app-list.js")
const services = require("./service-list.js")

const gateway = (req, res, next) => {
    const failed_to_find_match = false;
    const hostname = req.hostname;

    if(DNS.isSystemAPI(hostname)){
        // SYSTEM API (api.vanilla.cx)
        res.locals.meta = {}
        services.system_api(req, res, next)

    } else if(DNS.isSystemApp(hostname)) {
        // SYSTEM APP (matter.cx, substance.cx ...)
        const system_service = hostname.split(".")

        res.locals.meta = {
            app: system_service[0]
        }
        apps[system_service[0]](req, res, next)
        

    } else if(DNS.isUserDomain(hostname)) {
        // USER DOMAIN (leesbazaar.com)
        res.locals.meta = {
            requestDomain: hostname,
            requestService: "realms"
        }
        services.realms(req, res, next)

    } else {
        const {tld, sld, subdomains} = DNS.parseHostname(req.hostname)
        const single_sub_domain = (subdomains.length == 1) ? subdomains[0] : null;

        if (single_sub_domain && DNS.isUserDomain(sld + "." + tld)) {
            // USER DOMAIN (lessbazaar.com) WITH SINGLE SUB DOMAIN

            if (single_sub_domain === "api") {
                // USER API (ie. api.leesbazaar.com)
                res.locals.meta = {
                    requestDomain: (sld + "." + tld),
                    requestService: "api"
                }
                return services.user_api(req, res, next)
            } else if(DNS.isServiceHostname(single_sub_domain)) {
                // USER SERVICE (ie. matter.leesbazaar.com)
                res.locals.meta = {
                    requestDomain: (sld + "." + tld),
                    requestService: single_sub_domain
                }
                return services[single_sub_domain](req, res, next)
            }


        } else if (DNS.isUserHostname(single_sub_domain) && DNS.isSystemApp(sld + "." + tld)){
            // SYSTEM APP (ie. matter.cx, vanilla.cx) WITH SINGLE SUB DOMAIN
            
            res.locals.meta = {
                userHostname: single_sub_domain,
                service: sld
            }
            services[sld](req, res, next)

        } else {
            failed_to_find_match = true;
        }
        

    } 

    if (failed_to_find_match) {
        next()
    }
   
}

module.exports = gateway