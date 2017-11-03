(function() {
    let API_DATA;
    let mainContainer = document.getElementById('container');
    let overlay = document.getElementById('overlay');

    let bigCard = document.createElement('div');
    bigCard.className = 'big-card';

    let exitButton = document.createElement('span');
    exitButton.className = 'big-card__exit';
    exitButton.innerHTML = 'x';

    let bigProfilePicture = document.createElement('img');
    bigProfilePicture.className = 'big-card__picture';

    let bigName = document.createElement('h2');
    bigName.className = 'big-card__name';

    let pContainer = document.createElement('div');
    pContainer.className = 'p-container';

    let bigUsername = document.createElement('p');
    bigUsername.className = 'big-card__username';

    let bigEmail = document.createElement('p');
    bigEmail.className = 'big-card__email';

    let bigCity = document.createElement('p');
    bigCity.className = 'big-card__city';

    let horizontalRule = document.createElement('div');
    horizontalRule.className = 'big-card__horizontal-rule';

    let bigNumber = document.createElement('p');
    bigNumber.className = 'big-card__number';

    let bigAddress = document.createElement('p');
    bigAddress.className = 'big-card__address';

    let bigDOB = document.createElement('p');
    bigDOB.className = 'big-card__dob';

    let nextButton = document.createElement('span');
    nextButton.className = 'next-button';
    let prevButton = document.createElement('span');
    prevButton.className = 'prev-button';
    let searchInput = document.getElementById('search');


    pContainer.appendChild(bigEmail);
    pContainer.appendChild(bigUsername);
    pContainer.appendChild(bigCity);
    pContainer.appendChild(horizontalRule);
    pContainer.appendChild(bigNumber);
    pContainer.appendChild(bigAddress);
    pContainer.appendChild(bigDOB);

    bigCard.appendChild(exitButton);
    bigCard.appendChild(bigProfilePicture);
    bigCard.appendChild(bigName);
    bigCard.appendChild(pContainer);


    let previous = document.getElementById('prev');
    let next = document.getElementById('next');

    $.ajax({
        url: 'https://randomuser.me/api/?results=12&nat=us,gb,nz,au',
        dataType: 'json',
        success: function(data) {
            API_DATA = data.results;

            searchInput.addEventListener('keyup', function() {
                let filter = searchInput.value;
                console.log(filter);
                let mainElements = document.querySelectorAll('.person-container');
                if (filter) {
                    console.log(mainElements.length);
                    for (let i = 0; i < mainElements.length; i++) {
                        mainElements[i].style.display = 'none';
                    }
                    
                    let matchedList = [];
                    
                    // add matches to list
                    for (let i = 0; i < mainElements.length; i++) {
                        let name = mainElements[i].querySelector('h2').innerHTML;
                        let username = mainElements[i].querySelector('h3').innerHTML;
                        if (name.includes(filter) || username.includes(filter)) {
                            matchedList.push(mainElements[i]);
                        }
                    }
                    for (let i = 0; i < matchedList.length; i++) {
                        matchedList[i].style.display = 'flex';
                    }
                } else {
                    for (let i = 0; i < mainElements.length; i++) {
                        mainElements[i].style.display = 'flex';
                    }
                }
            });

            API_DATA.forEach(function(person, index) {
                let personContainer = document.createElement('div');
                let personPicture = document.createElement('img');
                let personName = document.createElement('h2');
                let userName = document.createElement('h3');
                let personEmail = document.createElement('p');
                let personLocation = document.createElement('p');
                personLocation.className = 'location-card';
                let textContainer = document.createElement('div');
                let pictureContainer = document.createElement('div');


                personPicture.setAttribute('src', person.picture.large);
                personPicture.className = 'person-picture';

                personName.innerHTML = person.name.first + ' ' + person.name.last;
                userName.id = 'username';
                userName.innerHTML = person.login.username;
                personEmail.innerHTML = person.email;
                personLocation.innerHTML = person.location.city;

                pictureContainer.appendChild(personPicture);
                textContainer.appendChild(personName);
                textContainer.appendChild(userName);
                textContainer.appendChild(personEmail);
                textContainer.appendChild(personLocation);
                personContainer.appendChild(pictureContainer);
                personContainer.appendChild(textContainer);
                personContainer.className = 'person-container';
                personContainer.addEventListener('click', function() {
                    getCurrentPerson(person, index);

                });



                mainContainer.appendChild(personContainer);
            });



        }
    });

    overlay.addEventListener('click', function() {
        hideOverlay();
    });

    nextButton.addEventListener('click', function() {
        getNextPerson();
    });

    prevButton.addEventListener('click', function() {
        getPrevPerson();
    });

    exitButton.addEventListener('click', function() {
        overlay.style.display = 'none';
        $(bigCard).remove();
        bigCard.style.display = 'none';
    });

    function hideOverlay() {
        overlay.style.display = 'none';
        $(bigCard).remove();
        bigCard.style.display = 'none';
    }

    function getCurrentPerson(currentPerson, index) {
        thisPerson = currentPerson;
        thisIndex = index;

        $(bigCard).insertAfter(overlay);

        overlay.style.display = 'block';
        bigCard.style.display = 'block';

        bigProfilePicture.setAttribute('src', currentPerson.picture.large);
        bigName.innerHTML = currentPerson.name.first + ' ' + currentPerson.name.last;
        bigEmail.innerHTML = currentPerson.email;
        bigUsername.innerHTML = currentPerson.login.username;
        bigCity.innerHTML = currentPerson.location.city;
        bigNumber.innerHTML = currentPerson.cell;
        bigAddress.innerHTML = currentPerson.location.street + ', ' + currentPerson.location.city + ', ' + currentPerson.nat + ' ' + currentPerson.location.postcode;
        let date = new Date(currentPerson.dob);
        bigDOB.innerHTML = 'Birthday: ' + (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();

        prevButton.innerHTML = 'Prev';
        bigCard.appendChild(prevButton);

        nextButton.innerHTML = 'Next';
        bigCard.appendChild(nextButton);


    }

    function getNextPerson() {
        if (API_DATA[thisIndex + 1]) {
            thisPerson = API_DATA[thisIndex + 1];
            getCurrentPerson(thisPerson, thisIndex + 1);
        }
    }

    function getPrevPerson() {
        if (API_DATA[thisIndex - 1]) {
            thisPerson = API_DATA[thisIndex - 1];
            getCurrentPerson(thisPerson, thisIndex - 1);
        }
    }
}());









