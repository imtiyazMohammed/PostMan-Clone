console.log('This is a postman clone web application');

//utility function
//1. utility function to get DOM element from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

//initialize number of parameters
let addedParamCount = 0;


// hide the parameters box initially
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';



// If the user clicks on parametersBox, hide the json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
});


// If the user clicks on json box, hide the parameters box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';
});


//if the users clicks on + button, add more parameters
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = ` <div class="form-row my-2">
    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</label>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter parameter ${addedParamCount + 2} key">
    </div>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter parameter ${addedParamCount + 2} value">
    </div>
    <button class="btn btn-primary deleteParam">-</button>
</div>`;
    // convert the element string to dom note
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);
    // add an event listener to remove the parameter on clicking - button
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    }
    addedParamCount++;
})

//if the user clicks on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // show please wait in the response box to request patience from the user
    document.getElementById('responsePrism').innerHTML = text = 'Please wait...Fetching response';

    //fetch all the values user has entered
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;


    // if user has used params option instead of json collect all the parameters in object
    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {


                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;

            }
            data = JSON.stringify(data);
        }
    }

    else{
        data = document.getElementById('requestJsonText').value;
    }


    // if the rquest type is get , invoke fetch api to create a get request
    if(requestType =='GET'){
        fetch(url,{
            method: 'GET',
        })
        .then(response=> response.text())
        .then((text) =>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        })

    }
    else{
        fetch(url,{
            method: 'POST',
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
        })
        .then(response=> response.text())
        .then((text) =>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        })
    }

});