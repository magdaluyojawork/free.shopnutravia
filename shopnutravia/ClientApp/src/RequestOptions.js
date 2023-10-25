const myHeaders = new Headers();
myHeaders.append("Authorization", "Basic NGFlYTg5N2IyMDZmNGNjZjg0Y2Q4MGIyMWMwYTBhODA6ZmQzMjE1YmI3OTZiNDUxZDg1YWRjYjdlMDExNmJiYWY=");

const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

export default requestOptions;