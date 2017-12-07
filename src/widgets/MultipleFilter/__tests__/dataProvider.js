/**
 * JS object data for the initial render
 */
export const initialDataProvider = {
    aggregations: {
        aggregations: {
            "year": {
                name: "year",
                total_elements: 3,
                counters: [
                    {
                        n: 12,
                        used: null,
                        values: {
                            id: 1999,
                            name: 'Year 1999'
                        }
                    },
                    {
                        n: 30,
                        used: null,
                        values: {
                            id: 2000,
                            name: 'Year 2000'
                        }
                    },
                    {
                        n: 5,
                        used: null,
                        values: {
                            id: 2001,
                            name: 'Year 2001'
                        }
                    },
                    {
                        n: 16,
                        used: null,
                        values: {
                            id: 1999,
                            name: 'Year 2003'
                        }
                    },
                    {
                        n: 33,
                        used: null,
                        values: {
                            id: 2000,
                            name: 'Year 2004'
                        }
                    },
                    {
                        n: 20,
                        used: null,
                        values: {
                            id: 2001,
                            name: 'Year 2005'
                        }
                    }
                ]
            }
        }
    }
};

/**
 * JS object data with the second aggregation selected
 */
export const updatedDataProvider = {
    aggregations: {
        aggregations: {
            "year": {
                name: "year",
                total_elements: 3,
                active_elements: {
                    2000: "2000"
                },
                counters: [
                    {
                        n: 12,
                        used: null,
                        values: {
                            id: 1999,
                            name: 'Year 1999'
                        }
                    },
                    {
                        n: 30,
                        used: true,
                        values: {
                            id: 2000,
                            name: 'Year 2000'
                        }
                    },
                    {
                        n: 5,
                        used: null,
                        values: {
                            id: 2001,
                            name: 'Year 2001'
                        }
                    },
                    {
                        n: 16,
                        used: null,
                        values: {
                            id: 1999,
                            name: 'Year 2003'
                        }
                    },
                    {
                        n: 33,
                        used: null,
                        values: {
                            id: 2000,
                            name: 'Year 2004'
                        }
                    },
                    {
                        n: 20,
                        used: null,
                        values: {
                            id: 2001,
                            name: 'Year 2005'
                        }
                    }
                ]
            }
        }
    }
};