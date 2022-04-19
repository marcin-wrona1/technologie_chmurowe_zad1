import ipaddrJs from "ipaddr.js";
import publicIp from "public-ip";

const getPublicIp = async (addr) => {
    if (typeof addr !== "string")
        return null;

    const ip = (
        (
            (ip) => (
                ip.isIPv4MappedAddress() ? (
                    ip.toIPv4Address()
                ) : (
                    ip
                )
            )
        )(ipaddrJs.parse(addr))
    );

    return (
        [
            // https://github.com/whitequark/ipaddr.js/blob/dbd4c4f2f30aa82e166d0dfa25b2f5ccd3fc25be/lib/ipaddr.js#L184
            // https://github.com/whitequark/ipaddr.js/blob/dbd4c4f2f30aa82e166d0dfa25b2f5ccd3fc25be/lib/ipaddr.js#L532
            "unspecified",
            "broadcast",
            "linkLocal",
            "loopback",
            "private",
            "reserved"
        ].includes(ip.range()) ? (
            // lokalny IP - używamy publicznego IP serwera
            // powinno być takie samo jak klienta
            await Promise.any([
                publicIp.v4(),
                publicIp.v6()
            ])
        ) : (
            ip.toString()
        )
    );
};

export {
    getPublicIp
};
