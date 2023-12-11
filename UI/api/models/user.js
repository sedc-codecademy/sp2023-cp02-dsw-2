class User{
    constructor(firstName, lastName, email, password, dateOfBirth, phoneNumber, profileImage, address, cart, wishList){
        this.firstName = firstName;
        this.lastName = lastName; 
        this.email = email;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.phoneNumber = phoneNumber;
        this.profileImage = profileImage;
        this.address = address;
        this.cart= cart;
        this.wishList = wishList;
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
