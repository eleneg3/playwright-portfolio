export const users = {
    valid: {
        email: 'customer3@practicesoftwaretesting.com',
        password: 'pass123'
    },

    wrongEmail: {
        email: 'wrong-email@practicesoftwaretesting.com',
        password: 'welcome01'
    },

    wrongPassword: {
        email: 'customer@practicesoftwaretesting.com',
        password: 'wrongpassword'
    }
};

export const generateEmail = () =>
    `testuser${Date.now()}@example.com`;

export const newUser = { 
    valid: () => ({
        firstName: 'Test',
        lastName: 'Test',
        dateOfBirth: '1999-01-01',
        countryDropdown: 'GB',
        postCode: '12345',
        houseNumber: '221',
        street: 'Baker Street',
        city: 'London',
        state: 'London',
        phoneNumber: '123456789',
        email: generateEmail(),
        password: 'ValidPassword987!!'
    }),

    existingEmail: {
        firstName: 'Test',
        lastName: 'Test',
        dateOfBirth: '1999-01-01',
        countryDropdown: 'GB',
        postCode: '12345',
        houseNumber: '221',
        street: 'Baker Street',
        city: 'London',
        state: 'London',
        phoneNumber: '123456789',
        email: 'customer2@practicesoftwaretesting.com',
        password: 'ValidPassword987!!'
    },

    invalidPassword: () => ({
        firstName: 'Test',
        lastName: 'Test',
        dateOfBirth: '1999-01-01',
        countryDropdown: 'GB',
        postCode: '12345',
        houseNumber: '221',
        street: 'Baker Street',
        city: 'London',
        state: 'London',
        phoneNumber: '123456789',
        email: generateEmail(),
        password: '1234'
    }),
}