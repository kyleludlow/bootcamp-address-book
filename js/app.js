var addressBook = {
	contact: []
};

function newContact(name, email, phone, address) {
	this.name = name;
	this.phone = phone;
	this.address = address;
	this.email = email;
}

var displayContactNames = function() {
    for( var i = 0; i < addressBook.contact.length; i++) {
        $('#contactList').append('<li>' + addressBook.contact[i].name + '</li>');
    } 
};

var newContactInformation = document.querySelector('#contactForm');

newContactInformation.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log("Hello");
    var contact = new newContact(this[0].value, 
                                 this[1].value, 
                                 this[2].value, 
                                 [this[3].value, this[4].value, this[5].value, this[6].value]);
    addressBook.contact.push(contact);
    displayContactNames();
});






