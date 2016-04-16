var globalId = 0; // each contact will have an indiviual global id 
var newContactForm = document.querySelector('#contactForm'); 

// Address book object
var addressBook = {
	contacts: [],
	
	// catch all function to find an entry by it's unique ID
	findEntry: function(id) {
	    var obj = this.contacts.filter(function(x) { // jump into contacts array and assign contact entry object to x
	        return x.id === id; // return the entry's ID to 'obj' if it matches the ID passed as an argument;
	    });
	    return obj.pop(); // I have no idea why this works. without .pop() you get an unreadable object. Actually added by accident when playing with it in DevTools
	},
	
	
	addPhone: function(id, number) {
	    var entry = this.findEntry(id);
	    entry.phone.push(number);
	},
	
	addEmail: function(id, email) {
	    var entry = this.findEntry(id);
	    entry.email.push(email);
	},
	
	getPhoneHTML: function(id) {
	    var entry = this.findEntry(id);
	    var HTML = "";
	    for (var i = 0; i < entry.phone.length; i++) {
	        HTML += '<li data-id="' + entry.id + '" class="fullInfo">Phone Number ' + (i + 1) + ': ' + entry.phone[i] + '</li>';
	    }
	    return HTML;
	},
	
	getEmailHTML: function(id) {
	    var entry = this.findEntry(id);
	    var HTML = "";
	    for (var i = 0; i < entry.email.length; i++) {
	        HTML += '<li data-id="' + entry.id + '" class="fullInfo">Email ' + (i + 1) + ': ' + entry.email[i] + '</li>';
	    }
	    return HTML;
	},
	
	getAddressHTML: function(id) {
	    var entry = this.findEntry(id);
	    var HTML = "";
	    for (var i = 0; i < entry.address.length; i++) {
	        HTML += '<li data-id="' + entry.id + '" class="fullInfo">Address ' + (i + 1) + ': ' + entry.address[i] + '</li>';
	    }
	    return HTML;
	},
	
	getAllDetails: function() {
	    var fullDetailsHTML = "";
	    var that = this; // storing current reference to 'this' (the address book) for use inside the loop
	    this.contacts.forEach(function(entry) { // forEach 'entry' in the contacts array...
	        fullDetailsHTML += '<div class="contactListItem">';
	        fullDetailsHTML += '<li data-id="' + entry.id + '">Name: ' + entry.name + '</li>';
	        fullDetailsHTML += that.getPhoneHTML(entry.id);
	        fullDetailsHTML += that.getEmailHTML(entry.id);
	        fullDetailsHTML += that.getAddressHTML(entry.id);
	        fullDetailsHTML += '<li><button class="btn btn-danger" data-id=' + entry.id + '>Delete</button></li>';
	        fullDetailsHTML += '</div>';
	    });
	    return fullDetailsHTML;
	}
};

// constuctor function for new contacts
function Contact(newContact) {
	this.name = newContact.name;
	this.phone = newContact.phone;
	this.address = newContact.address;
	this.email = newContact.email;
	this.id = newContact.id;
}

////////   Looks like we don't need all this anymore.......yeah....I laughed too :( ////////////////

// var displayContactNames = function() {
//     // clear current list to prevent duplicates and clear deleted contacts
//     $('#contactList').html(""); 
//     // loop through each contact and build HTML
//     for( var i = 0; i < addressBook.contacts.length; i++) {
//         var listHTML = '<div class="contactListItem">'
//                         + '<li data-id="' + addressBook.contacts[i].id + '">'
//                         + addressBook.contacts[i].name 
//                         + '</li>';
        
//         var prop; 
//         for (prop in addressBook.contacts[i]) {
//             if (prop !== 'id') { // don't want the id in the contact view
//                 listHTML += '<li class="fullInfo" data-id="' + addressBook.contacts[i].id + '">' 
//                             + addressBook.contacts[i][prop] + '</li>';
//             }
//         }        
//         listHTML += '<li><button class="btn btn-danger" data-id=' + addressBook.contacts[i].id + '>Delete</button></li><div>'; // close out HTML
//         $('#contactList').append(listHTML); // append full contact to list
//     }
// };



var displayContactNames = function() {
    $('#contactList').html(""); 
    $('#contactList').append(addressBook.getAllDetails());
};


$(function() { // jquery 'doc ready' shorthand



    // adding a new contact handler
    newContactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        // send an object of parameters to the Contact constructor
        var contact = new Contact({ name: this[0].value, 
                                    email: [this[1].value], 
                                    phone: [this[2].value], 
                                    address: [this[3].value,
                                              this[4].value, 
                                              this[5].value, 
                                              this[6].value],
                                    id: globalId
        });
        addressBook.contacts.push(contact);  // push contact to addressBook
        displayContactNames();              // repopulate list with new addition
        globalId++;                         // update global id for next contact
        $('#contactForm')[0].reset();
        $('input[name="name"]').focus();
    });
    
    // handler for displaying full contact info
    $('#contactList').on('click', 'li', function() {
        console.log(this);
        var id = $(this).data('id');
        $('[data-id="' + id + '"]').slideToggle();
    });
    
    
    // handler for deleting a contact
    $('#contactList').on('click', 'button', function() {
        var id = $(this).data('id');
        for (var i = 0; i < addressBook.contacts.length; i++) {
            if (addressBook.contacts[i].id === id) {
                addressBook.contacts.splice(i, 1);
            }
        }
        displayContactNames();
    });
    
    // bootstrap fix for giving focus to input on modal show
    $('#addContactModal').on('shown.bs.modal', function () {
      $('input[name="name"]').focus();
    });
});





