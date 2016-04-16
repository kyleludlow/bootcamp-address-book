var globalId = 0; // each contact will have an indiviual global id 
var newContactForm = document.querySelector('#contactForm'); 

// Address book object
var addressBook = {
	contact: []
};

// constuctor function for new contacts
function Contact(newContact) {
	this.name = newContact.name;
	this.phone = newContact.phone;
	this.addressLine1 = newContact.addressLine1;
	this.addressLine2 = newContact.addressLine2;
	this.addressLine3 = newContact.addressLine3;
	this.addressLine4 = newContact.addressLine4;
	this.email = newContact.email;
	this.id = newContact.id;
}



var displayContactNames = function() {
    // clear current list to prevent duplicates and clear deleted contacts
    $('#contactList').html(""); 
    // loop through each contact and build HTML
    for( var i = 0; i < addressBook.contact.length; i++) {
        var listHTML = '<div class="contactListItem"><li data-id="' + addressBook.contact[i].id + '">' + addressBook.contact[i].name + '</li>';
        
        var prop; 
        for (prop in addressBook.contact[i]) {
            if (prop !== 'id') { // don't want the id in the contact view
                listHTML += '<li class="fullInfo" data-id="' + addressBook.contact[i].id +'">' + addressBook.contact[i][prop] + '</li>';
            }
        }        
        listHTML += '<li><button class="btn btn-danger" data-id=' + addressBook.contact[i].id + '>Delete</button></li><div>'; // close out HTML
        $('#contactList').append(listHTML); // append full contact to list
    }
};


$(function() { // jquery doc ready shorthand

    // adding a new contact handler
    newContactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        var contact = new Contact({ name: this[0].value, 
                                    email: this[1].value, 
                                    phone: this[2].value, 
                                    addressLine1: this[3].value,
                                    addressLine2: this[4].value, 
                                    addressLine3: this[5].value, 
                                    addressLine4: this[6].value,
                                    id: globalId
        });
        addressBook.contact.push(contact);
        displayContactNames(); // repopulate list with new addition
        globalId++;            // update global id for next contact
        $('#contactForm')[0].reset();
        $('input[name="name"]').focus();
    });
    
    // handler for displaying full contact info
    $('#contactList').on('click', 'li', function() {
        var id = $(this).data('id');
        $('[data-id="' + id + '"]').slideToggle();
    });
    
    
    // handler for deleting a contact
    $('#contactList').on('click', 'button', function() {
        var id = $(this).data('id');
        for (var i = 0; i < addressBook.contact.length; i++) {
            if (addressBook.contact[i].id === id) {
                addressBook.contact.splice(i, 1);
            }
        }
        displayContactNames();
    });
    
    // bootstrap fix for giving focus to input on modal show
    $('#addContactModal').on('shown.bs.modal', function () {
      $('input[name="name"]').focus();
    })

});





