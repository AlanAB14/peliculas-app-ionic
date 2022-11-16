export interface Providers {
    id:      number;
    results?: Countries;
}

export interface Countries {
    AD: Country;
    AE: Country;
    AG: Country;
    AL: Country;
    AR: Country;
    AT: Country;
    AU: Country;
    BA: Country;
    BB: Country;
    BE: Country;
    BG: Country;
    BH: Country;
    BM: Country;
    BO: Country;
    BR: Country;
    BS: Country;
    CA: Country;
    CH: Country;
    CI: Country;
    CL: Country;
    CO: Country;
    CR: Country;
    CU: Country;
    CV: Country;
    CZ: Country;
    DE: Country;
    DK: Country;
    DO: Country;
    DZ: Country;
    EC: Country;
    EE: Country;
    EG: Country;
    ES: Country;
    FI: Country;
    FJ: Country;
    FR: Country;
    GB: Country;
    GF: Country;
    GG: Country;
    GH: Country;
    GI: Country;
    GQ: Country;
    GR: Country;
    GT: Country;
    HK: Country;
    HN: Country;
    HR: Country;
    HU: Country;
    ID: Country;
    IE: Country;
    IL: Country;
    IN: Country;
    IQ: Country;
    IS: Country;
    IT: Country;
    JM: Country;
    JO: Country;
    JP: Country;
    KE: Country;
    KR: Country;
    KW: Country;
    LB: Country;
    LC: Country;
    LI: Country;
    LT: Country;
    LV: Country;
    LY: Country;
    MA: Country;
    MC: Country;
    MD: Country;
    MK: Country;
    MT: Country;
    MU: Country;
    MX: Country;
    MY: Country;
    MZ: Country;
    NE: Country;
    NG: Country;
    NL: Country;
    NO: Country;
    NZ: Country;
    OM: Country;
    PA: Country;
    PE: Country;
    PF: Country;
    PH: Country;
    PK: Country;
    PS: Country;
    PT: Country;
    PY: Country;
    QA: Country;
    RO: Country;
    RS: Country;
    SA: Country;
    SC: Country;
    SE: Country;
    SG: Country;
    SI: Country;
    SK: Country;
    SM: Country;
    SN: Country;
    SV: Country;
    TC: Country;
    TH: Country;
    TN: Country;
    TR: Country;
    TT: Country;
    TW: Country;
    TZ: Country;
    UG: Country;
    US: Country;
    UY: Country;
    VA: Country;
    VE: Country;
    XK: Country;
    YE: Country;
    ZA: Country;
    ZM: Country;
}

export interface Country {
    link:     string;
    flatrate: Data[];
}

export interface Data {
    logo_path:        string;
    provider_id:      number;
    provider_name:    string;
    display_priority: number;
}