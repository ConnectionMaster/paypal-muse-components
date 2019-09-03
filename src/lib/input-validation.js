/* @flow */
const getType = (input : any) => {
    if (Array.isArray(input)) {
        return 'array';
    }

    if (input === null) {
        return 'null';
    }

    return typeof input;
};

// Performs 'typeof' check on every key in 'input'
const checkKeys = (input : any, expectedInput : any) => {
    // input must be an object
    if (getType(input) !== 'object') {
        throw new Error(`Input error: expected ${ getType(input) } to be object`);
    }

    for (const key in expectedInput) {
        const expected = expectedInput[key];
        const actual = getType(input[key]);

        if (expected.indexOf(actual) === -1) {
            throw new Error(`Input error for ${ key }: expected ${ actual } to be ${ expected[0] }`);
        }
    }
};

const checkArrayKeys = (input : any, expectedInput : any) => {
    // input must be an array
    if (getType(input) !== 'array') {
        throw new Error(`Input error: expected ${ getType(input) } to be array`);
    }

    input.forEach(inputItem => checkKeys(inputItem, expectedInput));
};

export const validateAddItems = (input : any) => {
    const inputKeys = {
        items: [ 'array' ],
        cartId: [ 'string', 'undefined' ]
    };

    const itemKeys = {
        id: [ 'string' ],
        title: [ 'string' ],
        url: [ 'string' ],
        imgUrl: [ 'string' ],
        price: [ 'string' ],
        quantity: [ 'number', 'undefined' ],
        keywords: [ 'array', 'undefined' ],
        otherImages: [ 'array', 'undefined' ],
        description: [ 'string', 'undefined' ]
    };

    checkKeys(input, inputKeys);
    checkArrayKeys(input.items, itemKeys);
};

export const validateRemoveItems = (input : any) => {
    const inputKeys = {
        items: [ 'array' ],
        cartId: [ 'string', 'undefined' ]
    };

    const itemKeys = {
        id: [ 'string' ],
        quantity: [ 'number', 'undefined' ]
    };

    checkKeys(input, inputKeys);
    checkArrayKeys(input.items, itemKeys);
};

export const validateUser = (input : any) => {
    const inputKeys = {
        id: [ 'string', 'null', 'undefined' ],
        email: [ 'string', 'null', 'undefined' ],
        name: [ 'string', 'null', 'undefined' ],
        user: [ 'object', 'undefined' ]
    };

    const userKeys = {
        id: [ 'string', 'null', 'undefined' ],
        email: [ 'string', 'null', 'undefined' ],
        name: [ 'string', 'null', 'undefined' ]
    };

    checkKeys(input, inputKeys);

    if (input.user) {
        checkKeys(input.user, userKeys);
    }
};