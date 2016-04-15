var globalId = 0;

var addressBook = {
	contact: []
};

function Contact(newContact) {
	this.name = newContact.name;
	this.phone = newContact.phone;
	this.address = newContact.address;
	this.email = newContact.email;
	this.id = newContact.id;
}



var displayContactNames = function() {
    $('#contactList').html("");
    for( var i = 0; i < addressBook.contact.length; i++) {
        var listHTML = '<li class="contactListItems">' + addressBook.contact[i].name + '</li>';
            listHTML += '<div class="fullInfo">';
        var prop;
        for (prop in addressBook.contact[i]) {
            // console.log(addressBook.contact[i].name);
            if (prop !== 'name' && prop !== 'id') {
                listHTML += '<li>' + addressBook.contact[i][prop] + '</li>';
            }
        }        
        listHTML += '<li><button type="btn btn-sm" data-id=' + addressBook.contact[i].id + '>Delete</button></li></div>';
        $('#contactList').append(listHTML);
    }
};

var newContactInformation = document.querySelector('#contactForm');

newContactInformation.addEventListener('submit', function(event) {
    event.preventDefault();
    var contact = new Contact({ name: this[0].value, 
                                email: this[1].value, 
                                phone: this[2].value, 
                                address: [this[3].value, this[4].value, this[5].value, this[6].value],
                                id: globalId
    });
    addressBook.contact.push(contact);
    displayContactNames();
    globalId++;
    $('#contactForm')[0].reset();
});

$('#contactList').on('click', 'li', function() {
    $(this).next().slideToggle();
});

$('#contactList').on('click', 'button', function() {
    var id = $(this).data('id');
    for (var i = 0; i < addressBook.contact.length; i++) {
        if (addressBook.contact[i].id === id) {
            addressBook.contact.splice(i, 1);
        }
    }
    displayContactNames();
});






