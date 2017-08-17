import React from 'react';

class UserInfo extends React.Component {

  const url = 'https://private-cb530a-bravakin.apiary-mock.com/user';

componentWillMount() {
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
      console.log(data);
    })
  })
}

  render() {
    return(
      <div>
        <h1> Alex Sicart Ramos </h1>
        <img src='http://i2.cdn.cnn.com/cnnnext/dam/assets/161201115958-68-year-in-pictures-2016-restricted-super-169.jpg'/>
      </div>
    );
  }
}

export default UserInfo;
