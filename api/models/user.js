class User{
    constructor(firstName, lastName, email, password, dateOfBirth, address){
        this.firstName = firstName;
        this.lastName = lastName; 
        this.email = email;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
    }
}

class Address{
    constructor(streetAddress, city, country, postalCode){
        this.streetAddress = streetAddress;
        this.city = city;
        this.country = country;
        this.postalCode = postalCode;
    }
}