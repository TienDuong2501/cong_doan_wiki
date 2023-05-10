export interface Api {
    id?: string,
    gravitee: string,
    definition: {
        id?: string,
        gravitee: string,
        definition: {
            
        },
        proxy: {
            endpoints: [
            {
                name: string,
                target: string,
                inherit: boolean
            }
            ],
            context_path: string
        },
        pages: [],
        plans: [
            {
            characteristics: [],
            name: string,
            security: string,
            description: string,
            validation: string,
            flows: [
                {
                pathoperator: {
                    path: string,
                    operator: string
                },
                condition: "",
                pre: [
                    {
                    name: "Rate limit",
                    policy: "rate-limit",
                    configuration: {
                        rate: {
                        limit: number,
                        periodTime: number,
                        periodTimeUnit: string
                        }
                    }
                    },
                    {
                    name: "Quota",
                    policy: "quota",
                    configuration: {
                        quota: {
                        limit: number,
                        periodTime: number,
                        periodTimeUnit: string
                        },
                        addHeaders: true
                    }
                    }
                ],
                post: []
                }
            ],
            status: "STAGING"
            }
        ],
        tags: [],
        groups: [],
        name: string,
        lifecycleState: string,
        version: string,
        system: string,
        description: string
    },
    proxy: {
        endpoints: [
        {
            name: string,
            target: string,
            inherit: boolean
        }
        ],
        context_path: string
    },
    pages: [],
    plans: [
        {
        characteristics: [],
        name: string,
        security: string,
        description: string,
        validation: string,
        flows: [
            {
            pathoperator: {
                path: string,
                operator: string
            },
            condition: "",
            pre: [
                {
                name: "Rate limit",
                policy: "rate-limit",
                configuration: {
                    rate: {
                    limit: number,
                    periodTime: number,
                    periodTimeUnit: string
                    }
                }
                },
                {
                name: "Quota",
                policy: "quota",
                configuration: {
                    quota: {
                    limit: number,
                    periodTime: number,
                    periodTimeUnit: string
                    },
                    addHeaders: true
                }
                }
            ],
            post: []
            }
        ],
        status: "STAGING"
        }
    ],
    tags: [],
    groups: [],
    name: string,
    lifecycleState: string,
    version: string,
    system: string,
    description: string
}