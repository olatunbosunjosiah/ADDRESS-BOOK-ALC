let user = {};
let id = 0;

function $(selector){
  return document.querySelector(selector);
}
function _$(selector){
  return document.querySelectorAll(selector);
}

$('#user_create_form').addEventListener('submit',(e) => {
    e.preventDefault();
    createUser();
  });

 function addModalEventListener(){ 
   _$('a[data-toggle="modal"]').forEach( (el) => {
    el.addEventListener('click',(e) => {
      $(e.target.dataset.target).classList.add('active');
    });
  });

  _$('*[data-dismiss="modal"]').forEach( (el) => {
    el.addEventListener('click',(e) => {
      e.target.closest('.modal.active').classList.remove('active');
    });
  });
}

function createUser() {
    user.id = id;
    user.firstname = $('#firstname').value;
    user.lastname = $('#lastname').value;
    user.phone_no = $('#phone_no').value;
    user.email = $('#email').value;
    user.photo = $('#photo').files[0];
   appendToList(user);
   id++;
  }

function appendToList(user){
  $('#contact-list').innerHTML = 
    `
    
    ${$('#contact-list').innerHTML}
          
              <li  id="user-${user.id}">
              <div class="dropdown">
              <button class="dropbtn"><a  data-toggle="collapse" 
              href="#user${user.id}Details" 
              aria-expanded="false" 
              aria-controls="user${user.id}Details" onclick="myFunction()" class="dropbtn"  id="user${user.id}Name" >
               ${user.firstname} ${user.lastname} </a></button>
              <div class="dropdown-content">
              <div class="details collapse " id="user${user.id}Details">
              
              <div id="myDropdown${id}" class="dropdown-content">
                    <div id="user${user.id}Number">Phone no: ${user.phone_no}</div>
                    <div id="user${user.id}Email">Email: ${user.email}</div>
                    <a class="btn btn-primary" data-toggle="modal" data-target="#myModal${user.id}" data-user-id="${user.id}" >Edit</a> 
                    <a class="btn btn-danger" onclick="deleteUser(${user.id})" data-user-id="${user.id}">Delete</a>  
                    </div>
              </div>
            </div>
                <div class="card-footer">     
                <!-- Modal -->
                <div id="myModal${user.id}" class="modal fade" role="dialog">
                  <div class="modal-dialog">
                
                    <!-- Modal content-->
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title"  style="text-align:center;" >Edit Contact</h4>
                      </div>
                      <div class="modal-body">
                        <p> Name: <input type="text" value="${user.firstname} ${user.lastname}" id="update${user.id}Name" name="firstname"  /> </p>
                        <p>Phone no: <input type="text" value="${user.phone_no}" id="update${user.id}phone_no" name="phone_no"/></p>
                        <p>Email: <input type="text" value="${user.email}" id="update${user.id}email" name="email" /></p>
                        
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-primary" onclick="updateUser(${user.id})" data-save="modal">Save</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                      </div>
                    </div>
                
                  </div>
                </div>

                
            </div>
            </div>
        </li>
        
  `;

  addModalEventListener();
}

function deleteUser(id) {
  deleteElement(`#user-${id}`)
}

function deleteElement(selector){
  $(selector).parentNode.removeChild($(selector));
}

function updateUser(id){
  //1)show modal
  
  //
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
  $(`#myModal${id}`).classList.remove('active');
}
