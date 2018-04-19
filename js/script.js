// List of users.
const users = [];

let user = {};
let id = 0;

/**
 * Select a single DOM element.
 */
function $(selector) {
	return document.querySelector(selector);
}

/**
 * Select multiple DOM elements.
 */
function _$(selector) {
	return document.querySelectorAll(selector);
}

/* Form submission */
$('#user_create_form').addEventListener('submit', e => {
	e.preventDefault();
	createUser();
});

function addModalEventListener() {
	_$('a[data-toggle="modal"]').forEach(el => {
		el.addEventListener('click', e => {
			$(e.target.dataset.target).classList.add('active');
		});
	});

	_$('*[data-dismiss="modal"]').forEach(el => {
		el.addEventListener('click', e => {
			e.target.closest('.modal.active').classList.remove('active');
		});
	});
}

/**
 * Generates an id & auto increment.
 */
function generateId() {
	id += 1;
	return id;
}

/**
 * Creates a new user.
 */
function createUser() {
	user.id = generateId();
	user.firstname = $('#firstname').value;
	user.lastname = $('#lastname').value;
	user.phone_no = $('#phone_no').value;
	user.email = $('#email').value;
	user.photo = $('#photo').files[0];

	appendToList(user);
}

/**
 * Adds a new user to the list.
 */
function appendToList(user) {
	// Push this new user to the users list.
	users.push(user);

	// Re-render the contact list.
	render();
}

/**
 * Render the list of users.
 */
function render() {
	let contact_list = '';

	for (user of users) {
		contact_list += `
      <li  id="user-${user.id}">
        <a data-toggle="collapse" href="#user${user.id}Details" 
          aria-expanded="false" aria-controls="user-details" 
          onclick="display(${user.id})" class="dropbtn"  id="user${user.id}Name">
          ${user.firstname} ${user.lastname}
        </a>

      <div class="details collapse " id="user-details">
        <div id="myDropdown${id}" class="dropdown-content">
          <div id="user${user.id}Number">Number: ${user.phone_no}</div>
          <div id="user${user.id}Email">Email: ${user.email}</div>
        </div>
        
        <div class="card-footer">
          <a class="btn btn-primary" data-toggle="modal" 
            data-target="#modal-update" data-user-id="${user.id}" >Edit</a>
          
          <!-- Modal -->
          <div id="modal-update" class="modal fade" role="dialog">
            <div class="modal-dialog">
            
              <!-- Modal content-->
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                  <h4 class="modal-title"  style="text-align:center;" >Edit Contact</h4>
                </div>
                
                <div class="modal-body">
                  <p> 
                    First Name: 
                    <input type="text" value="${user.firstname}" id="update-firstname-${user.id}" name="firstname" />
                  </p>
                  <p> 
                    Last Name: 
                    <input type="text" value="${user.lastname}" id="update-lastname-${user.id}" name="lastname" />
                  </p>
                  <p>
                    Phone no: 
                    <input type="text" value="${user.phone_no}" id="update-phone-no-${user.id}" name="phone_no" />
                  </p>
                  <p>
                    Email: 
                    <input type="text" value="${user.email}" id="update-email-${user.id}" name="email" />
                  </p>
                </div>

                <div class="modal-footer">
                  <button type="button" class="btn btn-primary" 
                    onclick="updateUser(${user.id})" data-save="modal">Save</button>
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
              </div> <!-- End of modal-content -->
            </div>
          </div> <!-- End of modal-update -->

          <a class="btn btn-danger" onclick="deleteUser(${user.id})" 
            data-user-id="${user.id}">Delete</a>
        </div>
      </div>
    </li>`;
	}

	// Add the contact list to the DOM.
	$('#contact-list').innerHTML = contact_list;

	// Listen for modal events.
	addModalEventListener();
}

/**
 * Get a single user by id.
 * 
 * @param {id} -- User id.
 * @param {index} -- Maybe return index. If set to True, the index of the 
 *                    current user in the user list is retured otherwise 
 *                    the entire user object is returned. Default {False}
 * 
 * @return {user} -- Returns the user if index is set to False. otherwise it
 *                    returns the user index or null if user doesn't exist.
 */
function getUser(id, index = False) {
	// Get the user index from the list of users.
	let i = users.findIndex(function(user) {
		return i.id === id;
	});

	// Index confirmation.
	if (i !== -1) {
		return index ? i : users[i];
	}

	// User does not exist.
	return null;
}

/**
 * Delets a single user.
 * 
 * @param {id} -- User id.
 */
function deleteUser(id) {
	// Get the index this user is at.
	let index = getUser(id, (index = True));

	// Index Confirmation.
	if (index !== null) {
		// Remove the user from the list.
		users.splice(index, 1);

		// Re-render the list of contacts.
		render();
	} else {
		// Handle failure: User doesn't exist.
	}
}

/**
 * Removes an element from the DOM.
 * 
 * @param {selector} -- CSS selector.
 */
function deleteElement(selector) {
	$(selector).parentNode.removeChild($(selector));
}

/**
 * Updates a user info.
 * 
 * @param {id} -- User id.
 */
function updateUser(id) {
	// TODO: Show modal.

	// Get the current user.
	let user = getUser(id);

	// Update the fields.
	const fname = $(`#update-firstname-${id}`).value;
	const lname = $(`#update-lastname-${id}`).value;
	user.name = `${fname} ${lname}`;

	user.email = $(`#update-email-${id}`);
	user.phone = $(`#update-phone-no-${id}`);

	// Re-render the contacts list.
	render();

	/*
  //1)show modal
  
  //2)get values from edit form on the modal
  // e.g edit_user.number = $('#editNumber').val()
  
  let user_update = {};
  user_update.name = $(`#update${id}Name`).value;
  user_update.email = $(`#update${id}email`).value;
  user_update.phone = $(`#update${id}phone_no`).value;

  //3)edit the html values of the user. ie. $(#user1Number).hmtl(edit_user.number)
  $(`#user${id}Name`).innerHTML = `${user_update.name}`;
  $(`#user${id}Email`).innerHTML = `Email: ${user_update.email}`;
  $(`#user${id}Number`).innerHTML = `Phone: ${user_update.phone}`;
  
  //4) close modal
  // $(`#myModal${id}`).classList.remove('active');
  */

	// TODO: Cose modal.
}

/*function myFunction(id) {
  document.getElementById(`myDropdown${id}`).classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
if (!event.target.matches('.dropbtn')) {

  var dropdowns = document.getElementsByClassName("dropdown-content");
  var i;
  for (i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.classList.contains('show')) {
      openDropdown.classList.remove('show');
    }
  }
}
}*/
